import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Shield, ChevronRight, Search } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AdvancedSearch from '@/components/AdvancedSearch';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isMenuOpen) return null;

  return (
    <nav
      className="lg:hidden bg-white shadow-lg border-t"
      aria-label="Mobile site navigation"
      role="navigation"
    >
      <div className="container mx-auto px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto" tabIndex={-1}>
        {/* Search Bar - Mobile */}
        <div className="lg:hidden">
          <AdvancedSearch onClose={() => setIsMenuOpen(false)} />
        </div>
        
        {/* User Profile Section */}
        {isAuthenticated && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg" aria-label="User profile">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src="https://avatars.githubusercontent.com/u/your-github-username" 
                alt="Pradeep Sahani" 
              />
              <AvatarFallback className="bg-primary text-white">PS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Welcome, {user?.firstName}!</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="space-y-2" role="menu" aria-label="Primary">
          <Link 
            to="/" 
            className="block py-3 px-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors" 
            onClick={() => setIsMenuOpen(false)}
            aria-label="Homepage"
            tabIndex={0}
            role="menuitem"
          >
            Home
          </Link>
          
          <Collapsible>
            <CollapsibleTrigger
              className="flex items-center justify-between w-full py-3 px-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Shop, open submenu"
              tabIndex={0}
            >
              Shop
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-4 mt-1" role="menu" aria-label="Shop submenu">
              <Link 
                to="/products" 
                className="block py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setIsMenuOpen(false)}
                aria-label="All Products"
                tabIndex={0}
                role="menuitem"
              >
                All Products
              </Link>
              <Link 
                to="/categories" 
                className="block py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Categories"
                tabIndex={0}
                role="menuitem"
              >
                Categories
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {/* Main Single Links */}
          {['performance', 'efficiency', 'quality', 'about-us', 'contact-us', 'careers'].map((path) => (
            <Link 
              key={path}
              to={`/${path}`} 
              className="block py-3 px-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium transition-colors capitalize focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setIsMenuOpen(false)}
              aria-label={path.replace('-', ' ')}
              tabIndex={0}
              role="menuitem"
            >
              {path.replace('-', ' ')}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="space-y-2 pt-4 border-t" aria-label="User actions">
          <Link 
            to="/wishlist" 
            className="block py-3 px-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Wishlist"
            tabIndex={0}
            role="menuitem"
          >
            Wishlist
          </Link>
          <Link 
            to="/my-account" 
            className="block py-3 px-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setIsMenuOpen(false)}
            aria-label="My Account"
            tabIndex={0}
            role="menuitem"
          >
            My Account
          </Link>
          
          {isAuthenticated ? (
            <div className="space-y-2">
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} aria-label="Admin Panel">
                  <Button variant="outline" className="w-full justify-start" tabIndex={0}>
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
                aria-label="Logout"
                tabIndex={0}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} aria-label="Login or Register">
              <Button className="w-full" tabIndex={0}>
                Login / Register
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;
