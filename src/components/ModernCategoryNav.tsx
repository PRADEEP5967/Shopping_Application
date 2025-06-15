
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  ShoppingBag,
  ArrowRight,
  Grid3X3,
  TrendingUp
} from 'lucide-react';
import { getProductCategories } from '@/data/products';

const categoryDetails: Record<string, any> = {
  'Electronics': {
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    badge: 'Hot',
    color: 'from-blue-500 to-cyan-500',
    trending: true,
    description: 'Latest gadgets & tech'
  },
  'Wearables': {
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1536304993881-53d3c6d83f07?auto=format&fit=crop&w=400&q=80',
    badge: 'New',
    color: 'from-pink-500 to-purple-500',
    description: 'Smart watches & fitness'
  },
  'Computers': {
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    color: 'from-orange-500 to-red-500',
    description: 'Laptops & accessories'
  },
  'Smart Home': {
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    color: 'from-green-500 to-teal-500',
    trending: true,
    description: 'Automate your home'
  },
  'Photography': {
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
    color: 'from-amber-500 to-orange-500',
    description: 'Cameras & photo gear'
  },
  'Furniture': {
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    badge: 'Sale',
    color: 'from-violet-500 to-purple-500',
    description: 'Stylish home furniture'
  },
  'Gaming': {
    icon: Gamepad,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    color: 'from-rose-500 to-pink-500',
    trending: true,
    description: 'Gaming consoles & gear'
  },
  'Accessories': {
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop',
    badge: 'New',
    color: 'from-yellow-500 to-orange-400',
    description: 'Fashion & tech accessories'
  },
  'default': {
    icon: Package,
    image: 'https://images.unsplash.com/photo-1611095564984-729c8d48a2bc?auto=format&fit=crop&w=400&q=80',
    color: 'from-gray-500 to-gray-600',
    description: 'Browse our collection'
  }
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const ModernCategoryNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      color: details.color,
      trending: details.trending,
      description: details.description
    };
  });

  return (
    <div className="bg-white py-12 border-t border-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Grid3X3 className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Discover amazing products across all categories with exclusive deals and premium quality
          </p>
          
          {/* Trending indicator */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">
              {categories.filter(c => c.trending).length} Trending Categories This Week
            </span>
          </div>
        </div>

        {/* Enhanced Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <Link
                key={category.id}
                to={category.link}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                  {/* Trending pulse effect */}
                  {category.trending && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
                  )}
                  
                  {/* Image with enhanced overlay */}
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Dynamic gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-70 transition-all duration-500`} />
                    
                    {/* Enhanced badge */}
                    {category.badge && (
                      <div className="absolute top-3 right-3">
                        <Badge className={`text-white text-xs font-bold px-3 py-1 shadow-lg ${
                          category.badge === 'Hot' ? 'bg-red-500 animate-pulse' :
                          category.badge === 'New' ? 'bg-green-500' :
                          category.badge === 'Sale' ? 'bg-orange-500 animate-bounce' :
                          'bg-blue-500'
                        }`}>
                          <Tag className="h-3 w-3 mr-1" />
                          {category.badge}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Trending indicator */}
                    {category.trending && (
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center space-x-1 bg-orange-500/90 rounded-full px-2 py-1">
                          <TrendingUp className="h-3 w-3 text-white" />
                          <span className="text-xs text-white font-medium">Trending</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                      <div className="bg-white/20 rounded-full p-4 mb-3 group-hover:scale-125 transition-all duration-500 backdrop-blur-sm border border-white/30">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-center text-lg mb-1 group-hover:scale-110 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-xs text-center opacity-90 group-hover:opacity-100 transition-opacity">
                        {category.description}
                      </p>
                    </div>

                    {/* Hover arrow */}
                    <div className={`absolute bottom-4 right-4 transform transition-all duration-300 ${
                      isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                    }`}>
                      <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Link to="/categories" className="flex items-center">
              <span>View All Categories</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernCategoryNav;
