
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center gap-3 select-none group">
        {/* Logo Image */}
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=80&h=80&fit=cover"
          alt="Modern Store Logo"
          className="w-10 h-10 rounded-md object-cover transition-transform duration-200 group-hover:scale-110"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-lg sm:text-xl font-bold text-primary">
            Pradeep Sahani
          </span>
          <span className="text-sm font-medium text-primary/80 hidden sm:block">
            Mart
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
