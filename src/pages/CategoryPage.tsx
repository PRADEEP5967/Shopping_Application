
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import CategoryHeader from '@/components/category/CategoryHeader';
import SortDropdown from '@/components/category/SortDropdown';
import MobileFilterSheet from '@/components/category/MobileFilterSheet';
import DesktopSidebar from '@/components/category/DesktopSidebar';
import NoProductsFound from '@/components/category/NoProductsFound';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0); // <-- Added minRating state
  
  // Get proper category name from URL param
  const formattedCategoryName = categoryName
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
  
  useEffect(() => {
    // Get all products and filter by category
    const allProducts = getAllProducts();
    const categoryProducts = allProducts.filter(p => 
      p.category.toLowerCase() === formattedCategoryName.toLowerCase()
    );
    
    setProducts(categoryProducts);
    setFilteredProducts(categoryProducts);
  }, [categoryName, formattedCategoryName]);
  
  // Extract all brands for this category
  const brands = React.useMemo(() => {
    const allBrands = products.map(product => product.brand || 'Unknown');
    return Array.from(new Set(allBrands));
  }, [products]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand || 'Unknown')
      );
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(product => product.rating >= minRating);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sorting
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedBrands, priceRange, sortOption, minRating]);
  
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => {
      return prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand];
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const handleClearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Category Header */}
        <CategoryHeader categoryName={formattedCategoryName} />
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <SortDropdown 
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          
          <MobileFilterSheet
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            brands={brands}
            selectedBrands={selectedBrands}
            handleBrandToggle={handleBrandToggle}
            selectedRating={minRating} // <-- Added
            handleRatingChange={setMinRating} // <-- Added
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <DesktopSidebar
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            brands={brands}
            selectedBrands={selectedBrands}
            handleBrandToggle={handleBrandToggle}
            selectedRating={minRating} // <-- Added
            handleRatingChange={setMinRating} // <-- Added
          />
          
          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                <ProductGrid products={filteredProducts} />
              </>
            ) : (
              <NoProductsFound onClearFilters={handleClearFilters} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;

