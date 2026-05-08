import React, { useState } from 'react';
import { Plus, Minus, Star, Flame, ShoppingCart } from 'lucide-react';
import { mockMenu } from '../../../data/mockDb';
import type { CartItem, MenuItem, MenuOption } from '../../../shared/types';

interface MenuProps {
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | 'chicken' | 'sides' | 'drinks' | 'sauces'>('Todos');
  const categories = [
    { id: 'Todos', name: 'Todos' },
    { id: 'chicken', name: 'Pollos' },
    { id: 'sides', name: 'Guarniciones' },
    { id: 'sauces', name: 'Salsas' },
    { id: 'drinks', name: 'Bebidas' }
  ];

  const filteredMenu = selectedCategory === 'Todos' 
    ? mockMenu 
    : mockMenu.filter(item => item.category === selectedCategory);

  return (
    <div className="theme-p2 min-h-screen bg-surface pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <Flame size={16} />
              </span>
              <span className="font-headline text-xs font-black text-primary uppercase tracking-[0.4em]">Propuesta Gastronómica</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface uppercase tracking-tighter leading-none">
              NUESTRA <br/>
              <span className="text-primary italic">CARTA.</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-surface-container p-2 rounded-[24px] border border-outline-variant">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-6 py-3 rounded-[20px] font-headline text-xs font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:bg-white'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredMenu.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuItemCard: React.FC<{ item: MenuItem; onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void }> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<MenuOption | undefined>(item.options?.[0]);

  const handleAdd = () => {
    onAddToCart({
      ...item,
      quantity,
      selectedOption
    });
    // Reset state after adding
    setQuantity(1);
  };

  // Theme-specific image override
  const displayImage = item.category === 'chicken' 
    ? '/assets/images/p2_chicken.png' 
    : item.category === 'drinks'
      ? item.id.includes('chicha') 
        ? 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
      : item.id === 'side-papas-rusticas' || item.id === 'side-papas-asadas'
        ? '/assets/images/p2_potatoes.png'
        : item.imageUrl;

  const totalPrice = (item.price + (selectedOption?.priceModifier || 0)) * quantity;

  return (
    <div className="group bg-white rounded-[40px] overflow-hidden border border-outline-variant shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={displayImage || 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80'} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        {item.tags?.map(tag => (
          <div key={tag} className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <Star className="text-primary fill-primary" size={12} />
            <span className="font-headline text-[10px] font-black uppercase tracking-widest text-on-surface">{tag}</span>
          </div>
        ))}
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="font-headline text-2xl font-black text-on-surface uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
          <p className="font-body text-on-surface-variant text-base leading-relaxed line-clamp-2 font-medium">{item.description}</p>
        </div>

        {/* Options Selection */}
        {item.options && (
          <div className="mb-6 space-y-3">
            <p className="font-headline text-[10px] font-black uppercase tracking-widest text-on-surface">Selecciona Porción:</p>
            <div className="grid grid-cols-3 gap-2">
              {item.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt)}
                  className={`py-2 px-1 rounded-xl text-[10px] font-bold border-2 transition-all ${selectedOption?.id === opt.id ? 'bg-primary text-white border-primary shadow-lg' : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity and Action */}
        <div className="mt-auto pt-6 border-t border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center bg-surface-container rounded-2xl p-1 border border-outline-variant/20">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white text-on-surface transition-all"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            <span className="w-8 text-center font-headline text-sm font-black text-on-surface">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white text-on-surface transition-all"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>

          <button 
            onClick={handleAdd}
            className="flex-grow ml-4 h-12 bg-on-surface text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl active:scale-95 group/btn overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 font-headline text-sm font-black uppercase tracking-widest">
              €{totalPrice.toFixed(2)}
            </span>
            <ShoppingCart size={18} className="relative z-10" />
          </button>
        </div>
      </div>
    </div>
  );
};
