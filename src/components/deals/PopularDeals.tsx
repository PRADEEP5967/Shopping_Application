
import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModernProductCard from '@/components/ModernProductCard';
import { Product } from '@/types';

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
          <ModernProductCard key={product.id} product={product} />
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
