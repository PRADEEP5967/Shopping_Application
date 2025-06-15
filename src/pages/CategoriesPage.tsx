
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryHero from '@/components/category/CategoryHero';
import CategoryGrid from '@/components/category/CategoryGrid';
import CategoryFeatures from '@/components/category/CategoryFeatures';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <CartFlyout />
      
      <CategoryHero />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* General category features */}
        <CategoryFeatures categoryName="All Categories" />
        
        <CategoryGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
