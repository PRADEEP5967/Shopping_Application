
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNavigation = () => {
  return (
    <nav
      className="hidden md:flex items-center"
      aria-label="Main site navigation"
      role="navigation"
    >
      <NavigationMenu>
        <NavigationMenuList className="space-x-6" aria-label="Primary">
          {/* HOME */}
          <NavigationMenuItem>
            <Link
              to="/"
              tabIndex={0}
              className="text-gray-600 hover:text-primary transition-colors font-medium focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              aria-label="Homepage"
            >
              Home
            </Link>
          </NavigationMenuItem>
          
          {/* SHOP DROPDOWN */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="text-gray-600 hover:text-primary transition-colors font-medium bg-transparent"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Shop, open submenu"
              tabIndex={0}
            >
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] grid-cols-1 gap-3 p-6" role="menu" aria-label="Shop submenu">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-3">Products</h3>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/products"
                      tabIndex={0}
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="All Products"
                      role="menuitem"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">All Products</div>
                      <div className="text-sm text-gray-500">Browse our complete catalog</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/categories"
                      tabIndex={0}
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Categories"
                      role="menuitem"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">Categories</div>
                      <div className="text-sm text-gray-500">Shop by product categories</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* All Other Main Links */}
          {[
            { to: "/performance", label: "Performance" },
            { to: "/efficiency", label: "Efficiency" },
            { to: "/quality", label: "Quality" },
            { to: "/about-us", label: "About" },
            { to: "/contact-us", label: "Contact" },
            { to: "/careers", label: "Careers" },
          ].map(({ to, label }) => (
            <NavigationMenuItem key={to}>
              <Link
                to={to}
                tabIndex={0}
                className="text-gray-600 hover:text-primary transition-colors font-medium focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label={label}
              >
                {label}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
