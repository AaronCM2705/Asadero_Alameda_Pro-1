import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../../../shared/types';
import { useOrders } from '../../../context/OrderContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onRemoveItem, onPlaceOrder }) => {
  const { addOrder } = useOrders();
  const [customerName, setCustomerName] = React.useState('');
  const total = cart.reduce((sum, item) => sum + (item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity, 0);

  const handlePlaceOrder = () => {
    addOrder(customerName, cart);
    onPlaceOrder();
    setCustomerName('');
    alert('¡Excelente elección! Tu pedido se está preparando.');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[60] transition-all" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface shadow-2xl z-[70] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col theme-p2`}>
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary" size={24} />
            <h2 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tight">Tu Pedido</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <ShoppingBag size={64} className="mb-4" />
              <p className="font-headline font-bold text-xl">Tu bolsa está vacía</p>
              <p className="font-body text-sm mt-2">¡Agrega algo delicioso para empezar!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartItemId} className="flex gap-4 group">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-outline-variant">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline font-bold text-on-surface">{item.name}</h3>
                    <button onClick={() => onRemoveItem(item.cartItemId)} className="text-on-surface-variant hover:text-error transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {item.selectedOption && (
                    <span className="text-[10px] font-headline font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded mt-1 inline-block">
                      {item.selectedOption.name}
                    </span>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-body text-sm text-on-surface-variant">Cant: {item.quantity}</span>
                    <span className="font-headline font-bold text-on-surface">
                      €{((item.price + (item.selectedOption?.priceModifier || 0)) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-surface-container-lowest border-t border-outline-variant space-y-4">
            <div className="mb-4">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 block">Nombre para el pedido</label>
              <input 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej: Laura G."
                className="w-full h-12 bg-white border border-outline-variant rounded-xl px-4 text-on-surface outline-none focus:border-primary transition-all font-body"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-headline font-bold text-on-surface-variant uppercase tracking-widest text-sm">Total</span>
              <span className="font-headline text-2xl font-black text-on-surface">€{total.toFixed(2)}</span>
            </div>
            <button 
              disabled={!customerName.trim()}
              onClick={handlePlaceOrder}
              className="w-full h-16 bg-primary text-white rounded-xl font-headline font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:grayscale"
            >
              Confirmar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
};
