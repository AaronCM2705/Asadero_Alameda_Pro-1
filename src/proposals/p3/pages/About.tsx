import React from 'react';
import { ShieldCheck, Timer, Target, Database, Flame } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="theme-p3 min-h-screen bg-white pt-48 pb-20 font-headline">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 border border-on-surface/10 rounded-sm overflow-hidden mb-20">
          <div className="lg:col-span-8 p-10 md:p-20 bg-white">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block mb-8">Nuestra Historia</span>
            <h1 className="text-6xl md:text-[100px] font-black text-on-surface leading-[0.85] tracking-tighter uppercase mb-12">
              ASADERO <br/>
              <span className="text-primary italic font-serif lowercase">alameda.</span>
            </h1>
            <p className="font-body text-2xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
              Estableciendo el estándar del pollo asado desde 1988 a través de una dedicación absoluta al sabor real y procesos artesanales rigurosos.
            </p>
          </div>
          <div className="lg:col-span-4 bg-on-surface p-12 text-white flex flex-col justify-end relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Flame size={200} strokeWidth={1} />
            </div>
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Fundación</p>
                <p className="text-3xl font-black uppercase tracking-tighter">EST. 1988</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Presencia</p>
                <p className="text-3xl font-black uppercase tracking-tighter">12 LOCALES</p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-on-surface uppercase tracking-tight">Filosofía del Fuego</h2>
            <div className="w-16 h-1 bg-primary"></div>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed font-light">
              Nuestra metodología no acepta compromisos. Seleccionamos pollos de corral de la máxima calidad y los sometemos a un proceso de asado que respeta la textura y potencia el sabor natural de la carne.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-8">
              {[
                { icon: Timer, title: 'Tiempo Real', desc: 'Asado lento que garantiza una piel crujiente y un interior jugoso.' },
                { icon: Target, title: 'Selección Única', desc: 'Solo trabajamos con proveedores certificados de cercanía.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 bg-on-surface/5 border-l-4 border-primary">
                  <item.icon className="text-primary shrink-0" size={24} />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2">{item.title}</h4>
                    <p className="text-[11px] text-on-surface-variant font-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square rounded-sm overflow-hidden border border-on-surface/10">
            <img 
              src="/assets/images/brasas_fuego_artesanal.png" 
              alt="Brasas Alameda" 
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="absolute bottom-8 left-8 right-8 bg-on-surface text-white p-8">
              <p className="font-serif italic text-xl leading-snug">
                "La calidad no es un accidente, es el resultado de un esfuerzo inteligente y constante."
              </p>
            </div>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="py-20 border-t border-on-surface/10 flex flex-wrap gap-20 justify-center opacity-40 grayscale">
          <div className="flex items-center gap-3"><ShieldCheck size={20} /> <span className="text-[10px] font-black uppercase tracking-[0.3em]">CALIDAD CERTIFICADA</span></div>
          <div className="flex items-center gap-3"><Database size={20} /> <span className="text-[10px] font-black uppercase tracking-[0.3em]">RECETA ORIGINAL 1988</span></div>
        </div>
      </div>
    </div>
  );
};
