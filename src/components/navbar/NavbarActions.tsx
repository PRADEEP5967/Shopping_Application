
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Search, ShoppingCart, Heart, User, LogOut, Settings, Shield } from 'lucide-react';

interface NavbarActionsProps {
  toggleSearch: () => void;
  handleLogout: () => void;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ toggleSearch, handleLogout }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="flex items-center space-x-2">
      {/* Search Button - Desktop */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleSearch}
        className="hidden md:flex"
        title="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Wishlist */}
      <Link to="/wishlist">
        <Button variant="ghost" size="sm" className="relative" title="Wishlist">
          <Heart className="h-5 w-5" />
          {wishlistItems.length > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
              {wishlistItems.length}
            </Badge>
          )}
        </Button>
      </Link>

      {/* Cart */}
      <Link to="/checkout">
        <Button variant="ghost" size="sm" className="relative" title="Shopping Cart">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </Link>

      {/* User Menu */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage 
                  src="https://avatars.githubusercontent.com/u/your-github-username" 
                  alt="Pradeep Sahani" 
                />
                <AvatarFallback className="bg-primary text-white text-sm">PS</AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline text-sm">{user?.firstName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">Welcome back!</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/my-account" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/orders" className="cursor-pointer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarActions;
