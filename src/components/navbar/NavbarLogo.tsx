
import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
        <Store className="h-7 w-7" />
        <div className="flex flex-col leading-tight">
          <span className="text-lg sm:text-xl">PRADEEP SAHANI</span>
          <span className="text-sm font-medium text-primary/80 hidden sm:block">MART</span>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
