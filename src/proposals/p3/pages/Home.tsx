import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Target, ShieldCheck, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="theme-p3 min-h-screen bg-white relative font-headline">
      <div className="absolute inset-0 bg-pattern pointer-events-none opacity-[0.03] z-0"></div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-on-surface/5 border border-on-surface/10 rounded-sm overflow-hidden">
            
            {/* Visual Content */}
            <div className="lg:col-span-8 p-10 md:p-20 bg-white relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm">
                  <Flame size={24} className="text-white" />
                </div>
                <div className="h-px w-20 bg-on-surface/20"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Calidad Garantizada desde 1988</span>
              </div>
              
              <h1 className="text-6xl md:text-[110px] font-black text-on-surface leading-[0.8] tracking-tighter mb-12 uppercase">
                BRASA <br/>
                <span className="text-primary italic font-serif lowercase text-5xl md:text-9xl">pura.</span>
              </h1>
              
              <p className="font-body text-2xl text-on-surface-variant max-w-xl mb-12 leading-relaxed font-light">
                Perfeccionamos el arte del asado tradicional. Sin atajos, sin trucos. Solo el mejor pollo, leña seleccionada y tiempo.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/p3/menu" 
                  className="h-16 px-12 bg-on-surface text-white rounded-sm font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-primary transition-all shadow-2xl active:scale-95"
                >
                  Ver la Carta <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/p3/about" 
                  className="h-16 px-12 border border-on-surface/20 text-on-surface rounded-sm font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center hover:bg-on-surface/5 transition-all"
                >
                  Nuestra Filosofía
                </Link>
              </div>

              {/* Minimal Stats */}
              <div className="absolute bottom-10 right-10 flex gap-10 opacity-30">
                <div className="text-right">
                  <p className="text-2xl font-black">24H</p>
                  <p className="text-[8px] font-black uppercase tracking-widest">Marinado</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">100%</p>
                  <p className="text-[8px] font-black uppercase tracking-widest">Natural</p>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="lg:col-span-4 bg-on-surface relative min-h-[400px]">
              <img 
                src="/assets/images/brasas_fuego_artesanal.png" 
                alt="Maestro Asador" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="p-12 border border-on-surface/5 hover:border-primary transition-colors group">
            <Target size={32} className="text-primary mb-8" />
            <h3 className="text-lg font-black uppercase tracking-widest mb-6">Precisión</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body font-light">Controlamos cada temperatura y tiempo para asegurar la jugosidad máxima en cada pedido.</p>
          </div>
          <div className="p-12 border border-on-surface/5 hover:border-primary transition-colors group">
            <ShieldCheck size={32} className="text-primary mb-8" />
            <h3 className="text-lg font-black uppercase tracking-widest mb-6">Integridad</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body font-light">Ingredientes de proximidad sin procesados. El sabor real de la granja a tu mesa.</p>
          </div>
          <div className="p-12 border border-on-surface/5 hover:border-primary transition-colors group">
            <Zap size={32} className="text-primary mb-8" />
            <h3 className="text-lg font-black uppercase tracking-widest mb-6">Eficiencia</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body font-light">Sistemas optimizados para que recibas tu pedido caliente y en el tiempo justo.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
