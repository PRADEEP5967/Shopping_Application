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
import ModernProductGrid from "@/components/ModernProductGrid";
import NoProductsFound from '@/components/category/NoProductsFound';
import RatingFilter from '@/components/shared/RatingFilter';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

// Enhanced unslugify with acronym/edge-case handling
const slugToCategoryMap: Record<string, string> = {
  tv: 'TV',
  headphones: 'Electronics',
  smartphone: 'Electronics',
  monitor: 'Computers',
  shirt: 'Clothing', // Map "shirt" slug to "Clothing" category
  // Add other mappings as needed
};

const unslugify = (slug: string) => {
  if (!slug) return '';
  const base = slug.toLowerCase();
  if (slugToCategoryMap[base]) return slugToCategoryMap[base];
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const normalize = (str: string) => str.toLowerCase();

const CategoryProductsPage = () => {
  const { categoryName: categorySlug } = useParams<{ categoryName: string }>();
  const categoryName = categorySlug ? unslugify(categorySlug) : '';

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [minRating, setMinRating] = useState<number>(0);
  
  // Find the "real" category name from products (case-insensitive)
  const allProducts = getAllProducts();
  const allCategories = Array.from(new Set(allProducts.map(p => p.category)));

  // Try to match by case-insensitive
  const matchedCategory = allCategories.find(
    (cat) => normalize(cat) === normalize(categoryName)
  );

  const realCategoryName = matchedCategory || categoryName;

  // Only use products whose category matches the case-insensitive (realCategoryName)
  const categoryProducts = useMemo(() => {
    return getAllProducts().filter(
      p => normalize(p.category) === normalize(realCategoryName)
    );
  }, [realCategoryName]);

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

  // If realCategoryName doesn't actually exist, show not found
  if (!matchedCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Category not found: {categorySlug && categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}</h1>
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
        <CategoryHeader categoryName={realCategoryName} />
        
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
              <ModernProductGrid products={filteredProducts} />
            ) : (
              <NoProductsFound onClearFilters={clearFilters} />
            )}

            {/* Related Categories Grid */}
            <RelatedCategoriesGrid currentCategorySlug={categorySlug || ""} />

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryProductsPage;
