
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const SmallBusinessCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of successful small businesses that have already made the switch. 
          Get started today with our comprehensive business solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 group">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Schedule Demo
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm opacity-80">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>Call us: 1-800-BUSINESS</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>Email: hello@business.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallBusinessCTA;
