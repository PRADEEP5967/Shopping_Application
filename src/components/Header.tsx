import React from 'react';
import Navbar from './navbar/Navbar';
import FlipkartCategoryBar from './navbar/FlipkartCategoryBar';

const Header = () => {
  return (
    <header 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
      role="banner"
    >
      <Navbar />
      {/* Hide category bar on mobile and small tablets for better UX */}
      <nav className="hidden lg:block" aria-label="Category navigation">
        <FlipkartCategoryBar />
      </nav>
    </header>
  );
};

export default Header;
