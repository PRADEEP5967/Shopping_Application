
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryGrid from '@/components/category/CategoryGrid';
import { Badge } from '@/components/ui/badge';
import { Grid3X3 } from 'lucide-react';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Grid3X3 className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h1>
              <p className="text-xl mb-6 text-white/90">
                Discover our wide range of products organized by categories. 
                Find exactly what you're looking for.
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Grid3X3 className="h-4 w-4 mr-2" />
                10+ Categories
              </Badge>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <CategoryGrid />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
