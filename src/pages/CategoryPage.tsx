
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, ArrowDownUp, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
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
  }, [products, selectedBrands, priceRange, sortOption]);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-lg p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src={`https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop`}
              alt={formattedCategoryName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{formattedCategoryName}</h1>
            <p className="mt-2 text-gray-700 max-w-2xl">
              Explore our selection of premium {formattedCategoryName.toLowerCase()} products. 
              From top brands to exclusive deals, find exactly what you're looking for.
            </p>
          </div>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  {sortOption === 'featured' && 'Featured'}
                  {sortOption === 'price-asc' && 'Price: Low to High'}
                  {sortOption === 'price-desc' && 'Price: High to Low'}
                  {sortOption === 'rating' && 'Highest Rated'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Narrow down products by applying filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Mobile Filter UI */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <label 
                          htmlFor={`mobile-brand-${brand}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                      />
                      <label 
                        htmlFor={`brand-${brand}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-2xl font-semibold mb-2">No products found</p>
                <p className="text-gray-600 mb-6">
                  Try changing your filters to find products
                </p>
                <Button onClick={() => {
                  setSelectedBrands([]);
                  setPriceRange([0, 1000]);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
