
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
import CategoryFeatures from '@/components/category/CategoryFeatures';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, LayoutGrid, List, Filter, X } from 'lucide-react';

// Enhanced unslugify with acronym/edge-case handling
const slugToCategoryMap: Record<string, string> = {
  tv: 'TV',
  headphones: 'Electronics',
  smartphone: 'Electronics',
  monitor: 'Computers',
  shirt: 'Clothing',
  dress: 'Clothing',
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickFilters, setQuickFilters] = useState({
    inStock: false,
    onSale: false,
    highRated: false,
  });
  
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

    // Apply quick filters
    if (quickFilters.inStock) {
      products = products.filter(p => p.inStock);
    }
    if (quickFilters.onSale) {
      products = products.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    if (quickFilters.highRated) {
      products = products.filter(p => p.rating >= 4);
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
  }, [categoryProducts, priceRange, selectedBrands, sortOption, minRating, quickFilters]);

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
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Category not found: {categorySlug && categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}</h1>
            <p>Please check the URL or go back to the categories page.</p>
            {/* Show related categories to help user discover other pages */}
            <div className="mt-12">
              <RelatedCategoriesGrid currentCategorySlug={categorySlug || ""} />
            </div>
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
        
        {/* Category Features Section */}
        <CategoryFeatures categoryName={realCategoryName} />
        
        {/* Quick Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm">
          <span className="text-sm font-medium text-gray-700 mr-2">Quick Filters:</span>
          <Button
            variant={quickFilters.inStock ? "default" : "outline"}
            size="sm"
            onClick={() => handleQuickFilter('inStock')}
            className="text-xs"
          >
            In Stock
          </Button>
          <Button
            variant={quickFilters.onSale ? "default" : "outline"}
            size="sm"
            onClick={() => handleQuickFilter('onSale')}
            className="text-xs"
          >
            On Sale
          </Button>
          <Button
            variant={quickFilters.highRated ? "default" : "outline"}
            size="sm"
            onClick={() => handleQuickFilter('highRated')}
            className="text-xs"
          >
            4+ Stars
          </Button>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount} active
            </Badge>
          )}
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              <X className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
        
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
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
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
              </div>
              
              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-2"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-2"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
              </div>
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
