
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Sparkles, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface FlashSaleProps {
  products: Product[];
  timeRemaining: {
    hours: string;
    minutes: string;
    seconds: string;
  };
}

const FlashSale: React.FC<FlashSaleProps> = ({ products, timeRemaining }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold">Flash Sale</h2>
          </div>
          <p className="text-gray-600 mt-1">Up to 40% off - Today Only</p>
        </div>
        
        <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
          <Clock className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium">Ends in:</span>
          <div className="flex items-center space-x-1">
            <div className="bg-gray-800 text-white px-2 py-1 rounded">{timeRemaining.hours}</div>
            <span>:</span>
            <div className="bg-gray-800 text-white px-2 py-1 rounded">{timeRemaining.minutes}</div>
            <span>:</span>
            <div className="bg-gray-800 text-white px-2 py-1 rounded">{timeRemaining.seconds}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.salePercentage}%
              </span>
            </div>
            <ProductCard product={product} />
            {product.originalPrice && (
              <div className="mt-2 flex items-center gap-2">
                <span className="line-through text-gray-400">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-red-500 font-semibold">
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

export default FlashSale;
