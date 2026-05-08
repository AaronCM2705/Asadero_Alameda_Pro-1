import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, MapPin, Phone, Mail, LayoutDashboard, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="theme-p3 bg-on-surface text-white pt-24 pb-12 font-headline">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 bg-white/5 border border-white/10 rounded-sm overflow-hidden mb-20">
          
          {/* Section 1: Brand */}
          <div className="md:col-span-4 p-12 border-r border-white/10">
            <img src="/assets/images/logo-red.png" alt="Logo" className="h-10 mb-8 brightness-0 invert" />
            <p className="text-xs font-light text-white/40 leading-relaxed max-w-xs mb-10">
              Sistemas de restauración optimizados. Rendimiento, precisión y sabor sin concesiones.
            </p>
            <div className="flex gap-6 opacity-30">
              <span className="text-[10px] font-black uppercase tracking-widest">v2.0.4</span>
              <span className="text-[10px] font-black uppercase tracking-widest">SISTEMA: OK</span>
            </div>
          </div>

          {/* Section 2: Nav */}
          <div className="md:col-span-3 p-12 border-r border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Dirección</h4>
            <ul className="space-y-6">
              <li><Link to="/p3" className="text-sm font-black uppercase tracking-tighter hover:text-primary flex items-center justify-between group">01. INICIO <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/p3/menu" className="text-sm font-black uppercase tracking-tighter hover:text-primary flex items-center justify-between group">02. MENÚ <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/p3/about" className="text-sm font-black uppercase tracking-tighter hover:text-primary flex items-center justify-between group">03. NOSOTROS <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div className="md:col-span-3 p-12 border-r border-white/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Contacto</h4>
            <div className="space-y-4">
              <p className="text-[11px] font-bold text-white/60 flex items-center gap-3"><MapPin size={14} /> ALAMEDA, MADRID</p>
              <p className="text-[11px] font-bold text-white/60 flex items-center gap-3"><Phone size={14} /> +34 900 123 456</p>
              <p className="text-[11px] font-bold text-white/60 flex items-center gap-3"><Mail size={14} /> OPS@ALAMEDA.PRO</p>
            </div>
          </div>

          {/* Section 4: Admin */}
          <div className="md:col-span-2 p-12 bg-primary flex flex-col justify-between group cursor-pointer">
            <Link to="/p3/admin" className="h-full flex flex-col justify-between">
              <LayoutDashboard size={32} className="text-white group-hover:rotate-90 transition-transform duration-500" />
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] block mb-2 opacity-60">Admin Console</span>
                <p className="text-sm font-black uppercase tracking-tighter">ENTRAR →</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
          <p>© 2024 ASADERO ALAMEDA PERFORMANCE</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">TÉRMINOS</a>
            <a href="#" className="hover:text-white transition-colors">PRIVACIDAD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
