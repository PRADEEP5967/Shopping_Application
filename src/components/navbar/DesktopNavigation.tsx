
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
    <div className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList className="space-x-6">
          <NavigationMenuItem>
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Home
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-600 hover:text-primary transition-colors font-medium bg-transparent">
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] grid-cols-1 gap-3 p-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-3">Products</h3>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/products" 
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">All Products</div>
                      <div className="text-sm text-gray-500">Browse our complete catalog</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/categories" 
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">Categories</div>
                      <div className="text-sm text-gray-500">Shop by product categories</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/performance" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Performance
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/efficiency" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Efficiency
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/quality" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Quality
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/about-us" className="text-gray-600 hover:text-primary transition-colors font-medium">
              About
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/contact-us" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavigation;
