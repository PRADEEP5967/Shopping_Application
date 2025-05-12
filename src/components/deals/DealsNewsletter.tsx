
import React from 'react';
import { Button } from '@/components/ui/button';

const DealsNewsletter: React.FC = () => {
  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get Exclusive Deals
          </h2>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter and be the first to know about our special offers and promotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DealsNewsletter;
