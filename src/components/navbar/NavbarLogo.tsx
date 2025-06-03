
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const NavbarLogo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="text-xl font-bold text-primary flex items-center gap-1">
        <Package className="h-6 w-6" />
        <span>NextCommerce</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
