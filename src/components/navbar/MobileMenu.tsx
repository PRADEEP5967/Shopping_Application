
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, User, Heart, Search, Gift, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

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
  const { isAuthenticated, user } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const closeMenu = () => setIsMenuOpen(false);

  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Categories', href: '/categories', icon: Grid3X3 },
    { name: 'Deals', href: '/deals-discounts', icon: Gift, badge: 'Hot' },
    { name: 'Search', href: '/search', icon: Search },
  ];

  const quickActions = [
    { 
      name: 'Cart', 
      href: '/cart', 
      icon: ShoppingBag, 
      badge: cartItems.length > 0 ? cartItems.length : null 
    },
    { 
      name: 'Wishlist', 
      href: '/wishlist', 
      icon: Heart, 
      badge: wishlistItems.length > 0 ? wishlistItems.length : null 
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">Welcome back!</p>
                  <p className="text-xs text-gray-500 truncate max-w-32">
                    {user.email}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="font-medium">Menu</p>
                <p className="text-xs text-gray-500">Navigate your store</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeMenu}
            className="h-8 w-8 p-0 hover:bg-gray-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col h-full overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="h-5 text-xs animate-pulse"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Quick Actions
            </h3>
            <div className="space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.name}
                    to={action.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                      <span className="font-medium">{action.name}</span>
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="h-5 min-w-5 text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Account Section */}
          <div className="p-4 flex-1">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/my-account"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors group"
                >
                  <User className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                  <span className="font-medium">My Account</span>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" onClick={closeMenu}>
                  <Button className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">Create Account</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 mt-auto">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Need help?</p>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="text-xs text-primary hover:underline font-medium"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
