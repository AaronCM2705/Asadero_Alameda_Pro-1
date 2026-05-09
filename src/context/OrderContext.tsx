import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Order, OrderStatus } from '../shared/types';
import { orderService } from '../services/orderService';
import { isSupabaseConfigured } from '../lib/supabaseClient';

interface OrderContextType {
  orders: Order[];
  addOrder: (customerName: string, items: CartItem[]) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  totalSales: number;
  activeOrdersCount: number;
  isCloudMode: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('asadero_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Usar la comprobación centralizada
  const isCloudMode = isSupabaseConfigured;

  // Cargar pedidos iniciales desde Supabase si estamos en modo nube
  useEffect(() => {
    if (isCloudMode) {
      orderService.fetchOrders().then(data => {
        if (data) {
          // Adaptar formato si es necesario
          const formattedData = data.map((o: any) => ({
            ...o,
            customerName: o.customer_name,
            timestamp: new Date(o.timestamp).toLocaleTimeString()
          }));
          setOrders(formattedData);
        }
      });

      // Suscribirse a cambios en tiempo real
      const subscription = orderService.subscribeToOrders(() => {
        orderService.fetchOrders().then(data => {
          if (data) {
            const formattedData = data.map((o: any) => ({
              ...o,
              customerName: o.customer_name,
              timestamp: new Date(o.timestamp).toLocaleTimeString()
            }));
            setOrders(formattedData);
          }
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isCloudMode]);

  // Guardar en localstorage siempre como respaldo
  useEffect(() => {
    localStorage.setItem('asadero_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = async (customerName: string, items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity, 0);
    
    if (isCloudMode) {
      try {
        await orderService.createOrder(customerName || 'Cliente Invitado', items, total);
        // El estado se actualizará vía suscripción real-time
      } catch (error) {
        console.error('Error enviando pedido a la nube:', error);
      }
    } else {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9),
        customerName: customerName || 'Cliente Invitado',
        items: [...items],
        total: total,
        timestamp: new Date().toLocaleTimeString(),
        status: 'pending'
      };
      setOrders(prev => [newOrder, ...prev]);
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    if (isCloudMode) {
      try {
        await orderService.updateStatus(id, status);
      } catch (error) {
        console.error('Error actualizando estado en la nube:', error);
      }
    } else {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  const deleteOrder = async (id: string) => {
    if (isCloudMode) {
      try {
        await orderService.deleteOrder(id);
      } catch (error) {
        console.error('Error eliminando pedido en la nube:', error);
      }
    } else {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered').length;

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, deleteOrder, totalSales, activeOrdersCount, isCloudMode }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};
