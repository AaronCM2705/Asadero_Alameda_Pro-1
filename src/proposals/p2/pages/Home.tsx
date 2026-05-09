import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="theme-p2 min-h-screen bg-surface relative">
      <div className="absolute inset-0 bg-pattern pointer-events-none opacity-[0.03] z-0"></div>
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[60px] shadow-creative border border-outline-variant/30 overflow-hidden">
            
            {/* Text Column */}
            <div className="lg:col-span-7 p-10 md:p-20 relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-1 bg-primary rounded-full"></span>
                <span className="font-headline text-xs font-black text-primary uppercase tracking-[0.4em]">Sabor Artesanal</span>
              </div>
              
              <h1 className="font-headline text-5xl md:text-[90px] font-black text-on-surface leading-[0.9] tracking-tighter mb-8">
                EL REY DEL <br/>
                <span className="text-primary italic">ASADO.</span>
              </h1>
              
              <p className="font-body text-lg md:text-xl text-on-surface font-medium max-w-md mb-12 leading-relaxed">
                Pollos seleccionados, marinados por 24 horas y asados lentamente con leña de encina para un sabor inigualable.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/p2/menu" 
                  className="w-full sm:w-auto h-16 px-10 bg-primary text-white rounded-2xl font-headline text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-on-surface transition-all shadow-2xl hover:-translate-y-1"
                >
                  Pedir Ahora <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/p2/about" 
                  className="w-full sm:w-auto h-16 px-10 border-2 border-on-surface text-on-surface rounded-2xl font-headline text-sm font-black uppercase tracking-widest flex items-center justify-center hover:bg-surface-container transition-all"
                >
                  Historia
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-6 md:gap-10 opacity-80 transition-all">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Entrega Rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Calidad Premium</span>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 relative h-64 md:h-full min-h-[400px] md:min-h-[500px]">
              <img 
                src="/assets/images/hero-p2-gourmet.png" 
                alt="Pollo Asado Gourmet" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:block hidden"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white p-4 md:p-6 rounded-3xl shadow-2xl border border-outline-variant/50 animate-bounce-slow">
                <div className="text-center">
                  <p className="font-headline text-2xl md:text-3xl font-black text-primary">100%</p>
                  <p className="font-headline text-[8px] font-black uppercase tracking-widest text-on-surface">Natural</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-black uppercase tracking-tighter mb-4">Lo Más Vendido</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Pollo Alameda Gold', price: '18.50', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=500&q=80' },
              { name: 'Papas Rústicas', price: '4.50', img: '/assets/images/papas_rusticas.png' },
              { name: 'Costillar Ahumado', price: '22.90', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80' },
            ].map((item, i) => (
              <div key={i} className="group bg-white p-6 rounded-[40px] border border-outline-variant/30 hover:border-primary transition-all">
                <div className="aspect-square rounded-[30px] overflow-hidden mb-6">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-headline text-xl font-black mb-2">{item.name}</h3>
                <p className="text-primary font-headline font-black text-lg">€{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
