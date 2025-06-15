
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Tag, TrendingUp, X, Sparkles, Users, Star } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedCategoryCardProps {
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
    productCount?: number;
    rating?: number;
  };
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const EnhancedCategoryCard: React.FC<EnhancedCategoryCardProps> = ({
  category,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const IconComponent = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <Link
        to={category.link}
        className="block"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:rotate-1">
          {/* Trending pulse effect */}
          {category.trending && (
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-700 animate-pulse" />
          )}
          
          {/* Enhanced floating elements */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1 
              }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>
          
          {/* Image with enhanced overlay */}
          <div className="aspect-square relative overflow-hidden">
            <motion.img 
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.7 }}
              loading="lazy"
            />
            
            {/* Remove image icon */}
            <button className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 transform scale-0 group-hover:scale-100">
              <X className="w-3 h-3" />
            </button>
            
            {/* Dynamic multi-layer gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-60 transition-all duration-500`} />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-all duration-500" />
            
            {/* Enhanced badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {category.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className={`text-white text-xs font-bold px-3 py-1 shadow-lg backdrop-blur-sm ${
                    category.badge === 'Hot' ? 'bg-red-500/90 animate-pulse' :
                    category.badge === 'New' ? 'bg-green-500/90' :
                    category.badge === 'Sale' ? 'bg-orange-500/90 animate-bounce' :
                    'bg-blue-500/90'
                  }`}>
                    <Tag className="h-3 w-3 mr-1" />
                    {category.badge}
                  </Badge>
                </motion.div>
              )}
              
              {category.trending && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-1 bg-gradient-to-r from-orange-500/90 to-pink-500/90 rounded-full px-2 py-1 backdrop-blur-sm"
                >
                  <TrendingUp className="h-3 w-3 text-white" />
                  <span className="text-xs text-white font-medium">Trending</span>
                </motion.div>
              )}
            </div>
            
            {/* Stats overlay */}
            <div className="absolute bottom-16 left-4 right-4 flex justify-between text-white/90 text-xs">
              {category.productCount && (
                <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-1 backdrop-blur-sm">
                  <Users className="w-3 h-3" />
                  <span>{category.productCount}+</span>
                </div>
              )}
              {category.rating && (
                <div className="flex items-center gap-1 bg-black/20 rounded-full px-2 py-1 backdrop-blur-sm">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{category.rating}</span>
                </div>
              )}
            </div>
            
            {/* Content overlay with enhanced animations */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <motion.div 
                className="bg-white/20 rounded-full p-4 mb-3 backdrop-blur-sm border border-white/30"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <IconComponent className="h-8 w-8" />
              </motion.div>
              
              <motion.h3 
                className="font-bold text-center text-lg mb-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {category.name}
              </motion.h3>
              
              <motion.p 
                className="text-xs text-center opacity-90 group-hover:opacity-100 transition-opacity leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {category.description}
              </motion.p>
            </div>

            {/* Enhanced hover arrow with trail effect */}
            <motion.div 
              className="absolute bottom-4 right-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                x: isHovered ? 0 : 10 
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm border border-white/30">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced bottom accent with gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/10 group-hover:to-pink-400/10 transition-all duration-700" />
        </div>
      </Link>
    </motion.div>
  );
};

export default EnhancedCategoryCard;
