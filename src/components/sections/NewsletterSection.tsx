
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Exclusive Offers</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Stay in the Loop
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-fade-in">
            Subscribe to our newsletter for exclusive deals, early access to new products, and personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 border-0 focus:ring-4 focus:ring-white/30 transition-all"
            />
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm mt-6 text-white/80">
            Join 50,000+ shoppers who save with our exclusive deals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
