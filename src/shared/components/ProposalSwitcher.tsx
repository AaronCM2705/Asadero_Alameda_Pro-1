import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers, ChevronRight, X } from 'lucide-react';

export const ProposalSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const proposals = [
    { id: 'p1', name: 'Propuesta 1: Oro Tradición', color: 'bg-[#ffb779]' },
    { id: 'p2', name: 'Propuesta 2: Gourmet Naranja', color: 'bg-[#f16522]' },
    { id: 'p3', name: 'Propuesta 3: Rendimiento Rojo', color: 'bg-[#ba0013]' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-on-surface text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all group border-2 border-white/20"
      >
        {isOpen ? <X size={24} /> : <Layers size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-outline-variant w-72 animate-in slide-in-from-bottom-4 duration-300">
          <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4 px-2">Cambiar de Prototipo</p>
          <div className="space-y-2">
            {proposals.map((p) => {
              const isActive = location.pathname.startsWith(`/${p.id}`);
              return (
                <Link
                  key={p.id}
                  to={`/${p.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isActive ? 'bg-surface-container text-on-surface' : 'hover:bg-surface-container-low text-on-surface-variant'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${p.color}`}></div>
                    <span className="text-sm font-bold">{p.name}</span>
                  </div>
                  {isActive && <div className="w-1 h-1 rounded-full bg-primary"></div>}
                </Link>
              );
            })}
          </div>
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 p-3 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl transition-all"
          >
            Volver al Selector <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};
