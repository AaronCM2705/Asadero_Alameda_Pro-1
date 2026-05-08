import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { AdminDashboard } from './pages/AdminDashboard';
import type { CartItem, Order, OrderStatus } from './types';

// Simple wrapper to provide Layout with Navbar, Footer and Cart
interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  removeFromCart: (id: string) => void;
  onPlaceOrder: (name: string) => void;
}

function Layout({ children, cart, cartCount, isCartOpen, setIsCartOpen, removeFromCart, onPlaceOrder }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col pt-[88px]">
      <Navbar cartItemCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemoveItem={removeFromCart} 
        onPlaceOrder={onPlaceOrder}
      />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [orders, setOrders] = React.useState<Order[]>([
    {
      id: 'AA-1042',
      customerName: 'Carlos Mendoza',
      items: [],
      total: 32.50,
      timestamp: '19:45',
      status: 'preparing'
    },
    {
      id: 'AA-1041',
      customerName: 'Lucía Torres',
      items: [],
      total: 24.80,
      timestamp: '19:30',
      status: 'ready'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    // Check if item with same id and same option exists
    const existingIndex = cart.findIndex(
      (c) => c.id === item.id && c.selectedOption?.id === item.selectedOption?.id
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        quantity: newCart[existingIndex].quantity + item.quantity
      };
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, cartItemId: Date.now().toString() }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const placeOrder = (customerName: string) => {
    const newOrder: Order = {
      id: `AA-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity, 0),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin route has its own layout in the component or simple layout */}
        <Route path="/admin" element={<AdminDashboard orders={orders} updateOrderStatus={updateOrderStatus} />} />
        
        {/* Client routes wrapped in Layout */}
        <Route path="/" element={
          <Layout cart={cart} cartCount={cartCount} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} removeFromCart={removeFromCart} onPlaceOrder={placeOrder}>
            <Home />
          </Layout>
        } />
        <Route path="/menu" element={
          <Layout cart={cart} cartCount={cartCount} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} removeFromCart={removeFromCart} onPlaceOrder={placeOrder}>
            <Menu onAddToCart={addToCart} />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout cart={cart} cartCount={cartCount} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} removeFromCart={removeFromCart} onPlaceOrder={placeOrder}>
            <About />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
