
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
import { cn } from '@/lib/utils';

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
              <div className="grid w-[600px] grid-cols-2 gap-3 p-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-3">Categories</h3>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/accessories" 
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">Accessories</div>
                      <div className="text-sm text-gray-500">Bags, wallets, belts & more</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/shoes" 
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">Shoes</div>
                      <div className="text-sm text-gray-500">Athletic, casual & formal footwear</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-3">More Categories</h3>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/clothing" 
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">Clothing</div>
                      <div className="text-sm text-gray-500">T-shirts, jackets & apparel</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/electronics" 
                      className="block p-3 rounded-md hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-medium text-gray-900 group-hover:text-primary">Electronics</div>
                      <div className="text-sm text-gray-500">Gadgets, audio & smart devices</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-gray-600 hover:text-primary transition-colors font-medium bg-transparent">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] p-4">
                <div className="grid grid-cols-1 gap-2">
                  <NavigationMenuLink asChild>
                    <Link to="/categories" className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900">All Categories</div>
                      <div className="text-sm text-gray-500">Browse all product categories</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/new-arrivals" className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="font-medium text-gray-900">New Arrivals</div>
                      <div className="text-sm text-gray-500">Latest products and collections</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
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
