import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Utensils, Star } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="theme-p1 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Brasas Tradicionales" 
            className="w-full h-full object-cover opacity-30 scale-110" 
            src="/assets/images/hero-bg.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/80"></div>
        </div>

        <div className="container mx-auto px-10 relative z-10 flex flex-col items-center">
          <div className="animate-fade-in flex flex-col items-center gap-10 text-center max-w-5xl">
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 opacity-70">
                <div className="w-12 h-[1px] bg-primary"></div>
                <Sparkles className="text-primary" size={20} />
                <div className="w-12 h-[1px] bg-primary"></div>
              </div>
              <span className="font-label text-xs text-primary tracking-[0.6em] uppercase">Especialidad de la Casa</span>
            </div>

            <h1 className="font-headline text-5xl md:text-[96px] leading-[0.9] text-on-surface drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              La Esencia del <br/>
              <span className="text-primary italic">Asado Tradicional.</span>
            </h1>

            <div className="w-32 h-[1px] bg-primary/40 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-primary rotate-45 bg-background"></div>
            </div>

            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed font-light">
              Desde 1988, honrando la paciencia del fuego y la calidad de la tierra. Un viaje sensorial al corazón de la Alameda.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-6">
              <Link 
                to="/p1/menu"
                className="group relative h-16 px-16 bg-primary-container text-background font-body text-sm uppercase tracking-[0.2em] transition-all rounded-full overflow-hidden flex items-center justify-center font-black shadow-[0_10px_30px_rgba(205,127,50,0.3)] hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">Explorar la Carta</span>
              </Link>
              
              <Link 
                to="/p1/about"
                className="h-16 px-12 border border-primary/30 text-primary hover:bg-primary/5 transition-all rounded-full font-body text-sm uppercase tracking-[0.2em] flex items-center justify-center"
              >
                Nuestra Historia
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-16 mt-20 opacity-60">
              <div className="flex flex-col items-center gap-2">
                <Utensils size={18} className="text-primary" />
                <span className="text-[10px] font-label uppercase tracking-widest">Artesanal</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-x border-primary/20 px-16">
                <Star size={18} className="text-primary" />
                <span className="text-[10px] font-label uppercase tracking-widest">Premium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                <span className="text-[10px] font-label uppercase tracking-widest">Tradición</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 border border-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-primary/5 rounded-full animate-bounce-slow"></div>
      </section>
    </div>
  );
};
