
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from '@/components/navbar/NavbarLogo';
import DesktopNavigation from '@/components/navbar/DesktopNavigation';
import NavbarActions from '@/components/navbar/NavbarActions';
import MobileMenuButton from '@/components/navbar/MobileMenuButton';
import MobileMenu from '@/components/navbar/MobileMenu';
import SearchOverlay from '@/components/navbar/SearchOverlay';

const Navbar = () => {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 h-16 flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <NavbarLogo />
        </div>
        
        <div className="hidden lg:flex items-center flex-1 justify-center">
          <DesktopNavigation />
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <NavbarActions toggleSearch={toggleSearch} handleLogout={handleLogout} />
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        handleLogout={handleLogout} 
      />

      <SearchOverlay isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
    </nav>
  );
};

export default Navbar;
