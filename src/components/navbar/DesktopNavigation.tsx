
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const DesktopNavigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/api-showcase', label: 'Live API' },
    { href: '/categories', label: 'Categories' },
    { href: '/deals', label: 'Deals' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary relative',
            isActive(item.href)
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          {item.label}
          {isActive(item.href) && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
