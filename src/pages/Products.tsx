
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ModernProductGrid from '@/components/ModernProductGrid';
import ModernCategoryFilters from '@/components/category/ModernCategoryFilters';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => 
        product.rating && product.rating >= selectedRating
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedBrands, sortBy, selectedRating]);

  const handlePriceRangeChange = (range: number[]) => {
    setPriceRange(range);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSortBy('featured');
    setSelectedRating(0);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (selectedBrands.length > 0) count++;
    if (selectedRating > 0) count++;
    return count;
  };

  const getUniqueBrands = () => {
    const brands = products
      .map(product => product.brand)
      .filter(Boolean) as string[];
    return [...new Set(brands)].sort();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Package className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
              <p className="text-xl mb-6 text-white/90">
                Discover our complete collection of premium products across all categories.
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Package className="h-4 w-4 mr-2" />
                {products.length} Products
              </Badge>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <ModernCategoryFilters
                priceRange={priceRange}
                onPriceChange={handlePriceRangeChange}
                brands={getUniqueBrands()}
                selectedBrands={selectedBrands}
                onBrandToggle={handleBrandToggle}
                selectedRating={selectedRating}
                onRatingChange={handleRatingChange}
                activeFiltersCount={getActiveFiltersCount()}
                onClearFilters={clearFilters}
              />
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
              {filteredProducts.length > 0 ? (
                <ModernProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to see more results.
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
