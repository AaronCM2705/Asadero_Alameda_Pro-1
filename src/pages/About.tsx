import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center animate-fade-in">
        {/* Left Column: Image */}
        <div className="relative">
          <div className="absolute -inset-2 border border-primary/30 rounded-2xl pointer-events-none transform -rotate-2"></div>
          <img 
            alt="Brasas de leña" 
            className="w-full aspect-square object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-700 shadow-2xl rounded-2xl border border-primary/30" 
            src="/assets/images/brasas_fuego_artesanal.png"
          />
        </div>
        {/* Right Column: Content */}
        <div className="flex flex-col gap-6">
          <span className="font-label text-xs text-primary tracking-widest uppercase">Legado y Fuego</span>
          <h2 className="font-headline text-[48px] text-on-surface">Tradición de la Alameda</h2>
          <div className="w-16 h-px bg-primary"></div>
          <div className="space-y-6">
            <p className="font-body text-lg text-on-surface-variant leading-relaxed italic border-l-2 border-primary/50 pl-4">
              "En el corazón de la Alameda, el tiempo se detiene al ritmo de la brasa. No hay prisa cuando se busca la perfección; solo el crepitar honesto de la leña y el respeto sagrado por el producto de nuestra tierra."
            </p>
            <p className="font-body text-base text-on-surface-variant/80">
              Nuestra historia nace de la pasión por los sabores auténticos. Cada pollo, cada guarnición, pasa por el juicio del fuego lento, asegurando que cada bocado lleve consigo la esencia de una tradición que se niega a ser olvidada. Calidad local, maestría en el asado y un compromiso inquebrantable con la excelencia gastronómica.
            </p>
          </div>
          <div className="mt-8">
            <p className="font-headline text-primary italic text-[28px] drop-shadow-sm">Asadero Alameda</p>
          </div>
        </div>
      </div>
    </section>
  );
};
