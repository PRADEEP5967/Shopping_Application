
import React from 'react';
import { Tag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ClearanceProps {
  products: Product[];
}

const Clearance: React.FC<ClearanceProps> = ({ products }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Tag className="h-6 w-6 text-red-500 mr-2" />
        <h2 className="text-2xl md:text-3xl font-bold">Clearance</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.salePercentage}%
              </span>
            </div>
            <ProductCard product={product} />
            {product.originalPrice && (
              <div className="mt-2 flex items-center gap-2">
                <span className="line-through text-gray-400">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-red-600 font-semibold">
                  {formatCurrency(product.price)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clearance;
