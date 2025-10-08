
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryHero from '@/components/category/CategoryHero';
import CategoryGrid from '@/components/category/CategoryGrid';
import CategoryFeatures from '@/components/category/CategoryFeatures';
import TrustedBySection from '@/components/category/TrustedBySection';
import CustomerTrustSection from '@/components/category/CustomerTrustSection';
import CustomerStoriesSection from '@/components/category/CustomerStoriesSection';
import IndustryLeadersSection from '@/components/category/IndustryLeadersSection';
import CustomerServiceSection from '@/components/category/CustomerServiceSection';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <CategoryHero />
      
      <TrustedBySection />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* General category features */}
          <CategoryFeatures categoryName="All Categories" />
          
          <CategoryGrid />
        </div>
        
        <CustomerTrustSection />
        
        <CustomerStoriesSection />
        
        <IndustryLeadersSection />
        
        <CustomerServiceSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
