
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
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      {/* Search Button - Desktop and Tablet */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleSearch}
        className="hidden sm:flex p-2 sm:p-2.5"
        title="Search"
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {/* Wishlist - responsive sizing */}
      <Link to="/wishlist">
        <Button variant="ghost" size="sm" className="relative p-2 sm:p-2.5" title="Wishlist">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          {wishlistItems.length > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs flex items-center justify-center">
              {wishlistItems.length}
            </Badge>
          )}
        </Button>
      </Link>

      {/* Cart - responsive sizing */}
      <Link to="/checkout">
        <Button variant="ghost" size="sm" className="relative p-2 sm:p-2.5" title="Shopping Cart">
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
        </Button>
      </Link>

      {/* User Menu - responsive */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
              <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
                <AvatarImage 
                  src="https://avatars.githubusercontent.com/u/pradeepsahani" 
                  alt="Pradeep Sahani" 
                />
                <AvatarFallback className="bg-primary text-white text-xs sm:text-sm">PS</AvatarFallback>
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
          <Button variant="outline" size="sm" className="text-xs sm:text-sm p-2 sm:p-2.5">
            <User className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarActions;
