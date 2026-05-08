import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Phone, Clock, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Essential Contact Bar */}
      <div className="bg-primary text-white h-8 flex items-center justify-between px-6 md:px-10 text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="flex gap-8">
          <span className="flex items-center gap-2"><Phone size={12} /> Contacto Directo: +34 900 123 456</span>
          <span className="flex items-center gap-2"><Clock size={12} /> Abierto 12h - 23h</span>
        </div>
        <div className="hidden sm:block">Asadero Alameda — Propuesta 3</div>
      </div>

      <div className="bg-white/90 backdrop-blur-2xl border-b border-on-surface/10 h-[80px] flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-12">
          <Link to="/p3" className="group">
            <div className="flex items-center gap-4">
              <div className="h-12">
                <img src="/assets/images/logo-red.png" alt="Asadero Alameda Pro" className="h-full object-contain" />
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Inicio', path: '/p3' },
              { name: 'Menú', path: '/p3/menu' },
              { name: 'Sobre Nosotros', path: '/p3/about' }
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`font-headline text-[11px] font-black uppercase tracking-[0.3em] transition-all py-2 border-b-2 ${isActive ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-on-surface'}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/p3/admin" className="hidden lg:flex items-center gap-3 bg-white border-2 border-on-surface text-on-surface px-6 py-2.5 rounded-sm font-headline text-[10px] font-black uppercase tracking-widest hover:bg-on-surface hover:text-white transition-all shadow-xl mr-2">
            <LayoutDashboard size={14} />
            <span>Panel Admin</span>
          </Link>
          <button 
            onClick={onCartClick} 
            className="w-12 h-12 bg-on-surface text-white flex items-center justify-center rounded-sm hover:bg-primary transition-all relative shadow-xl active:scale-95"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden w-12 h-12 flex items-center justify-center text-on-surface">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-on-surface z-[100] p-10 flex flex-col theme-p3 animate-in fade-in duration-500">
          <button onClick={() => setIsMobileMenuOpen(false)} className="self-end text-white p-2">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <div className="flex-grow flex flex-col justify-center gap-12 text-center md:text-left">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p3" className="font-headline text-5xl md:text-8xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter">01. Inicio</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p3/menu" className="font-headline text-5xl md:text-8xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter">02. Menú</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p3/about" className="font-headline text-5xl md:text-8xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter">03. Nosotros</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p3/admin" className="font-headline text-xl font-black text-primary uppercase tracking-[0.2em] mt-12">Panel Administrativo →</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
