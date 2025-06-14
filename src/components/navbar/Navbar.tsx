import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import NavbarLogo from './NavbarLogo';
import DesktopNavigation from './DesktopNavigation';
import NavbarActions from './NavbarActions';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';
import SearchOverlay from '@/components/navbar/SearchOverlay';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/login');
  }, [logout, navigate]);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-white/95 dark:bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavbarLogo />
            <div className="flex-1 flex justify-center">
              <DesktopNavigation />
            </div>
            <div className="flex items-center gap-x-2">
              <NavbarActions toggleSearch={toggleSearch} handleLogout={handleLogout} />
              <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>
      </div>
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout} 
      />
      <SearchOverlay isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
    </header>
  );
};

export default Navbar;
