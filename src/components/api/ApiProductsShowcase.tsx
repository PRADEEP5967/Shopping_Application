
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Store, Package, Coffee, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApiProducts, useFakeStoreProducts, useDummyJsonProducts, useProductSearch } from '@/hooks/useApiProducts';
import ModernProductGrid from '@/components/ModernProductGrid';

const ApiProductsShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { products: allProducts, isLoading: allLoading, error: allError, refetch: refetchAll } = useApiProducts();
  const { products: fakeStoreProducts, isLoading: fakeStoreLoading, error: fakeStoreError } = useFakeStoreProducts();
  const { products: dummyJsonProducts, total: dummyJsonTotal, isLoading: dummyJsonLoading, error: dummyJsonError } = useDummyJsonProducts(20);
  const { products: searchResults, isLoading: searchLoading, error: searchError } = useProductSearch(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useProductSearch hook
  };

  const handleRefresh = () => {
    refetchAll();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Live E-commerce API Integration</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real product data from multiple e-commerce APIs including Fake Store API, DummyJSON, and Open Food Facts
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={searchLoading}>
            {searchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </form>
      </div>

      {/* Error Alerts */}
      {(allError || fakeStoreError || dummyJsonError || searchError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Some APIs are experiencing issues. Displaying available data.
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="ml-2"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* API Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allProducts.length}</div>
            <p className="text-xs text-muted-foreground">From all APIs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FakeStore Products</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fakeStoreProducts.length}</div>
            <p className="text-xs text-muted-foreground">Electronics, Clothing, etc.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DummyJSON Products</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyJsonProducts.length}</div>
            <p className="text-xs text-muted-foreground">Out of {dummyJsonTotal} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Search Results for "{searchQuery}"</h3>
            <Badge variant="secondary">{searchResults.length} products</Badge>
          </div>
          {searchLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : searchResults.length > 0 ? (
            <ModernProductGrid products={searchResults} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {/* Products by API Source */}
      {!searchQuery && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="fakestore">FakeStore API</TabsTrigger>
            <TabsTrigger value="dummyjson">DummyJSON API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">All Products from APIs</h3>
              <Button 
                onClick={handleRefresh} 
                variant="outline"
                disabled={allLoading}
              >
                {allLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Refresh
              </Button>
            </div>
            {allLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : allProducts.length > 0 ? (
              <ModernProductGrid products={allProducts} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No products available. Please try refreshing.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="fakestore" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">FakeStore API Products</h3>
              <Badge variant="outline">Electronics, Jewelry, Clothing</Badge>
            </div>
            {fakeStoreLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : fakeStoreProducts.length > 0 ? (
              <ModernProductGrid products={fakeStoreProducts} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No FakeStore products available.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="dummyjson" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">DummyJSON API Products</h3>
              <Badge variant="outline">Showing {dummyJsonProducts.length} of {dummyJsonTotal}</Badge>
            </div>
            {dummyJsonLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : dummyJsonProducts.length > 0 ? (
              <ModernProductGrid products={dummyJsonProducts} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No DummyJSON products available.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ApiProductsShowcase;
