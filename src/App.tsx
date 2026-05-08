import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrototypeSelector } from './pages/PrototypeSelector';
import { ProposalSwitcher } from './shared/components/ProposalSwitcher';
import type { CartItem, Order, OrderStatus } from './shared/types';

// Proposal 1
import { Navbar as NavbarP1 } from './proposals/p1/components/Navbar';
import { Home as HomeP1 } from './proposals/p1/pages/Home';
import { Menu as MenuP1 } from './proposals/p1/pages/Menu';
import { About as AboutP1 } from './proposals/p1/pages/About';
import { AdminDashboard as AdminP1 } from './proposals/p1/pages/AdminDashboard';
import { CartSidebar as CartP1 } from './proposals/p1/components/CartSidebar';

// Proposal 2
import { Navbar as NavbarP2 } from './proposals/p2/components/Navbar';
import { Home as HomeP2 } from './proposals/p2/pages/Home';
import { Menu as MenuP2 } from './proposals/p2/pages/Menu';
import { About as AboutP2 } from './proposals/p2/pages/About';
import { AdminDashboard as AdminP2 } from './proposals/p2/pages/AdminDashboard';
import { CartSidebar as CartP2 } from './proposals/p2/components/CartSidebar';

// Proposal 3
import { Navbar as NavbarP3 } from './proposals/p3/components/Navbar';
import { Home as HomeP3 } from './proposals/p3/pages/Home';
import { Menu as MenuP3 } from './proposals/p3/pages/Menu';
import { About as AboutP3 } from './proposals/p3/pages/About';
import { AdminDashboard as AdminP3 } from './proposals/p3/pages/AdminDashboard';
import { CartSidebar as CartP3 } from './proposals/p3/components/CartSidebar';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = `${item.id}-${Date.now()}`;
    setCartItems([...cartItems, { ...item, cartItemId }]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
  };

  const handlePlaceOrder = (customerName: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: customerName || 'Cliente Invitado',
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + (item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity, 0),
      timestamp: new Date().toLocaleTimeString(),
      status: 'pending'
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setIsCartOpen(false);
    alert('¡Pedido realizado con éxito!');
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="min-h-screen">
      <ProposalSwitcher />
      <Routes>
        <Route path="/" element={<PrototypeSelector />} />
        
        {/* Proposal 1 */}
        <Route path="/p1/*" element={
          <div className="theme-p1 min-h-screen bg-background">
            <NavbarP1 cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomeP1 />} />
              <Route path="menu" element={<MenuP1 onAddToCart={handleAddToCart} />} />
              <Route path="about" element={<AboutP1 />} />
              <Route path="admin" element={<AdminP1 orders={orders} updateOrderStatus={updateOrderStatus} />} />
            </Routes>
            <CartP1 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cart={cartItems} 
              onRemoveItem={handleRemoveFromCart}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        } />

        {/* Proposal 2 */}
        <Route path="/p2/*" element={
          <div className="theme-p2 min-h-screen bg-surface">
            <NavbarP2 cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomeP2 />} />
              <Route path="menu" element={<MenuP2 onAddToCart={handleAddToCart} />} />
              <Route path="about" element={<AboutP2 />} />
              <Route path="admin" element={<AdminP2 orders={orders} updateOrderStatus={updateOrderStatus} />} />
            </Routes>
            <CartP2 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cart={cartItems} 
              onRemoveItem={handleRemoveFromCart}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        } />

        {/* Proposal 3 */}
        <Route path="/p3/*" element={
          <div className="theme-p3 min-h-screen bg-white">
            <NavbarP3 cartItemCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
            <Routes>
              <Route path="/" element={<HomeP3 />} />
              <Route path="menu" element={<MenuP3 onAddToCart={handleAddToCart} />} />
              <Route path="about" element={<AboutP3 />} />
              <Route path="admin" element={<AdminP3 orders={orders} updateOrderStatus={updateOrderStatus} />} />
            </Routes>
            <CartP3 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cart={cartItems} 
              onRemoveItem={handleRemoveFromCart}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;
