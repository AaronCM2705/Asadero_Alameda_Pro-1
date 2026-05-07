import React, { useState } from 'react';
import { ShoppingBasket, Minus, Plus, Utensils, Wine } from 'lucide-react';
import { mockMenu } from '../data/mockDb';
import type { CartItem, MenuOption } from '../types';

interface MenuProps {
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const chicken = mockMenu.find(item => item.id === 'chicken-main');
  const sides = mockMenu.filter(item => item.category === 'sides');
  const sauces = mockMenu.filter(item => item.category === 'sauces');
  const drinks = mockMenu.filter(item => item.category === 'drinks');

  // Local state for Chicken
  const [chickenQty, setChickenQty] = useState(1);
  const [chickenOption, setChickenOption] = useState<MenuOption | undefined>(chicken?.options?.[0]);

  const handleAddChicken = () => {
    if (chicken && chickenOption) {
      onAddToCart({
        ...chicken,
        quantity: chickenQty,
        selectedOption: chickenOption
      });
      setChickenQty(1);
    }
  };

  // State for sides
  const [sideQtys, setSideQtys] = useState<Record<string, number>>({});

  const handleAddSide = (id: string) => {
    const qty = sideQtys[id] || 0;
    if (qty > 0) {
      const sideItem = mockMenu.find(s => s.id === id);
      if (sideItem) {
        onAddToCart({
          ...sideItem,
          quantity: qty,
        });
        setSideQtys({ ...sideQtys, [id]: 0 });
      }
    }
  };

  const updateSideQty = (id: string, delta: number) => {
    setSideQtys(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  return (
    <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-16 flex flex-col items-center animate-fade-in">
        <h2 className="font-headline text-[48px] text-on-surface mb-2">Sinfonía de Brasas</h2>
        <div className="w-16 h-px bg-primary-container mt-4"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Principal: Pollo Asado */}
        {chicken && (
          <div className="lg:col-span-12 border border-primary-container/20 bg-surface-container-low group hover:border-primary-container/60 transition-all overflow-hidden shadow-2xl rounded-2xl animate-fade-in">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-5/12 h-80 md:h-auto overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low/50 z-10 hidden md:block"></div>
                <img alt={chicken.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={chicken.imageUrl} />
              </div>
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-between z-20">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="border border-primary-container/50 bg-primary-container/10 px-4 py-1.5 rounded-full font-label text-xs text-primary-container uppercase shadow-sm">
                      {chicken.tags?.[0]}
                    </span>
                    <div className="text-right">
                      <span className="font-headline text-[32px] text-primary block transition-all duration-300 drop-shadow-md">
                        €{(chicken.price + (chickenOption?.priceModifier || 0)).toFixed(2)}
                      </span>
                      <span className="font-label text-[10px] text-on-surface-variant/60 uppercase">IVA Incluido</span>
                    </div>
                  </div>
                  <h3 className="font-headline text-[32px] text-on-surface mb-4">{chicken.name}</h3>
                  <p className="font-body text-base text-on-surface-variant mb-8 max-w-xl">{chicken.description}</p>
                  
                  <div className="space-y-4 mb-10">
                    <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest">Seleccione su Porción</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {chicken.options?.map(opt => (
                        <div key={opt.id} className="relative">
                          <input 
                            checked={chickenOption?.id === opt.id}
                            onChange={() => setChickenOption(opt)}
                            className="hidden portion-radio" 
                            id={opt.id} 
                            name="portion" 
                            type="radio"
                          />
                          <label className="flex flex-col items-center justify-center h-20 border border-primary-container/30 rounded-xl cursor-pointer transition-all hover:border-primary-container hover:bg-surface-container-highest text-center px-2" htmlFor={opt.id}>
                            <span className="font-body font-bold uppercase text-base">{opt.name}</span>
                            <span className="text-[12px] opacity-70">{opt.description}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex border border-primary-container/30 h-14 bg-background rounded-full overflow-hidden items-center w-32">
                    <button onClick={() => setChickenQty(Math.max(1, chickenQty - 1))} className="w-10 h-full hover:bg-surface-container-highest hover:text-primary transition-colors flex items-center justify-center">
                      <Minus size={20} />
                    </button>
                    <span className="flex-grow text-center font-body font-bold text-primary">{chickenQty}</span>
                    <button onClick={() => setChickenQty(chickenQty + 1)} className="w-10 h-full hover:bg-surface-container-highest hover:text-primary transition-colors flex items-center justify-center">
                      <Plus size={20} />
                    </button>
                  </div>
                  <button onClick={handleAddChicken} className="flex-grow h-14 bg-primary text-background rounded-full font-body text-lg font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 shadow-lg hover:shadow-[0_0_15px_rgba(205,127,50,0.4)] transition-all flex items-center justify-center gap-2">
                    <span>Añadir</span>
                    <ShoppingBasket size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guarniciones */}
        {sides.map(side => (
          <div key={side.id} className="lg:col-span-4 border border-primary-container/20 bg-surface-container-low flex flex-col hover:border-primary-container/60 transition-colors group rounded-2xl overflow-hidden shadow-lg animate-fade-in">
            <div className="h-56 overflow-hidden relative">
              <img alt={side.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={side.imageUrl} />
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur rounded-xl px-4 py-2 border border-primary/30 shadow-md">
                <span className="font-headline text-[20px] text-primary-container">€{side.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div className="mb-6">
                <h4 className="font-headline text-[24px] text-on-surface mb-2">{side.name}</h4>
                <p className="font-label text-[12px] text-primary-container uppercase mb-3 tracking-tighter">{side.tags?.join(' • ')}</p>
                <p className="font-body text-[14px] text-on-surface-variant line-clamp-3">{side.description}</p>
              </div>
              <div className="flex gap-3">
                <div className="flex border border-primary-container/20 h-12 bg-background/50 rounded-full overflow-hidden items-center w-28">
                  <button onClick={() => updateSideQty(side.id, -1)} className="w-10 h-full hover:bg-surface-container-highest hover:text-primary transition-colors flex items-center justify-center">
                    <Minus size={18} />
                  </button>
                  <span className="flex-grow text-center font-body text-primary">{sideQtys[side.id] || 0}</span>
                  <button onClick={() => updateSideQty(side.id, 1)} className="w-10 h-full hover:bg-surface-container-highest hover:text-primary transition-colors flex items-center justify-center">
                    <Plus size={18} />
                  </button>
                </div>
                <button 
                  onClick={() => handleAddSide(side.id)}
                  disabled={!(sideQtys[side.id] > 0)}
                  className="flex-grow h-12 border border-primary-container rounded-full text-primary-container hover:bg-primary-container hover:text-background transition-all uppercase tracking-widest font-label font-bold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary-container"
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Salsas y Bebidas */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Salsas */}
          <div className="border border-primary-container/10 p-8 rounded-2xl bg-surface-container-lowest shadow-md animate-fade-in">
            <div className="flex items-center gap-2 mb-8 border-b border-primary-container/20 pb-4">
              <Utensils className="text-primary-container" size={24} />
              <h3 className="font-headline text-[24px] text-on-surface">Nuestras Salsas</h3>
            </div>
            <ul className="space-y-4">
              {sauces.map(sauce => (
                <li key={sauce.id} className="flex items-center group">
                  <div className="flex-grow">
                    <span className="font-body text-lg text-on-surface block group-hover:text-primary transition-colors">{sauce.name}</span>
                    <span className="text-[12px] text-on-surface-variant italic">{sauce.description}</span>
                  </div>
                  <div className="dotted-leader flex-grow mx-4 hidden sm:block"></div>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-lg text-primary-container font-bold">€{sauce.price.toFixed(2)}</span>
                    <button onClick={() => onAddToCart({ ...sauce, quantity: 1 })} className="w-10 h-10 border border-primary-container/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-background hover:shadow-[0_0_10px_rgba(205,127,50,0.5)] transition-all active:scale-90">
                      <Plus size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Bebidas */}
          <div className="border border-primary-container/10 p-8 rounded-2xl bg-surface-container-lowest shadow-md animate-fade-in">
            <div className="flex items-center gap-2 mb-8 border-b border-primary-container/20 pb-4">
              <Wine className="text-primary-container" size={24} />
              <h3 className="font-headline text-[24px] text-on-surface">Bebidas</h3>
            </div>
            <ul className="space-y-4">
              {drinks.map(drink => (
                <li key={drink.id} className="flex items-center group">
                  <div className="flex-grow">
                    <span className="font-body text-lg text-on-surface block group-hover:text-primary transition-colors">{drink.name}</span>
                    <span className="text-[12px] text-on-surface-variant italic">{drink.description}</span>
                  </div>
                  <div className="dotted-leader flex-grow mx-4 hidden sm:block"></div>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-lg text-primary-container font-bold">€{drink.price.toFixed(2)}</span>
                    <button onClick={() => onAddToCart({ ...drink, quantity: 1 })} className="w-10 h-10 border border-primary-container/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-background hover:shadow-[0_0_10px_rgba(205,127,50,0.5)] transition-all active:scale-90">
                      <Plus size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
