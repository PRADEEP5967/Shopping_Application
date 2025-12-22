
import React from 'react';
import { Link } from 'react-router-dom';
import PSLogo from '@/components/branding/PSLogo';

const NavbarLogo = () => {
  return (
    <div className="flex items-center min-w-0">
      <Link to="/" className="flex items-center gap-2 sm:gap-3 select-none group min-w-0">
        <PSLogo size={32} className="sm:w-10 sm:h-10 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-sm sm:text-lg md:text-xl font-bold text-primary truncate">
            Pradeep Sahani
          </span>
          <span className="text-xs sm:text-sm font-medium text-primary/80 hidden sm:block">
            Mart
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
