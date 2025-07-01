
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  ShoppingBag, 
  Grid3X3, 
  BookOpen, 
  Gift, 
  Sparkles, 
  TrendingUp,
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';

const ImprovedDesktopNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  const navigationItems = [
    {
      title: 'Shop',
      href: '/products',
      icon: ShoppingBag,
      isActive: isActive('/products'),
      hasDropdown: true,
      content: <ShopDropdownContent />
    },
    {
      title: 'Categories',
      href: '/categories',
      icon: Grid3X3,
      isActive: isActive('/categories'),
      hasDropdown: true,
      content: <CategoriesDropdownContent />
    },
    {
      title: 'Deals',
      href: '/deals-discounts',
      icon: Gift,
      isActive: isActive('/deals'),
      badge: 'Hot',
      hasDropdown: true,
      content: <DealsDropdownContent />
    },
    {
      title: 'Blog',
      href: '/blog',
      icon: BookOpen,
      isActive: isActive('/blog'),
      hasDropdown: true,
      content: <BlogDropdownContent />
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavigationMenuItem key={item.title}>
              {item.hasDropdown ? (
                <>
                  <NavigationMenuTrigger 
                    className={cn(
                      "group flex items-center gap-2 h-10 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                      "hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary",
                      "data-[state=open]:bg-gray-100 data-[state=open]:text-primary",
                      item.isActive && "bg-primary/10 text-primary font-semibold"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="h-4 px-1.5 text-[10px] animate-pulse"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {item.content}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex items-center gap-2 h-10 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                      "hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary",
                      item.isActive && "bg-primary/10 text-primary font-semibold"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="h-4 px-1.5 text-[10px]"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ShopDropdownContent: React.FC = () => (
  <div className="w-96 p-6 bg-white rounded-xl shadow-xl border">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <ShoppingBag className="h-5 w-5 text-primary" />
      Shop Now
    </h3>
    <div className="space-y-3">
      <Link
        to="/products"
        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
      >
        <div>
          <div className="font-medium text-gray-900 group-hover:text-primary">All Products</div>
          <div className="text-sm text-gray-500">Browse our complete collection</div>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
      </Link>
      
      <Link
        to="/new-arrivals"
        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Sparkles className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900 group-hover:text-primary">New Arrivals</div>
            <div className="text-sm text-gray-500">Latest products just added</div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700">New</Badge>
      </Link>

      <Link
        to="/products?featured=true"
        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Star className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900 group-hover:text-primary">Featured</div>
            <div className="text-sm text-gray-500">Staff picks and bestsellers</div>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

const CategoriesDropdownContent: React.FC = () => (
  <div className="w-80 p-6 bg-white rounded-xl shadow-xl border">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <Grid3X3 className="h-5 w-5 text-primary" />
      Browse Categories
    </h3>
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: 'Electronics', href: '/category/electronics' },
        { name: 'Clothing', href: '/category/clothing' },
        { name: 'Home & Garden', href: '/category/home' },
        { name: 'Sports', href: '/category/sports' },
        { name: 'Beauty', href: '/category/beauty' },
        { name: 'Books', href: '/category/books' }
      ].map((category) => (
        <Link
          key={category.name}
          to={category.href}
          className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-center group"
        >
          <div className="font-medium text-gray-900 group-hover:text-primary text-sm">
            {category.name}
          </div>
        </Link>
      ))}
    </div>
    <div className="mt-4 pt-4 border-t">
      <Link
        to="/categories"
        className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
      >
        View All Categories
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  </div>
);

const DealsDropdownContent: React.FC = () => (
  <div className="w-80 p-6 bg-white rounded-xl shadow-xl border">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <Gift className="h-5 w-5 text-primary" />
      Special Deals
      <Badge variant="destructive" className="animate-pulse">Live</Badge>
    </h3>
    <div className="space-y-3">
      <Link
        to="/deals-discounts"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group border border-red-100"
      >
        <div className="bg-red-100 p-2 rounded-lg">
          <Zap className="h-4 w-4 text-red-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900 group-hover:text-red-600">Flash Sale</div>
          <div className="text-sm text-gray-500">Up to 70% off - Limited time</div>
        </div>
      </Link>
      
      <Link
        to="/offers"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
      >
        <div className="bg-blue-100 p-2 rounded-lg">
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Personal Offers</div>
          <div className="text-sm text-gray-500">Deals curated for you</div>
        </div>
      </Link>
    </div>
  </div>
);

const BlogDropdownContent: React.FC = () => (
  <div className="w-80 p-6 bg-white rounded-xl shadow-xl border">
    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
      <BookOpen className="h-5 w-5 text-primary" />
      Content & Guides
    </h3>
    <div className="space-y-3">
      {[
        { name: 'Blog', href: '/blog', desc: 'Latest articles and news' },
        { name: 'Buying Guides', href: '/buying-guides', desc: 'Expert advice for purchases' },
        { name: 'Product Comparison', href: '/product-comparison', desc: 'Compare products side-by-side' }
      ].map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="font-medium text-gray-900 group-hover:text-primary">{item.name}</div>
          <div className="text-sm text-gray-500">{item.desc}</div>
        </Link>
      ))}
    </div>
  </div>
);

export default ImprovedDesktopNavigation;
