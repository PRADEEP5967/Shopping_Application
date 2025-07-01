
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

  // Close mobile menu when clicking outside
  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo Section */}
          <div className="flex-shrink-0 z-50">
            <NavbarLogo />
          </div>
          
          {/* Desktop Navigation - centered */}
          <nav className="hidden lg:flex flex-1 justify-center" aria-label="Main navigation">
            <DesktopNavigation />
          </nav>
          
          {/* Actions Section */}
          <div className="flex items-center gap-2 lg:gap-3">
            <NavbarActions 
              toggleSearch={toggleSearch} 
              handleLogout={handleLogout} 
            />
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <MobileMenuButton 
                isMenuOpen={isMenuOpen} 
                toggleMenu={toggleMenu} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout} 
      />

      {/* Search Overlay */}
      <SearchOverlay 
        isSearchOpen={isSearchOpen} 
        toggleSearch={toggleSearch} 
      />
    </header>
  );
};

export default Navbar;
