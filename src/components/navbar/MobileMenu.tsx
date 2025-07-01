
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Package, Grid3X3, Percent, BookOpen, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen,
  handleLogout 
}) => {
  const { user } = useAuth();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/api-showcase', label: 'Live API', icon: Database },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/deals', label: 'Deals', icon: Percent },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(false)}
            className="p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t my-6" />

          {/* Account Section */}
          <div className="space-y-2">
            {user ? (
              <>
                <Link
                  to="/my-account"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">My Account</span>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                  className="w-full justify-start px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <span className="font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
