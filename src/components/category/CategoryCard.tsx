
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Tag, TrendingUp, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: LucideIcon;
    image: string;
    link: string;
    badge?: string;
    color: string;
    trending?: boolean;
    description: string;
  };
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const IconComponent = category.icon;

  return (
    <Link
      key={category.id}
      to={category.link}
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
        {/* Trending pulse effect */}
        {category.trending && (
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
        )}
        
        {/* Image with enhanced overlay and remove icon */}
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          
          {/* Remove image icon */}
          <button className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <X className="w-3 h-3" />
          </button>
          
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
};

export default CategoryCard;
