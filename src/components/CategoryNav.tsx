
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

interface CategoryNavProps {
  categories: string[];
}

const categoryIcons: Record<string, string> = {
  'Electronics': 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=200&auto=format&fit=crop',
  'Wearables': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=200&auto=format&fit=crop',
  'Computers': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=200&auto=format&fit=crop',
  'Smart Home': 'https://images.unsplash.com/photo-1558002038-1055e2dae1e7?q=80&w=200&auto=format&fit=crop',
  'Photography': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=200&auto=format&fit=crop',
  'Furniture': 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=200&auto=format&fit=crop',
  'Gaming': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=200&auto=format&fit=crop',
};

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  return (
    <div className="bg-white shadow-sm sticky top-16 z-30 py-2">
      <div className="container mx-auto">
        <NavigationMenu className="max-w-none justify-start">
          <NavigationMenuList className="flex space-x-8 overflow-x-auto py-2 px-4 scrollbar-none">
            {categories.map((category) => (
              <NavigationMenuItem key={category}>
                <Link 
                  to={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                  className="group flex flex-col items-center text-center hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 mb-1 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                    <img 
                      src={categoryIcons[category] || 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=200&auto=format&fit=crop'} 
                      alt={category} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium">{category}</span>
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
