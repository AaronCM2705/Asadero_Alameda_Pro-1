import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, LayoutDashboard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="theme-p2 bg-white border-t border-outline-variant pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <img src="/assets/images/logo-orange.png" alt="Logo" className="h-16 mb-8" />
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8 font-medium">
              Llevando el sabor del asado tradicional a un nivel gourmet superior. Calidad, frescura y pasión en cada pedido.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-headline font-black text-sm uppercase tracking-widest mb-8">Navegación</h4>
            <ul className="space-y-4 text-sm font-bold text-on-surface-variant">
              <li><Link to="/p2" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/p2/menu" className="hover:text-primary transition-colors">Nuestra Carta</Link></li>
              <li><Link to="/p2/about" className="hover:text-primary transition-colors">Conócenos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline font-black text-sm uppercase tracking-widest mb-8">Contacto</h4>
            <ul className="space-y-4 text-sm font-bold text-on-surface-variant">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-primary" /> Calle Alameda 12, Madrid</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> +34 900 123 456</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> hola@asaderoalameda.es</li>
            </ul>
          </div>

          {/* Admin Access */}
          <div>
            <h4 className="font-headline font-black text-sm uppercase tracking-widest mb-8">Gestión Interna</h4>
            <Link to="/p2/admin" className="inline-flex items-center gap-3 px-6 py-3 bg-surface-container rounded-2xl border border-outline-variant hover:border-primary transition-all group">
              <LayoutDashboard size={18} className="text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest text-on-surface">Panel Admin</span>
            </Link>
          </div>
        </div>

        <div className="pt-10 border-t border-outline-variant text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-40">
            © 2024 Asadero Alameda Gourmet • Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
