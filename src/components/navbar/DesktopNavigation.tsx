
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
import CategoryPopoverContent from './CategoryPopoverContent';

const DesktopNavigation: React.FC = () => {
  const navigationItems = [
    {
      title: 'Categories',
      hasDropdown: true,
      content: <CategoryPopoverContent />
    },
    {
      title: 'Products',
      href: '/products'
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

export default DesktopNavigation;
