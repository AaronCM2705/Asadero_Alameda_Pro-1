import React, { useState } from 'react';
import { ShoppingCart, Menu, Globe, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-[88px] bg-background/95 backdrop-blur-md border-b border-primary/20 transition-all duration-300">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-headline text-[24px] text-primary italic">Asadero Alameda</Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-primary font-bold pb-1 font-body text-base uppercase tracking-widest transition-opacity hover:opacity-80 ${location.pathname === '/' ? 'border-b border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Inicio</Link>
          <Link to="/menu" className={`text-primary font-bold pb-1 font-body text-base uppercase tracking-widest transition-opacity hover:opacity-80 ${location.pathname === '/menu' ? 'border-b border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Sinfonía de Brasas</Link>
          <Link to="/about" className={`text-primary font-bold pb-1 font-body text-base uppercase tracking-widest transition-opacity hover:opacity-80 ${location.pathname === '/about' ? 'border-b border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Sobre Nosotros</Link>
        </div>

        <div className="flex items-center gap-2 text-primary">
          <button className="h-14 w-14 flex items-center justify-center hover:opacity-80 transition-opacity">
            <Globe size={24} />
          </button>
          <button onClick={onCartClick} className="h-14 w-14 flex items-center justify-center hover:opacity-80 transition-opacity relative group">
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute top-2 right-2 bg-primary-container text-on-primary-container text-[10px] font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden h-14 w-14 flex items-center justify-center hover:opacity-80 transition-opacity">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[55]" onClick={closeMenu}></div>
      )}
      <div className={`fixed right-0 top-0 h-full w-64 bg-surface-container-lowest border-l border-primary/30 z-[60] pt-[88px] p-6 flex flex-col gap-6 shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={closeMenu} className="absolute top-6 right-6 text-on-surface hover:text-primary">
          <X size={24} />
        </button>
        <Link to="/" onClick={closeMenu} className="text-primary font-bold border-b border-primary/20 pb-4 font-body text-lg uppercase tracking-widest mt-4">Inicio</Link>
        <Link to="/menu" onClick={closeMenu} className="text-on-surface-variant hover:text-primary transition-colors border-b border-primary/10 pb-4 font-body text-lg uppercase tracking-widest">Menú</Link>
        <Link to="/about" onClick={closeMenu} className="text-on-surface-variant hover:text-primary transition-colors border-b border-primary/10 pb-4 font-body text-lg uppercase tracking-widest">Nosotros</Link>
      </div>
    </>
  );
};
