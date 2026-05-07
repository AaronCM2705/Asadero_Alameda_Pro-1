import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import type { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: (customerName: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemoveItem, onPlaceOrder }) => {
  const [customerName, setCustomerName] = React.useState('');
  const total = cart.reduce((sum, item) => {
    const itemPrice = item.price + (item.selectedOption?.priceModifier || 0);
    return sum + (itemPrice * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-md z-[55] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`fixed right-0 top-0 h-full z-[60] flex flex-col p-6 w-full sm:w-[400px] bg-surface-container-lowest border-l border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="flex justify-between items-start mb-8 pb-4 border-b border-primary/20 pt-4">
          <div>
            <h2 className="font-headline text-[32px] text-primary mb-1">Tu Pedido</h2>
            <p className="font-body text-[14px] text-on-surface-variant italic">Sinfonía de sabores en camino</p>
          </div>
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-bright text-on-surface hover:text-primary transition-colors">
            <X size={20} />
          </button>
        </header>
        
        <div className="flex-grow overflow-y-auto pr-2 space-y-6 scroll-smooth">
          {cart.length === 0 ? (
            <p className="text-on-surface-variant italic mt-8 text-center">Tu pedido está vacío.</p>
          ) : (
            cart.map((item) => {
              const itemPrice = item.price + (item.selectedOption?.priceModifier || 0);
              return (
                <div key={item.cartItemId} className="flex justify-between items-start border-b border-primary/10 pb-4 animate-fade-in">
                  <div>
                    <h4 className="font-headline text-[20px] text-on-surface">{item.name}</h4>
                    {item.selectedOption && (
                      <p className="font-body text-sm text-on-surface-variant mt-1">({item.selectedOption.name})</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[12px] text-on-surface-variant uppercase">Cant: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-body text-lg text-primary block">€{(itemPrice * item.quantity).toFixed(2)}</span>
                    <button onClick={() => onRemoveItem(item.cartItemId)} className="text-error font-label text-[12px] uppercase mt-2 hover:underline">Quitar</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <footer className="pt-6 border-t border-primary/20 mt-auto space-y-4 pb-4">
          {cart.length > 0 && (
            <div className="mb-6">
              <label className="font-label text-[10px] text-primary uppercase tracking-widest block mb-2">Nombre del Cliente</label>
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full h-12 bg-surface-container border border-primary/20 rounded-xl px-4 text-on-surface focus:border-primary outline-none transition-all font-body"
              />
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            <span className="font-headline text-[20px] text-on-surface">Total</span>
            <span className="font-headline text-[28px] text-primary font-bold">€{total.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0 || !customerName.trim()}
            onClick={() => {
              onPlaceOrder(customerName);
              setCustomerName('');
            }}
            className="w-full h-14 rounded-full bg-primary-container text-background font-body text-lg uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center font-bold shadow-lg hover:shadow-[0_0_15px_rgba(205,127,50,0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none"
          >
            Confirmar Pedido
          </button>
          <button onClick={onClose} className="w-full h-12 rounded-full border border-primary/30 text-on-surface-variant font-body text-base hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Seguir Comprando
          </button>
        </footer>
      </aside>
    </>
  );
};
