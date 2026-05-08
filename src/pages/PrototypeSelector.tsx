import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Flame, Target } from 'lucide-react';

export const PrototypeSelector: React.FC = () => {
  const prototypes = [
    { 
      id: 'p1', 
      name: 'Oro Tradición', 
      tag: 'Elegancia Clásica', 
      icon: Sparkles,
      description: 'Nuestra propuesta más refinada. Tipografía elegante y un ambiente acogedor para los amantes de lo tradicional.', 
      color: 'from-[#ffb779] to-[#cd7f32]',
      logo: '/assets/images/logo-gold.png'
    },
    { 
      id: 'p2', 
      name: 'Gourmet Naranja', 
      tag: 'Comercio Dinámico',
      icon: Flame,
      description: 'Enfoque comercial moderno. Diseño optimizado para pedidos rápidos con una estética vibrante y profesional.', 
      color: 'from-[#f16522] to-[#a63b00]',
      logo: '/assets/images/logo-orange.png'
    },
    { 
      id: 'p3', 
      name: 'Rendimiento Rojo', 
      tag: 'Minimalismo Puro',
      icon: Target,
      description: 'Estilo directo y técnico. Máximo contraste visual para una gestión operativa impecable y sin distracciones.', 
      color: 'from-[#ba0013] to-[#7a000d]',
      logo: '/assets/images/logo-red.png'
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 md:p-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 text-center mb-20 space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Asadero Alameda Multiverso</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          ELIGE TU <br/>
          <span className="text-white/20">ESTILO.</span>
        </h1>
        <p className="text-white/40 max-w-xl mx-auto font-light text-lg">Presentación de las 3 propuestas de identidad visual y operativa.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        {prototypes.map((p, idx) => (
          <Link 
            key={p.id} 
            to={`/${p.id}`}
            className="group relative h-[550px] rounded-[40px] overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/40 hover:-translate-y-4 bg-white/5 backdrop-blur-md"
          >
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
            
            <div className="p-12 h-full flex flex-col">
              <div className="flex justify-between items-start mb-10">
                <div className="h-24 w-auto bg-white rounded-2xl p-4 shadow-2xl group-hover:rotate-6 transition-transform">
                  <img src={p.logo} alt={p.name} className="h-full w-auto object-contain mx-auto" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">0{idx + 1}</p>
              </div>

              <div className="mt-auto space-y-6">
                <div>
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">{p.tag}</span>
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{p.name}</h2>
                </div>
                <p className="text-white/40 text-sm leading-relaxed font-light">{p.description}</p>
                
                <div className="pt-8 flex items-center gap-4 text-white/20 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest">Explorar Propuesta</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
