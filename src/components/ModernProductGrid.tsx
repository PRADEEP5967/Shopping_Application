
import React from "react";
import ModernProductCard from "./ModernProductCard";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ModernProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  className?: string;
}

const ModernProductGrid: React.FC<ModernProductGridProps> = ({ 
  products, 
  viewMode = 'grid',
  className 
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
        <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
          We're working hard to bring you amazing products. Check back soon for updates!
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className={cn("space-y-3 sm:space-y-4", className)}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4"
          >
            <div className="flex gap-3 sm:gap-4">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6",
      className
    )}>
      {products.map((product, idx) => (
        <ModernProductCard 
          key={product.id} 
          product={product} 
          className="animate-fade-in" 
        />
      ))}
    </div>
  );
};

export default ModernProductGrid;
