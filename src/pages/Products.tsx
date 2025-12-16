import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import EnhancedProductGrid from '@/components/product/EnhancedProductGrid';
import AdvancedProductFilters from '@/components/product/AdvancedProductFilters';
import SEOHead from '@/components/seo/SEOHead';
import { ProductGridSkeleton } from '@/components/ui/product-skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useApiProducts, useApiCategories } from '@/hooks/useApiProducts';
import { Product } from '@/types';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, LayoutGrid, List, Loader2, RefreshCw } from 'lucide-react';

interface FilterState {
  searchQuery: string;
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  onSale: boolean;
  sortBy: string;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams.get('q') || '',
    categories: searchParams.getAll('category') || [],
    brands: [],
    priceRange: [0, 1000],
    rating: Number(searchParams.get('rating')) || 0,
    inStock: false,
    onSale: false,
    sortBy: searchParams.get('sort') || 'featured',
  });
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Use real API data instead of mock data
  const { products: apiProducts, isLoading: productsLoading, error: productsError, refetch } = useApiProducts();
  const { categories: apiCategories, isLoading: categoriesLoading } = useApiCategories();
  
  // Get available brands from API products
  const availableBrands = useMemo(() => {
    return Array.from(new Set(apiProducts.map(p => p.brand).filter(Boolean))) as string[];
  }, [apiProducts]);
  
  // Apply filters and sorting to API products
  const filteredProducts = useMemo(() => {
    let result = [...apiProducts];
    
    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => 
        product.brand && filters.brands.includes(product.brand)
      );
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }
    
    // Apply stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }
    
    // Apply sale filter
    if (filters.onSale) {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
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
        result.sort(() => Math.random() - 0.5);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return result;
  }, [apiProducts, filters]);
  
  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.rating > 0) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    return count;
  }, [filters]);

  // Update URL search params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
    if (filters.categories.length > 0) {
      filters.categories.forEach(cat => params.append('category', cat));
    }
    if (filters.rating > 0) params.set('rating', String(filters.rating));
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
  
  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
      onSale: false,
      sortBy: 'featured',
    });
    setSearchParams({});
  };

  // Show loading state
  if (productsLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEOHead title="Products" description="Browse our collection of products from real e-commerce APIs." />
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Loading Products...</h1>
          <ProductGridSkeleton count={8} />
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (productsError) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEOHead title="Products - Error" description="Error loading products." />
        <Header />
        <CartFlyout />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-destructive">Error loading products. Please try again.</p>
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Products - Browse All Categories" 
        description={`Browse ${filteredProducts.length} products from real e-commerce APIs. Filter by category, price, and more.`}
        keywords="products, shopping, electronics, fashion, deals"
      />
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8" role="main">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Live API Products</h1>
            <p className="text-muted-foreground mt-1">
              Showing {filteredProducts.length} products from real e-commerce APIs
              {activeFiltersCount > 0 && ` with ${activeFiltersCount} filters applied`}
            </p>
            <div className="flex items-center gap-2 mt-2" role="list" aria-label="Data sources">
              <Badge variant="secondary">FakeStore API</Badge>
              <Badge variant="secondary">DummyJSON API</Badge>
              <Badge variant="secondary">Open Food Facts</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              size="sm"
              disabled={productsLoading}
            >
              {productsLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Refresh
            </Button>
            
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Filter Button */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Filter products from live APIs
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <AdvancedProductFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      availableCategories={apiCategories}
                      availableBrands={availableBrands}
                      activeFiltersCount={activeFiltersCount}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-8">
                <AdvancedProductFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableCategories={apiCategories}
                  availableBrands={availableBrands}
                  activeFiltersCount={activeFiltersCount}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-grow">
            <EnhancedProductGrid 
              products={filteredProducts} 
              viewMode={viewMode}
              itemsPerPage={20}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
