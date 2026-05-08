import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Phone, Mail, LayoutDashboard, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="theme-p1 bg-surface-container-lowest border-t border-primary/20 pt-24 pb-12">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand */}
          <div className="space-y-8 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <img src="/assets/images/logo-gold.png" alt="Logo" className="h-14" />
              <h2 className="font-headline text-3xl text-primary italic">Alameda</h2>
            </div>
            <p className="font-body text-sm text-on-surface-variant/60 leading-relaxed max-w-xs">
              Honrando la tradición del asado a la leña desde hace tres décadas. Una experiencia de lujo para el paladar.
            </p>
            <div className="flex gap-6">
              <Instagram size={20} className="text-primary hover:scale-125 transition-transform cursor-pointer" />
              <Facebook size={20} className="text-primary hover:scale-125 transition-transform cursor-pointer" />
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-10">Navegación</h4>
            <ul className="space-y-6 font-body text-sm text-on-surface-variant">
              <li><Link to="/p1" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/p1/menu" className="hover:text-primary transition-colors">La Carta</Link></li>
              <li><Link to="/p1/about" className="hover:text-primary transition-colors">Historia</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-10">Contacto</h4>
            <ul className="space-y-6 font-body text-sm text-on-surface-variant">
              <li className="flex items-center justify-center md:justify-start gap-4"><MapPin size={16} className="text-primary" /> Calle Alameda 12</li>
              <li className="flex items-center justify-center md:justify-start gap-4"><Phone size={16} className="text-primary" /> +34 900 123 456</li>
              <li className="flex items-center justify-center md:justify-start gap-4"><Mail size={16} className="text-primary" /> info@alameda.es</li>
            </ul>
          </div>

          {/* Admin */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <Link to="/p1/admin" className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500 shadow-xl">
                <LayoutDashboard size={24} />
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 transition-opacity">Consola Admin</span>
            </Link>
          </div>
        </div>

        <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="font-body text-[10px] uppercase tracking-widest">© 2024 ASADERO ALAMEDA GOLD</p>
          <div className="flex gap-10 font-body text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">PRIVACIDAD</a>
            <a href="#" className="hover:text-primary transition-colors">AVISO LEGAL</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
