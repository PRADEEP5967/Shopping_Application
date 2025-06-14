import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone,
  Watch,
  Monitor,
  Home as HomeIcon,
  Camera,
  Sofa,
  Gamepad,
  Sparkles,
  Tag,
  Package,
  ShoppingBag
} from 'lucide-react';
import { getProductCategories } from '@/data/products';

const categoryDetails: Record<string, any> = {
  'Electronics': {
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    badge: 'Hot',
    color: 'from-blue-500 to-cyan-500'
  },
  'Wearables': {
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1536304993881-53d3c6d83f07?auto=format&fit=crop&w=400&q=80',
    badge: 'New',
    color: 'from-pink-500 to-purple-500'
  },
  'Computers': {
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    color: 'from-orange-500 to-red-500'
  },
  'Smart Home': {
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    color: 'from-green-500 to-teal-500'
  },
  'Photography': {
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
    color: 'from-amber-500 to-orange-500'
  },
  'Furniture': {
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    badge: 'Sale',
    color: 'from-violet-500 to-purple-500'
  },
  'Gaming': {
    icon: Gamepad,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    color: 'from-rose-500 to-pink-500'
  },
  'Accessories': {
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop',
    badge: 'New',
    color: 'from-yellow-500 to-orange-400',
  },
  'default': {
    icon: Package,
    image: 'https://images.unsplash.com/photo-1611095564984-729c8d48a2bc?auto=format&fit=crop&w=400&q=80',
    color: 'from-gray-500 to-gray-600'
  }
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const ModernCategoryNav = () => {
  const categoryNames = getProductCategories();
  const categories = categoryNames.map(name => {
    const details = categoryDetails[name] || categoryDetails.default;
    return {
      id: name,
      name,
      icon: details.icon,
      image: details.image,
      link: `/category/${slugify(name)}`,
      badge: details.badge,
      color: details.color
    };
  });

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-6">
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
                    loading="lazy"
                    decoding="async"
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
