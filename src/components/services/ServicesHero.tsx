
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const ServicesHero: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 text-center relative">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
          Professional Services
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
          Transform Your Business
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
          Comprehensive solutions designed to accelerate your growth and maximize your potential in the digital landscape.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button size="lg" className="bg-primary hover:bg-primary/90 group">
            Get Started 
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="group">
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
