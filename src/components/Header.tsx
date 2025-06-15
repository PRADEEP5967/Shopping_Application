
import React from 'react';
import Navbar from './navbar/Navbar';
import FlipkartCategoryBar from './navbar/FlipkartCategoryBar';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <Navbar />
      <FlipkartCategoryBar />
    </div>
  );
};

export default Header;
