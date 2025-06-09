
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Shield, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-md border-t">
      <div className="container mx-auto px-4 py-3 space-y-3">
        <Link to="/" className="block py-2 text-gray-600 hover:text-primary font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-gray-600 hover:text-primary font-medium transition-colors">
            Shop
            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-4">
            <Link to="/accessories" className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Accessories
            </Link>
            <Link to="/shoes" className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Shoes
            </Link>
            <Link to="/clothing" className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Clothing
            </Link>
            <Link to="/electronics" className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              Electronics
            </Link>
            <Link to="/products" className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
              All Products
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Link to="/categories" className="block py-2 text-gray-600 hover:text-primary font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
          Categories
        </Link>
        
        <Link to="/about-us" className="block py-2 text-gray-600 hover:text-primary font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
        
        <Link to="/contact-us" className="block py-2 text-gray-600 hover:text-primary font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
          Contact
        </Link>
        
        <Link to="/wishlist" className="block py-2 text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
          Wishlist
        </Link>
        <Link to="/my-account" className="block py-2 text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
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
          <Link to="/login" className="block py-2 text-gray-600 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
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
