
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ApiProductsShowcase from '@/components/api/ApiProductsShowcase';

const ApiShowcase = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <ApiProductsShowcase />
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiShowcase;
