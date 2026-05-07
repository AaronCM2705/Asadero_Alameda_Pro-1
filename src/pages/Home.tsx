import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <header className="relative min-h-[90vh] flex items-center justify-center border-b border-primary/30 animate-fade-in">
      <div className="absolute inset-0 w-full h-full">
        <img 
          alt="Pollo asado a la leña" 
          className="w-full h-full object-cover opacity-30" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7nhQyLbPa6MCCMDJy5wCre6kRJngDU1ieLBHNTCAg-1T0p3EDWRSZZjN5b33dyfPJPSuy3SAWxms6A3NKP65pWExRo1kFumH4T0nnxYUHdgKIQHNhm1xHC_aGSDwsSTlzMx1yUIAMVqMjlkVDtKYHm9jDuSiEu0BQztdyCOG9B7Aj0XZuTIeYWlZwakBfqOTG6hrKGXcLYo-8WHXnkhHKR7IHdWdXx5yMJSAxGfVzznjIJeX2yK9NJHSuyVyqolk2MDrFL3rw5ts"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <span className="font-label text-xs text-primary tracking-widest uppercase mb-4 block">Especialidad de la Casa</span>
        <h1 className="font-headline text-[48px] md:text-[72px] leading-tight text-on-surface mb-8 drop-shadow-2xl">
          Tradición y Brasa en el Corazón de la Alameda
        </h1>
        <div className="w-24 h-[2px] bg-primary mb-8 rounded-full shadow-[0_0_10px_rgba(205,127,50,0.5)]"></div>
        <Link 
          to="/menu"
          className="inline-flex items-center justify-center h-14 px-12 bg-primary-container text-background font-body text-lg uppercase tracking-widest hover:bg-primary transition-all rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(205,127,50,0.4)] hover:scale-105 font-bold"
        >
          Explorar el Menú
        </Link>
      </div>
    </header>
  );
};
