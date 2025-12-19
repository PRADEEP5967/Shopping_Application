import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, User, Heart, Search, Gift, Grid3X3, BookOpen, Tag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    { name: 'New Arrivals', href: '/new-arrivals', icon: Sparkles },
    { name: 'Deals', href: '/deals-discounts', icon: Gift, badge: 'Hot' },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  const quickActions = [
    { 
      name: 'Search', 
      href: '/search', 
      icon: Search,
      badge: null
    },
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

  const shopCategories = [
    { name: 'Electronics', href: '/category/electronics', icon: Tag },
    { name: 'Clothing', href: '/category/clothing', icon: Tag },
    { name: 'Accessories', href: '/category/accessories', icon: Tag },
    { name: 'View All', href: '/categories', icon: Grid3X3 },
  ];

  return (
    <>
      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 xl:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out z-50 xl:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground text-sm font-bold">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Welcome back!</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {user.email}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="font-semibold text-foreground">Menu</p>
                <p className="text-xs text-muted-foreground">Navigate your store</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeMenu}
            className="h-10 w-10 p-0 hover:bg-muted text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="flex flex-col pb-6">
            {/* Main Navigation */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
                      className="flex items-center justify-between px-3 py-3 text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium text-sm">{item.name}</span>
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

            <Separator className="bg-border" />

            {/* Shop Categories */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Shop Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {shopCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      to={category.href}
                      onClick={closeMenu}
                      className="flex items-center gap-2 px-3 py-2.5 text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors group"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium text-sm">{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Quick Actions */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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
                      className="flex items-center justify-between px-3 py-3 text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium text-sm">{action.name}</span>
                      </div>
                      {action.badge && (
                        <Badge variant="secondary" className="h-5 min-w-5 text-xs bg-primary text-primary-foreground">
                          {action.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Account Section */}
            <div className="p-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Account
              </h3>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/my-account"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors group"
                  >
                    <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-sm">My Account</span>
                  </Link>
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 text-foreground hover:bg-muted hover:text-primary rounded-lg transition-colors group"
                  >
                    <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-sm">My Orders</span>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full justify-start gap-3 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive mt-2"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" onClick={closeMenu}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30 mt-auto">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Need help?</p>
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
        </ScrollArea>
      </div>
    </>
  );
};

export default MobileMenu;
