
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book, 
  Gift,
  Sparkles,
  Tag
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  image: string;
  link: string;
  badge?: string;
  color: string;
}

const categories: CategoryItem[] = [
  {
    id: '1',
    name: 'Electronics',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=200&auto=format&fit=crop',
    link: '/category/electronics',
    badge: 'Hot',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    name: 'Fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop',
    link: '/category/clothing',
    badge: 'Trending',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: '3',
    name: 'Home & Living',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto=format&fit=crop',
    link: '/category/home',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: '4',
    name: 'Sports',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200&auto=format&fit=crop',
    link: '/category/sports',
    badge: 'New',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: '5',
    name: 'Books',
    icon: Book,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=200&auto=format&fit=crop',
    link: '/category/books',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: '6',
    name: 'Gifts',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=200&auto=format&fit=crop',
    link: '/category/gifts',
    badge: 'Special',
    color: 'from-violet-500 to-purple-500'
  }
];

const ModernCategoryNav = () => {
  return (
    <div className="bg-white py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing products across all categories with exclusive deals and offers
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-70 transition-opacity`} />
                  
                  {/* Badge */}
                  {category.badge && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white text-gray-900 text-xs font-semibold px-2 py-1 animate-pulse">
                        <Tag className="h-3 w-3 mr-1" />
                        {category.badge}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <div className="bg-white/20 rounded-full p-3 mb-3 group-hover:scale-110 transition-transform backdrop-blur-sm">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-center text-sm md:text-base group-hover:scale-105 transition-transform">
                      {category.name}
                    </h3>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernCategoryNav;
