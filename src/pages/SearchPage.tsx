
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import SearchResults from '@/components/SearchResults';
import AdvancedSearch from '@/components/AdvancedSearch';
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
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [query, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Search Products</h1>
            <AdvancedSearch />
          </div>

          {/* Search Results */}
          <SearchResults 
            query={query} 
            results={searchResults} 
            isLoading={isLoading} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
