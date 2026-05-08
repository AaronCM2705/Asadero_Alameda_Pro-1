import React from 'react';
import { Heart, Utensils } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="theme-p2 min-h-screen bg-surface">
      {/* Creative Header */}
      <section className="pt-48 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-primary"></div>
            <span className="font-headline text-sm font-black text-primary uppercase tracking-[0.4em]">Nuestra Identidad</span>
            <div className="w-16 h-px bg-primary"></div>
          </div>
          <h1 className="font-headline text-6xl md:text-[100px] font-black text-on-surface leading-[0.85] tracking-tighter mb-12">
            PASIÓN POR <br/>
            <span className="text-primary italic">LA BRASA.</span>
          </h1>
          <p className="font-body text-2xl text-on-surface-variant leading-relaxed font-light">
            Desde 1988, Asadero Alameda ha sido el punto de encuentro para los amantes del buen pollo asado, combinando tradición familiar con un servicio de excelencia.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img src="/assets/images/brasas_fuego_artesanal.png" alt="Tradición" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-[60px] overflow-hidden shadow-2xl z-20 border-8 border-white hidden md:block">
                <img src="/assets/images/papas_rusticas.png" alt="Ingredientes" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/5 rounded-full -z-10 blur-3xl"></div>
            </div>
            
            <div className="space-y-10 relative z-30">
              <div className="space-y-6">
                <h2 className="font-headline text-4xl font-black text-on-surface uppercase tracking-tight">El Secreto de la Alameda</h2>
                <div className="w-20 h-2 bg-primary rounded-full"></div>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                  No es solo la leña de encina, ni solo el marinado de 24 horas con nuestra mezcla secreta de especias. Es el compromiso de tres generaciones trabajando para perfeccionar cada detalle.
                </p>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                  Hoy, Asadero Alameda es sinónimo de consistencia, sabor explosivo y un servicio que respeta tu tiempo sin sacrificar la calidad artesanal.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-10">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    <Heart size={24} />
                  </div>
                  <h4 className="font-headline font-black text-sm uppercase">Cariño</h4>
                  <p className="text-xs text-on-surface-variant font-body">Cuidamos cada pieza como si fuera para nuestra propia familia.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    <Utensils size={24} />
                  </div>
                  <h4 className="font-headline font-black text-sm uppercase">Maestría</h4>
                  <p className="text-xs text-on-surface-variant font-body">Expertos asadores con décadas de experiencia frente al fuego.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
