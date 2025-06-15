
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import PersonalizedOffers from '@/components/marketing/PersonalizedOffers';
import NewsletterSignup from '@/components/marketing/NewsletterSignup';

const PersonalizedOffersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Personal Offers
            </h1>
            <p className="text-xl text-gray-600">
              Exclusive deals tailored just for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PersonalizedOffers />
            </div>
            <div>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PersonalizedOffersPage;
