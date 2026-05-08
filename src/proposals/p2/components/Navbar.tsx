import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Phone, MapPin, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Informative Top Bar */}
      <div className="bg-primary text-white h-8 flex items-center justify-between px-6 md:px-10 text-[10px] font-bold uppercase tracking-wider">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Phone size={12} /> Pedidos: +34 900 123 456</span>
          <span className="hidden sm:flex items-center gap-2"><MapPin size={12} /> Calle Alameda, 12, Madrid</span>
        </div>
        <div className="flex gap-4">
          <span className="hidden md:block">Abierto hoy: 12:00 - 23:00</span>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md border-b border-outline-variant h-[80px] flex items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-12">
          <Link to="/p2" className="group">
            <div className="flex items-center gap-4">
              <div className="h-14">
                <img src="/assets/images/logo-orange.png" alt="Asadero Alameda" className="h-full object-contain" />
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Inicio', path: '/p2' },
              { name: 'Menú', path: '/p2/menu' },
              { name: 'Nosotros', path: '/p2/about' }
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`font-headline text-sm font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${isActive ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-primary'}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/p2/admin" className="hidden lg:flex items-center gap-3 bg-secondary text-white px-6 py-3 rounded-xl font-headline text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg mr-2">
            <LayoutDashboard size={16} />
            <span>Panel Admin</span>
          </Link>
          <button 
            onClick={onCartClick} 
            className="w-12 h-12 bg-on-surface text-white flex items-center justify-center rounded-xl hover:bg-primary transition-all relative shadow-lg"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden w-12 h-12 flex items-center justify-center text-on-surface">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] p-8 flex flex-col animate-in fade-in slide-in-from-right duration-300">
          <button onClick={() => setIsMobileMenuOpen(false)} className="self-end p-2">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <div className="flex-grow flex flex-col justify-center gap-10 items-center">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p2" className="font-headline text-4xl font-black text-on-surface hover:text-primary uppercase tracking-tighter">Inicio</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p2/menu" className="font-headline text-4xl font-black text-on-surface hover:text-primary uppercase tracking-tighter">Menú</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p2/about" className="font-headline text-4xl font-black text-on-surface hover:text-primary uppercase tracking-tighter">Nosotros</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/p2/admin" className="font-headline text-xl font-bold text-primary uppercase tracking-widest mt-10">Panel de Control</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
