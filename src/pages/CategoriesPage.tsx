import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryGrid from '@/components/category/CategoryGrid';
import CategoryHero from '@/components/category/CategoryHero';
import CategoryFeatures from '@/components/category/CategoryFeatures';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mt-4" />
      <CartFlyout />
      
      <main className="flex-grow">
        <CategoryHero />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <CategoryGrid />
          </div>
        </section>

        <CategoryFeatures />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
