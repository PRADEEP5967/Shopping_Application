
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid3X3, ArrowRight, Sparkles, Star, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryHero = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced badge */}
          <Badge className="mb-8 glass-effect border-primary/30 shadow-glow px-6 py-2 text-base animate-fade-in">
            <Grid3X3 className="w-4 h-4 mr-2" />
            All Categories
            <Sparkles className="w-4 h-4 ml-2 text-accent" />
          </Badge>
          
          {/* Enhanced title with gradient */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in leading-tight">
            Shop by Category
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Discover our complete range of premium products across different categories. 
            Find exactly what you're looking for with ease and confidence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto animate-fade-in">
            <div className="text-center glass-effect rounded-2xl p-6 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-3 shadow-glow">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">50+</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="text-center glass-effect rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-3 shadow-glow">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">4.8★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center glass-effect rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-3 shadow-glow">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">1000+</div>
              <div className="text-muted-foreground">Products</div>
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" variant="glow" className="px-8 py-3 group">
              <Link to="/products" className="flex items-center">
                <span>Browse All Products</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-effect border-primary/30 hover:bg-primary/10 px-8 py-3">
              <Link to="/special-offers">
                View Special Offers
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-32 left-1/4 animate-bounce">
        <div className="w-3 h-3 bg-primary rounded-full opacity-60 shadow-glow" />
      </div>
      <div className="absolute top-40 right-1/3 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-secondary rounded-full opacity-60 shadow-glow" />
      </div>
      <div className="absolute bottom-32 left-1/3 animate-bounce" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-accent rounded-full opacity-60 shadow-glow" />
      </div>
    </section>
  );
};

export default CategoryHero;
