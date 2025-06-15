
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import SmallBusinessHero from '@/components/smallbusiness/SmallBusinessHero';
import SmallBusinessFeatures from '@/components/smallbusiness/SmallBusinessFeatures';
import SmallBusinessCategories from '@/components/smallbusiness/SmallBusinessCategories';
import SmallBusinessTestimonials from '@/components/smallbusiness/SmallBusinessTestimonials';
import SmallBusinessCTA from '@/components/smallbusiness/SmallBusinessCTA';

const SmallBusinessPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <SmallBusinessHero />
        <SmallBusinessFeatures />
        <SmallBusinessCategories />
        <SmallBusinessTestimonials />
        <SmallBusinessCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default SmallBusinessPage;
