
import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex space-x-6">
      <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
        Home
      </Link>
      <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
        Shop
      </Link>
      <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
        Categories
      </Link>
      <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
        About
      </Link>
      <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
        Contact
      </Link>
    </div>
  );
};

export default DesktopNavigation;
