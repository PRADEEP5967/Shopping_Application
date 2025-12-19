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
import { Search, ShoppingCart, Heart, User, LogOut, Settings, Shield, Package } from 'lucide-react';

interface NavbarActionsProps {
  toggleSearch: () => void;
  handleLogout: () => void;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({ toggleSearch, handleLogout }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2">
      {/* Search Button - Hidden on very small screens, shown from sm up */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleSearch}
        className="hidden sm:flex p-2 lg:p-2.5 hover:bg-muted text-foreground min-h-[40px] min-w-[40px]"
        title="Search"
        aria-label="Open search"
      >
        <Search className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>

      {/* Wishlist - Responsive sizing */}
      <Link to="/wishlist" className="hidden xs:block sm:block">
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 lg:p-2.5 hover:bg-muted text-foreground min-h-[40px] min-w-[40px]" 
          title="Wishlist"
          aria-label={`Wishlist with ${wishlistItems.length} items`}
        >
          <Heart className="h-4 w-4 lg:h-5 lg:w-5" />
          {wishlistItems.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 p-0 text-[10px] lg:text-xs flex items-center justify-center"
            >
              {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
            </Badge>
          )}
        </Button>
      </Link>

      {/* Cart - Always visible */}
      <Link to="/checkout">
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 lg:p-2.5 hover:bg-muted text-foreground min-h-[40px] min-w-[40px]" 
          title="Shopping Cart"
          aria-label={`Shopping cart with ${totalItems} items`}
        >
          <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 p-0 text-[10px] lg:text-xs flex items-center justify-center"
            >
              {totalItems > 9 ? '9+' : totalItems}
            </Badge>
          )}
        </Button>
      </Link>

      {/* User Menu - Responsive */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 lg:gap-2 p-1 lg:p-2 hover:bg-muted min-h-[40px]"
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7 lg:h-8 lg:w-8 border-2 border-primary/20">
                <AvatarImage 
                  src="https://avatars.githubusercontent.com/u/pradeepsahani" 
                  alt="User avatar" 
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs lg:text-sm font-semibold">
                  {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden xl:inline text-sm text-foreground font-medium">{user?.firstName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-foreground">Welcome back!</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem asChild>
              <Link to="/my-account" className="cursor-pointer text-foreground hover:text-primary">
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/orders" className="cursor-pointer text-foreground hover:text-primary">
                <Package className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/wishlist" className="cursor-pointer text-foreground hover:text-primary">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer text-foreground hover:text-primary">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem 
              onClick={handleLogout} 
              className="cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs lg:text-sm p-2 lg:px-3 lg:py-2 border-border text-foreground hover:bg-muted min-h-[40px]"
          >
            <User className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">Login</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarActions;
