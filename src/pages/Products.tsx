import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import RatingFilter from '@/components/shared/RatingFilter';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('category') || []);
  const [sortOrder, setSortOrder] = useState(searchParams.get('sort') || 'featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(Number(searchParams.get('rating')) || 0);
  const [filterCount, setFilterCount] = useState(0);
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Get all available categories from products
  const categories = useMemo(() => {
    const allCategories = products.map(product => product.category);
    return Array.from(new Set(allCategories));
  }, [products]);
  
  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = getAllProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    };
    
    loadProducts();
  }, []);
  
  // Update URL search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('q', searchQuery);
    if (sortOrder !== 'featured') params.set('sort', sortOrder);
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(cat => params.append('category', cat));
    }
    if (minRating > 0) params.set('rating', String(minRating));
    
    setSearchParams(params, { replace: true });
    
    // Count active filters for badge
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (minRating > 0) count++;
    setFilterCount(count);
    
  }, [searchQuery, selectedCategories, sortOrder, priceRange, minRating, setSearchParams]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }
    
    // Apply sorting
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // For now, just randomize as we don't have a date field
        result.sort(() => Math.random() - 0.5);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sorting, use default
        break;
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategories, sortOrder, priceRange, minRating]);
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortOrder('featured');
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSearchParams({});
  };
  
  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <label 
                htmlFor={`category-${category}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="flex items-center space-x-2">
          <Input 
            type="number" 
            min={0}
            value={priceRange[0]}
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-24"
          />
          <span>to</span>
          <Input 
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-24"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <RatingFilter selectedRating={minRating} onRatingChange={setMinRating} />
      </div>
      
      {filterCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="mt-4 w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[200px] md:w-[300px]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <SlidersHorizontal className="h-4 w-4" />
                    {filterCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                        {filterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down products by applying filters
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            ) : null}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {!isMobile && (
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <FilterPanel />
              </div>
            </div>
          )}
          
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  Showing {filteredProducts.length} products
                  {filterCount > 0 ? ' based on your filters' : ''}
                </p>
                <ProductGrid products={filteredProducts} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-2xl font-semibold mb-2">No products found</p>
                <p className="text-gray-600 mb-6">
                  Try changing your search or filter criteria
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
