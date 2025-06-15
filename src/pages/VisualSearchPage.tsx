
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VisualSearch from '@/components/search/VisualSearch';
import { Product } from '@/types';

const VisualSearchPage = () => {
  const handleSearchResults = (products: Product[]) => {
    console.log('Visual search results:', products);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Visual Search
            </h1>
            <p className="text-xl text-gray-600">
              Upload an image to find similar products instantly
            </p>
          </div>

          <VisualSearch onResult={handleSearchResults} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VisualSearchPage;
