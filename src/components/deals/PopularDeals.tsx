
import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PopularDealsProps {
  products: Product[];
}

const PopularDeals: React.FC<PopularDealsProps> = ({ products }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Percent className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-2xl md:text-3xl font-bold">Popular Deals</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.salePercentage}%
              </span>
            </div>
            <ProductCard product={product} />
            {product.originalPrice && (
              <div className="mt-2 flex items-center gap-2">
                <span className="line-through text-gray-400">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="text-green-600 font-semibold">
                  {formatCurrency(product.price)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link to="/products">
          <Button variant="outline" className="flex items-center gap-2">
            View All Deals
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PopularDeals;
