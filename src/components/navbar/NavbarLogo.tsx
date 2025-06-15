
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center gap-3 select-none group">
        <div className="flex flex-col leading-tight">
          <span className="text-lg sm:text-xl font-bold text-primary">
            PS Logo
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
