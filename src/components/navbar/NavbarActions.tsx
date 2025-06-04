
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  User, 
  LogIn,
  LogOut,
  Shield
} from 'lucide-react';

interface NavbarActionsProps {
  toggleSearch: () => void;
  handleLogout: () => void;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ toggleSearch, handleLogout }) => {
  const { totalItems, toggleCart } = useCart();
  const { user, isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-gray-600 hover:text-primary">
        <Search className="h-5 w-5" />
      </Button>
      
      {isAuthenticated && (
        <>
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
        </>
      )}
      
      {isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Hello, {user?.firstName}</span>
          {isAdmin && (
            <Link to="/admin">
              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
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
  );
};

export default NavbarActions;
