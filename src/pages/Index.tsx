import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import SEOHead, { generateOrganizationSchema } from '@/components/seo/SEOHead';
import FlipkartHomepage from '@/components/flipkart/FlipkartHomepage';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Pradeep Sahani Mart - Your Ultimate Shopping Destination"
        description="Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more with fast shipping and secure checkout."
        keywords="ecommerce, online shopping, electronics, fashion, deals, discounts"
        structuredData={generateOrganizationSchema()}
      />
      <Header />
      <CartFlyout />

      {/* Flipkart-Style Homepage */}
      <FlipkartHomepage />

      <Footer />
    </div>
  );
};

export default Index;
