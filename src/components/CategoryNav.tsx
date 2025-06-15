
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Laptop, Watch, Home as HomeIcon, Monitor, Camera, Sofa, Gamepad } from 'lucide-react';

interface CategoryNavProps {
  categories: string[];
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  // Map categories to icons
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Electronics': return <Laptop className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      case 'Wearables': return <Watch className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      case 'Computers': return <Monitor className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      case 'Smart Home': return <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      case 'Photography': return <Camera className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      case 'Furniture': return <Sofa className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      case 'Gaming': return <Gamepad className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
      default: return <Laptop className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-125" />;
    }
  };
  
  return (
    <div className="bg-white shadow-sm sticky top-16 z-30 py-2">
      <div className="container mx-auto px-2 sm:px-4">
        <NavigationMenu className="max-w-none justify-start">
          <NavigationMenuList className="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto py-2 px-2 sm:px-4 scrollbar-none">
            {categories.map((category) => (
              <NavigationMenuItem key={category} className="flex-shrink-0">
                <Link 
                  to={`/category/${category.toLowerCase().replace(' ', '-')}`}
                  className="group flex flex-col items-center text-center hover:text-primary transition-colors min-w-[60px] sm:min-w-[80px]"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-1 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all hover:bg-primary/10">
                    {getCategoryIcon(category)}
                  </div>
                  <span className="text-xs sm:text-sm lg:text-base font-medium text-center leading-tight">{category}</span>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default CategoryNav;
