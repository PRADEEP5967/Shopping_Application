
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryHeader from '@/components/category/CategoryHeader';
import DesktopSidebar from '@/components/category/DesktopSidebar';
import ModernProductGrid from "@/components/ModernProductGrid";
import NoProductsFound from '@/components/category/NoProductsFound';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";
import CategoryFeatures from '@/components/category/CategoryFeatures';
import QuickFiltersBar from '@/components/category/QuickFiltersBar';
import ProductsHeader from '@/components/category/ProductsHeader';
import CategoryNotFound from '@/components/category/CategoryNotFound';

import { useCategoryProducts } from '@/hooks/useCategoryProducts';
import { useProductFilters } from '@/hooks/useProductFilters';
import { unslugify } from '@/utils/categoryUtils';

const CategoryProductsPage = () => {
  const { categoryName: categorySlug } = useParams<{ categoryName: string }>();
  const categoryName = categorySlug ? unslugify(categorySlug) : '';

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickFilters, setQuickFilters] = useState({
    inStock: false,
    onSale: false,
    highRated: false,
  });

  const { categoryProducts, brands, realCategoryName, matchedCategory } = useCategoryProducts(categoryName);

  const filteredProducts = useProductFilters({
    products: categoryProducts,
    priceRange,
    selectedBrands,
    minRating,
    quickFilters,
    sortOption
  });

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleQuickFilter = (filterType: keyof typeof quickFilters) => {
    setQuickFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSortOption('featured');
    setMinRating(0);
    setQuickFilters({
      inStock: false,
      onSale: false,
      highRated: false,
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (minRating > 0) count++;
    if (Object.values(quickFilters).some(Boolean)) count++;
    return count;
  }, [selectedBrands, priceRange, minRating, quickFilters]);

  // If realCategoryName doesn't actually exist, show not found
  if (!matchedCategory) {
    return <CategoryNotFound categorySlug={categorySlug || ""} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <CartFlyout />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CategoryHeader categoryName={realCategoryName} />
        
        {/* Category Features Section */}
        <CategoryFeatures categoryName={realCategoryName} />
        
        {/* Quick Filters Bar */}
        <QuickFiltersBar
          quickFilters={quickFilters}
          handleQuickFilter={handleQuickFilter}
          activeFiltersCount={activeFiltersCount}
          clearFilters={clearFilters}
        />
        
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
            <ProductsHeader
              filteredProductsCount={filteredProducts.length}
              totalProductsCount={categoryProducts.length}
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              priceRange={priceRange}
              handlePriceChange={setPriceRange}
              brands={brands}
              selectedBrands={selectedBrands}
              handleBrandToggle={handleBrandToggle}
              selectedRating={minRating}
              handleRatingChange={setMinRating}
            />

            {filteredProducts.length > 0 ? (
              <ModernProductGrid products={filteredProducts} viewMode={viewMode} />
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
