
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X, Star, Check, Minus, TrendingUp } from 'lucide-react';
import ProductComparison from '@/components/features/ProductComparison';
import { Product } from '@/types';

const ProductComparisonPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Mock products for comparison - in a real app, this would come from your products API
  const availableProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 999,
      originalPrice: 1099,
      rating: 4.8,
      images: ['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400'],
      category: 'Smartphones',
      brand: 'Apple',
      inStock: true,
      features: ['A17 Pro Chip', 'Pro Camera System', 'Titanium Design', '5G Ready'],
      description: 'The most advanced iPhone yet'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      price: 1199,
      originalPrice: 1299,
      rating: 4.7,
      images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400'],
      category: 'Smartphones',
      brand: 'Samsung',
      inStock: true,
      features: ['Snapdragon 8 Gen 3', '200MP Camera', 'S Pen Included', '5G Ready'],
      description: 'Ultimate productivity smartphone'
    },
    {
      id: '3',
      name: 'Google Pixel 8 Pro',
      price: 899,
      originalPrice: 999,
      rating: 4.6,
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400'],
      category: 'Smartphones',
      brand: 'Google',
      inStock: true,
      features: ['Tensor G3', 'Magic Eraser', 'Pure Android', 'AI Photography'],
      description: 'AI-powered photography smartphone'
    },
    {
      id: '4',
      name: 'MacBook Pro 14"',
      price: 1999,
      originalPrice: 2199,
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400'],
      category: 'Laptops',
      brand: 'Apple',
      inStock: true,
      features: ['M3 Pro Chip', 'Liquid Retina XDR', 'Up to 18h Battery', 'Studio Quality Mics'],
      description: 'Professional laptop for creators'
    },
    {
      id: '5',
      name: 'Dell XPS 13 Plus',
      price: 1299,
      originalPrice: 1499,
      rating: 4.5,
      images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=400'],
      category: 'Laptops',
      brand: 'Dell',
      inStock: true,
      features: ['Intel Core i7', '13.4" OLED Display', 'Premium Materials', 'Fast Charging'],
      description: 'Ultra-portable premium laptop'
    },
    {
      id: '6',
      name: 'Sony WH-1000XM5',
      price: 399,
      originalPrice: 449,
      rating: 4.8,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400'],
      category: 'Headphones',
      brand: 'Sony',
      inStock: true,
      features: ['Industry-leading NC', '30h Battery Life', 'Quick Charge', 'Multipoint Connection'],
      description: 'Premium noise-canceling headphones'
    }
  ];

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProductToComparison = (product: Product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProductFromComparison = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const popularComparisons = [
    { title: 'iPhone 15 Pro vs Samsung Galaxy S24 Ultra', products: ['1', '2'] },
    { title: 'MacBook Pro vs Dell XPS 13', products: ['4', '5'] },
    { title: 'Best Noise-Canceling Headphones', products: ['6'] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4">
              <TrendingUp className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Product Comparison
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Compare products side-by-side to make informed purchasing decisions. Add up to 4 products to compare their features, prices, and specifications.
          </p>
        </div>
      </section>

      <div className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Comparison Table */}
          {selectedProducts.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Comparing {selectedProducts.length} Product{selectedProducts.length > 1 ? 's' : ''}</h2>
                <Button variant="outline" onClick={clearComparison}>
                  Clear All
                </Button>
              </div>
              <ProductComparison
                products={selectedProducts}
                onRemoveProduct={removeProductFromComparison}
                onClose={clearComparison}
              />
            </div>
          )}

          {/* Popular Comparisons */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Popular Comparisons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularComparisons.map((comparison, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{comparison.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">See how these products stack up against each other</p>
                    <Button size="sm" className="w-full">
                      View Comparison
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Product Search and Selection */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Products to Compare</h2>
              <Badge variant="secondary">
                {selectedProducts.length}/4 selected
              </Badge>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products to compare..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isSelected = selectedProducts.find(p => p.id === product.id);
                const canAdd = selectedProducts.length < 4;

                return (
                  <Card key={product.id} className={`group hover:shadow-lg transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                    <div className="relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-white">
                            <Check className="w-3 h-3 mr-1" />
                            Selected
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{product.name}</h3>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          {product.rating}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-primary">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features?.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        variant={isSelected ? "secondary" : "default"}
                        onClick={() => {
                          if (isSelected) {
                            removeProductFromComparison(product.id);
                          } else if (canAdd) {
                            addProductToComparison(product);
                          }
                        }}
                        disabled={!isSelected && !canAdd}
                      >
                        {isSelected ? (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            Remove
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 mr-1" />
                            {canAdd ? 'Add to Compare' : 'Max 4 products'}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductComparisonPage;
