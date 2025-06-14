
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryHeader from '@/components/category/CategoryHeader';
import DesktopSidebar from '@/components/category/DesktopSidebar';
import MobileFilterSheet from '@/components/category/MobileFilterSheet';
import SortDropdown from '@/components/category/SortDropdown';
import ProductGrid from '@/components/ProductGrid';
import NoProductsFound from '@/components/category/NoProductsFound';
import RatingFilter from '@/components/shared/RatingFilter';

const unslugify = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryProductsPage = () => {
  const { categoryName: categorySlug } = useParams<{ categoryName: string }>();
  const categoryName = categorySlug ? unslugify(categorySlug) : '';

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [minRating, setMinRating] = useState<number>(0);
  
  const categoryProducts = useMemo(() => {
    return getAllProducts().filter(p => p.category === categoryName);
  }, [categoryName]);

  const brands = useMemo(() => {
    const brandSet = new Set(categoryProducts.map(p => p.brand).filter(Boolean) as string[]);
    return Array.from(brandSet);
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    let products = [...categoryProducts];

    // Filter by price
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by brand
    if (selectedBrands.length > 0) {
      products = products.filter(p => p.brand && selectedBrands.includes(p.brand));
    }

    // Filter by rating
    if (minRating > 0) {
      products = products.filter(p => p.rating >= minRating);
    }

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Default sorting can be based on an ID or could be randomized
        break;
    }

    return products;
  }, [categoryProducts, priceRange, selectedBrands, sortOption, minRating]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSortOption('featured');
    setMinRating(0);
  };

  if (!categoryProducts.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Category not found: {categoryName}</h1>
            <p>Please check the URL or go back to the categories page.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <CartFlyout />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CategoryHeader categoryName={categoryName} />
        
        <div className="flex items-start gap-8">
          <DesktopSidebar 
            priceRange={priceRange}
            handlePriceChange={setPriceRange}
            brands={brands}
            selectedBrands={selectedBrands}
            handleBrandToggle={handleBrandToggle}
            selectedRating={minRating}
            handleRatingChange={setMinRating}
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <MobileFilterSheet 
                priceRange={priceRange}
                handlePriceChange={setPriceRange}
                brands={brands}
                selectedBrands={selectedBrands}
                handleBrandToggle={handleBrandToggle}
                selectedRating={minRating}
                handleRatingChange={setMinRating}
              />
              <p className="text-sm text-gray-600 hidden md:block">
                Showing {filteredProducts.length} of {categoryProducts.length} products
              </p>
              <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <NoProductsFound onClearFilters={clearFilters} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProductsPage;
