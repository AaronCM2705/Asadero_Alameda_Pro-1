import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Info, ArrowRight } from 'lucide-react';
import { mockMenu } from '../../../data/mockDb';
import type { CartItem, MenuItem, MenuOption } from '../../../shared/types';

interface MenuProps {
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'chicken' | 'sides' | 'drinks' | 'sauces'>('Todos');

  const categories = [
    { id: 'Todos', name: 'Todos' },
    { id: 'chicken', name: 'Pollos' },
    { id: 'sides', name: 'Guarniciones' },
    { id: 'sauces', name: 'Salsas' },
    { id: 'drinks', name: 'Bebidas' }
  ];

  const filteredMenu = activeCategory === 'Todos' 
    ? mockMenu 
    : mockMenu.filter(item => item.category === activeCategory);

  return (
    <div className="theme-p3 min-h-screen bg-white pt-32 pb-20 font-headline">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="border-b border-on-surface/10 pb-12 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block mb-4">Carta Seleccionada</span>
              <h1 className="text-6xl md:text-8xl font-black text-on-surface tracking-tighter uppercase leading-none">
                MENÚ DE <br/>
                <span className="text-primary italic font-serif lowercase text-5xl md:text-7xl">la casa.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              <span>Cocina: ABIERTA</span>
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse"></div>
              <span>Pedidos: ACTIVOS</span>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-on-surface/5 border border-on-surface/10 rounded-sm overflow-hidden">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 bg-surface-container-low p-10 space-y-8">
            <div className="space-y-4">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Filtrar por:</span>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`text-left py-3 px-4 text-xs font-black uppercase tracking-widest transition-all rounded-sm ${activeCategory === cat.id ? 'bg-on-surface text-white' : 'hover:bg-on-surface/5'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-10 border-t border-on-surface/10">
              <div className="bg-primary/5 p-6 rounded-sm border-l-2 border-primary">
                <Info size={16} className="text-primary mb-3" />
                <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed">
                  Nuestros productos son frescos del día. Tiempo estimado de entrega: 20-30 min.
                </p>
              </div>
            </div>
          </div>

          {/* Product Feed */}
          <div className="lg:col-span-9 bg-white p-1 gap-1 grid grid-cols-1 md:grid-cols-2">
            {filteredMenu.map(item => (
              <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
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
    setQuantity(1);
  };

  // Theme-specific image override
  const displayImage = item.category === 'chicken' 
    ? '/assets/images/p3_chicken.png' 
    : item.category === 'drinks'
      ? item.id.includes('agua')
        ? 'https://images.unsplash.com/photo-1548966815-85b1c3915745?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80'
      : item.id === 'side-papas-fritas' || item.id === 'side-papas-rusticas'
        ? '/assets/images/p3_potatoes.png'
        : item.imageUrl;

  const totalPrice = (item.price + (selectedOption?.priceModifier || 0)) * quantity;

  return (
    <div className="p-8 border-2 border-on-surface/10 hover:border-primary transition-all group flex flex-col h-full bg-white shadow-sm hover:shadow-xl">
      <div className="aspect-video bg-on-surface/5 mb-8 overflow-hidden rounded-sm relative border border-on-surface/5">
        <img 
          src={displayImage || 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80'} 
          alt={item.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
        />
        {item.tags?.map(tag => (
          <div key={tag} className="absolute top-4 right-4 text-[9px] font-black bg-on-surface text-white px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-lg">
            {tag}
          </div>
        ))}
      </div>
      
      <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight mb-3">{item.name}</h3>
      <p className="font-body text-sm text-on-surface-variant mb-10 leading-relaxed font-semibold">{item.description}</p>
      
      {/* Options */}
      {item.options && (
        <div className="mb-10 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Selección de Formato:</p>
          <div className="flex flex-wrap gap-2">
            {item.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt)}
                className={`px-5 py-3 text-[11px] font-black border-2 rounded-sm transition-all ${selectedOption?.id === opt.id ? 'bg-on-surface text-white border-on-surface shadow-md' : 'border-on-surface/10 text-on-surface-variant hover:bg-on-surface/5'}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mt-auto flex items-center justify-between pt-8 border-t-2 border-on-surface/5">
        <div className="flex items-center border-2 border-on-surface/20 rounded-sm bg-on-surface/5">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-on-surface/10 transition-colors text-on-surface"><Minus size={16} strokeWidth={3}/></button>
          <span className="w-10 text-center text-sm font-black text-on-surface">{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-on-surface/10 transition-colors text-on-surface"><Plus size={16} strokeWidth={3}/></button>
        </div>
        
        <button 
          onClick={handleAdd}
          className="h-12 px-8 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-on-surface transition-all flex items-center gap-4 active:scale-95 shadow-xl shadow-primary/20"
        >
          <span>€{totalPrice.toFixed(2)}</span>
          <ShoppingCart size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
