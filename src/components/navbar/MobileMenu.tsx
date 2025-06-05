
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Shield } from 'lucide-react';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 space-y-3">
        <Link to="/" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/products" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
          Shop
        </Link>
        <Link to="/categories" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
          Categories
        </Link>
        <Link to="/wishlist" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
          Wishlist
        </Link>
        <Link to="/my-account" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
          Account
        </Link>
        
        {isAuthenticated ? (
          <>
            <div className="py-2 text-sm text-gray-600">Hello, {user?.firstName}</div>
            {isAdmin && (
              <Link to="/admin" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        )}
        
        <div className="pt-2">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
