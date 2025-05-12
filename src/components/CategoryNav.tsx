
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
      case 'Electronics': return <Laptop className="h-5 w-5" />;
      case 'Wearables': return <Watch className="h-5 w-5" />;
      case 'Computers': return <Monitor className="h-5 w-5" />;
      case 'Smart Home': return <HomeIcon className="h-5 w-5" />;
      case 'Photography': return <Camera className="h-5 w-5" />;
      case 'Furniture': return <Sofa className="h-5 w-5" />;
      case 'Gaming': return <Gamepad className="h-5 w-5" />;
      default: return <Laptop className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="bg-white shadow-sm sticky top-16 z-30 py-2">
      <div className="container mx-auto">
        <NavigationMenu className="max-w-none justify-start">
          <NavigationMenuList className="flex space-x-4 md:space-x-8 overflow-x-auto py-2 px-4 scrollbar-none">
            {categories.map((category) => (
              <NavigationMenuItem key={category}>
                <Link 
                  to={`/category/${category.toLowerCase().replace(' ', '-')}`}
                  className="group flex flex-col items-center text-center hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 mb-1 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all hover:bg-primary/10">
                    {getCategoryIcon(category)}
                  </div>
                  <span className="text-xs md:text-sm font-medium">{category}</span>
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
