
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X,
  LogIn,
  LogOut,
  Package
} from 'lucide-react';

const Navbar = () => {
  const { totalItems, toggleCart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-1">
            <Package className="h-6 w-6" />
            <span>NextCommerce</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Desktop Search, Account, Wishlist, Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-gray-600 hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/wishlist" className="text-gray-600 hover:text-primary">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/my-account" className="text-gray-600 hover:text-primary">
            <User className="h-5 w-5" />
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart}
            className="text-gray-600 hover:text-primary relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Hello, {user?.firstName}</span>
              <Button size="sm" variant="outline" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
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
      )}

      {/* Search Overlay (Desktop) */}
      {isSearchOpen && (
        <div className="hidden md:block absolute w-full bg-white shadow-md z-30 p-4">
          <div className="container mx-auto flex items-center">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="ml-2">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
