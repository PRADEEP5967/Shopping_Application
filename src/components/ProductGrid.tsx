
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title,
  subtitle,
  loading = false 
}) => {
  // Handle empty products array
  const hasProducts = Array.isArray(products) && products.length > 0;

  // Loading skeleton
  if (loading) {
    return (
      <div className="my-8">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>}
            {subtitle && <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      {(title || subtitle) && (
        <div className="text-center mb-12 animate-fade-in">
          {title && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}
      
      {hasProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We're working hard to bring you amazing products. Check back soon for updates!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
