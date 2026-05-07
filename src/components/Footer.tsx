import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-10 flex flex-col items-center gap-2 text-center bg-surface-container-lowest border-t border-primary/10 mt-16">
      <h2 className="font-headline text-[40px] text-primary mb-6 italic drop-shadow-md">Asadero Alameda</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <Link to="/admin" className="text-on-surface-variant hover:text-primary transition-colors font-body text-[14px] uppercase tracking-widest">Panel de Gestión</Link>
        <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body text-[14px] uppercase tracking-widest">Privacidad</a>
        <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body text-[14px] uppercase tracking-widest">Términos</a>
      </div>
      <p className="font-body text-[14px] text-on-surface-variant/40">
        © 2024 Asadero Alameda. Todos los derechos reservados.
      </p>
    </footer>
  );
};
