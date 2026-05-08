import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import type { CartItem } from '../../../shared/types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: (name: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemoveItem, onPlaceOrder }) => {
  const total = cart.reduce((sum, item) => sum + (item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] transition-all" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col theme-p3 border-l border-outline-variant/30`}>
        <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-white relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex items-center gap-4">
            <ShoppingCart className="text-primary" size={24} />
            <h2 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter">Bolsa <span className="text-primary">Pro</span></h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
              <ShoppingCart size={80} strokeWidth={1} />
              <p className="font-headline font-black text-xl uppercase tracking-widest mt-6">Sistema Vacío</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartItemId} className="flex gap-6 group relative">
                <div className="w-24 h-24 bg-surface-container-low rounded-sm overflow-hidden shrink-0 border border-outline-variant/30">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline font-black text-on-surface uppercase tracking-tight text-sm">{item.name}</h3>
                    <button onClick={() => onRemoveItem(item.cartItemId)} className="text-on-surface-variant hover:text-primary transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {item.selectedOption && (
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                      Config: {item.selectedOption.name}
                    </span>
                  )}
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center gap-3 border border-outline-variant/50 rounded px-2 py-1">
                      <span className="font-headline text-[10px] font-black text-on-surface-variant uppercase">Cant</span>
                      <span className="font-headline text-xs font-black text-on-surface">{item.quantity}</span>
                    </div>
                    <span className="font-headline font-black text-on-surface">
                      €{((item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-surface-container-low border-t border-outline-variant space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="font-headline text-[10px] font-black uppercase tracking-widest">Base de Pedido</span>
                <span className="font-headline font-bold text-sm">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                <span className="font-headline font-black text-on-surface uppercase tracking-widest text-sm">Total Final</span>
                <span className="font-headline text-3xl font-black text-primary">€{total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => onPlaceOrder('Cliente P3')}
              className="w-full h-16 bg-on-surface text-white rounded-md font-headline text-xs font-black uppercase tracking-[0.3em] hover:bg-primary active:scale-95 transition-all shadow-xl group flex items-center justify-center gap-3"
            >
              Procesar Comanda <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
