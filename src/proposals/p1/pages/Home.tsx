import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Utensils, Star } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="theme-p1 min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Brasas Tradicionales" 
            className="w-full h-full object-cover opacity-40 scale-105" 
            src="/assets/images/hero-bg-premium.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/90"></div>
        </div>

        <div className="container mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center">
          <div className="animate-fade-in flex flex-col items-center gap-6 md:gap-10 text-center max-w-5xl">
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 opacity-80">
                <div className="w-8 h-[1px] bg-primary"></div>
                <Sparkles className="text-primary" size={20} />
                <div className="w-8 h-[1px] bg-primary"></div>
              </div>
              <span className="font-label text-[10px] md:text-xs text-primary tracking-[0.6em] uppercase font-black">Especialidad de la Casa</span>
            </div>

            <h1 className="font-headline text-5xl md:text-[96px] leading-[0.95] text-on-surface drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] uppercase">
              La Esencia del <br/>
              <span className="text-primary italic font-serif lowercase">Asado Tradicional.</span>
            </h1>

            <div className="w-24 h-[1px] bg-primary/40 relative my-4">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-primary rotate-45 bg-background"></div>
            </div>

            <p className="font-body text-lg md:text-2xl text-on-surface max-w-2xl leading-relaxed font-bold opacity-90 px-4">
              Desde 1988, honrando la paciencia del fuego y la calidad de la tierra. Un viaje sensorial al corazón de la Alameda.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mt-10 w-full px-6 md:px-0">
              <Link 
                to="/p1/menu"
                className="group relative h-16 w-full sm:w-auto px-16 bg-primary text-black font-body text-xs uppercase tracking-[0.2em] transition-all rounded-full overflow-hidden flex items-center justify-center font-black shadow-[0_10px_40px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Ver la Carta</span>
              </Link>
              
              <Link 
                to="/p1/about"
                className="h-16 w-full sm:w-auto px-12 border-2 border-primary/40 text-primary hover:bg-primary/5 transition-all rounded-full font-body text-xs uppercase tracking-[0.2em] flex items-center justify-center font-black"
              >
                Historia
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mt-16 md:mt-20 opacity-80 w-full max-w-3xl border-t border-primary/10 pt-10">
              <div className="flex items-center justify-center gap-4">
                <Utensils size={20} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Artesanal</span>
              </div>
              <div className="flex items-center justify-center gap-4 border-y md:border-y-0 md:border-x border-primary/10 py-4 md:py-0 md:px-16">
                <Star size={20} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Calidad Premium</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Sparkles size={20} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Tradición</span>
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
