
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title,
  subtitle 
}) => {
  // Handle empty products array
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <div className="my-8">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>}
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      {hasProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No products available at this time.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
