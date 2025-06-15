
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import SearchResults from '@/components/SearchResults';
import EnhancedAdvancedSearch from '@/components/search/EnhancedAdvancedSearch';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    if (query && products.length > 0) {
      setIsLoading(true);
      
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
        );
        
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [query, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mt-4" />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Search Header */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Intelligent Search
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search with voice, get intelligent suggestions, and find exactly what you're looking for
            </p>
            <div className="max-w-2xl mx-auto">
              <EnhancedAdvancedSearch showVoiceSearch={true} />
            </div>
          </div>

          {/* Search Stats */}
          {query && (
            <div className="text-center text-sm text-gray-500">
              {isLoading ? (
                'Searching...'
              ) : (
                `Found ${searchResults.length} results for "${query}"`
              )}
            </div>
          )}

          {/* Search Results */}
          <div className="w-full">
            <SearchResults 
              query={query} 
              results={searchResults} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
