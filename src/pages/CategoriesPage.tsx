
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Badge } from '@/components/ui/badge';
import { 
  Grid3X3, 
  Sparkles, 
  Zap, 
} from 'lucide-react';
import CategoryGrid from '@/components/category/CategoryGrid';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
                <Grid3X3 className="w-3 h-3 mr-1" />
                All Categories
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
                Shop by Category
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Discover our complete range of products across different categories. Find exactly what you're looking for with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <CategoryGrid />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Why Shop by Category?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Browse our organized categories to find products that match your specific needs and preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid3X3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Organized Shopping</h3>
                <p className="text-gray-600">Find products easily with our well-organized category structure.</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Discovery</h3>
                <p className="text-gray-600">Discover new products and brands within your favorite categories.</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-gray-600">Every category features hand-picked, high-quality products.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
