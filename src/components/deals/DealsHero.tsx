
import React from 'react';

const DealsHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
          Limited Time Offers
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Deals & Discounts</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Incredible savings on top products. Don't miss these limited-time offers!
        </p>
      </div>
    </div>
  );
};

export default DealsHero;
