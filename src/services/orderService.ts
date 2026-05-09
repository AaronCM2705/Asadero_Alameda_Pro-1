import { supabase } from '../lib/supabaseClient';
import type { OrderStatus, CartItem } from '../shared/types';

export const orderService = {
  // Crear un pedido nuevo
  async createOrder(customerName: string, items: CartItem[], total: number) {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: customerName, 
          items: items, 
          total: total,
          status: 'pending'
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Obtener todos los pedidos
  async fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Actualizar el estado de un pedido
  async updateStatus(orderId: string, status: OrderStatus) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  },

  // Eliminar un pedido
  async deleteOrder(orderId: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) throw error;
  },

  // Suscribirse a cambios en tiempo real
  subscribeToOrders(callback: (payload: any) => void) {
    return supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
      .subscribe();
  }
};
