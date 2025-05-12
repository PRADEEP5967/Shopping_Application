
import React from 'react';
import { Button } from '@/components/ui/button';

const WeeklyDealBanner: React.FC = () => {
  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-xl">
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                Weekly Deal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Save Big on Premium Headphones
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Get up to 30% off on select models this week only.
                Premium sound quality for less.
              </p>
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Shop the Deal
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
                alt="Premium Headphones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyDealBanner;
