import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { getProductCategories } from '@/data/products';
import { categoryDetails, slugify } from '@/components/category/categoryData';

const DesktopNavigation: React.FC = () => {
  const navigationItems = [
    {
      title: 'Categories',
      hasDropdown: true,
      content: <CategoriesDropdownContent />
    },
    {
      title: 'Products',
      href: '/products'
    },
    {
      title: 'Blog',
      hasDropdown: true,
      content: <BlogDropdownContent />
    },
    {
      title: 'Deals & Discounts',
      href: '/deals-discounts'
    },
    {
      title: 'New Arrivals',
      href: '/new-arrivals'
    },
    {
      title: 'About Us',
      href: '/about-us'
    },
    {
      title: 'Contact',
      href: '/contact-us'
    }
  ];

  return (
    <div className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.hasDropdown ? (
                <>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {item.content}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href!}
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const CategoriesDropdownContent: React.FC = () => {
  const categoryNames = getProductCategories();
  
  const categories = categoryNames.map(name => {
    const details = categoryDetails[name] || categoryDetails.default;
    return {
      id: name,
      name,
      icon: details.icon,
      link: `/category/${slugify(name)}`,
    };
  });

  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold text-lg mb-4">Shop by Category</h3>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              to={category.link}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="bg-blue-100 rounded-lg p-2 group-hover:bg-blue-200 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          to="/categories"
          className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Categories →
        </Link>
      </div>
    </div>
  );
};

const BlogDropdownContent: React.FC = () => {
  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold text-lg mb-4">Content & Guides</h3>
      <div className="space-y-3">
        <Link
          to="/blog"
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Blog</div>
          <div className="text-sm text-gray-500">Latest articles and news</div>
        </Link>
        <Link
          to="/buying-guides"
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Buying Guides</div>
          <div className="text-sm text-gray-500">Expert advice for your purchases</div>
        </Link>
        <Link
          to="/product-comparison"
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Product Comparison</div>
          <div className="text-sm text-gray-500">Compare products side-by-side</div>
        </Link>
        <Link
          to="/visual-search"
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Visual Search</div>
          <div className="text-sm text-gray-500">Search with images</div>
        </Link>
        <Link
          to="/subscriptions"
          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="font-medium text-gray-900 group-hover:text-blue-600">Subscriptions</div>
          <div className="text-sm text-gray-500">Manage auto-delivery</div>
        </Link>
      </div>
    </div>
  );
};

export default DesktopNavigation;
