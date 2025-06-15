
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus, Check, Zap, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product, ProductVariant } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductVariantSelector from '@/components/product/ProductVariantSelector';
import ProductReviews from '@/components/product/ProductReviews';
import ModernProductCard from '@/components/ModernProductCard';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    if (!productId) return;

    const allProducts = getAllProducts();
    const foundProduct = allProducts.find((p) => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      // Set first variant as default if variants exist
      if (foundProduct.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0]);
      }

      // Find related products (same category, exclude current product)
      const related = allProducts.filter(
        (p) => p.category === foundProduct.category && p.id !== productId
      ).slice(0, 8);
      setRelatedProducts(related);
    } else {
      setProduct(null);
    }
  }, [productId]);

  const isProductInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  const currentPrice = selectedVariant ? selectedVariant.price : product?.price || 0;
  const originalPrice = product?.originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  const isInStock = selectedVariant ? selectedVariant.inStock : product?.inStock || false;

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedVariant || undefined);
      toast({
        title: "Added to cart",
        description: `${product.name} x${quantity} added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist.`,
      });
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p>The product you are looking for does not exist.</p>
            <Link to="/products" className="text-blue-500">
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
              <span className="mx-2">/</span>
              <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div>
                <ProductImageGallery images={product.images} productName={product.name} />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">${currentPrice}</span>
                  {originalPrice && originalPrice > currentPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">${originalPrice}</span>
                      <Badge className="bg-red-500">{discount}% OFF</Badge>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                    {isInStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <ProductVariantSelector
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onVariantSelect={setSelectedVariant}
                  />
                )}

                {/* Quantity */}
                <div>
                  <h3 className="font-semibold mb-2">Quantity</h3>
                  <div className="flex items-center border rounded-lg w-fit">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant={isProductInWishlist ? "default" : "outline"}
                    size="lg"
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={`h-5 w-5 ${isProductInWishlist ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-green-500" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <RotateCcw className="h-4 w-4 text-orange-500" />
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span>Quality Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    {product.features && product.features.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index} className="text-gray-700">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <ProductReviews productId={product.id} productName={product.name} />
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Category:</span>
                        <span className="ml-2">{product.category}</span>
                      </div>
                      {product.brand && (
                        <div>
                          <span className="font-medium">Brand:</span>
                          <span className="ml-2">{product.brand}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Product ID:</span>
                        <span className="ml-2">{product.id}</span>
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span>
                        <span className="ml-2">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">You Might Also Like</h2>
                <Link to="/products">
                  <Button variant="outline">View All Products</Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ModernProductCard 
                    key={relatedProduct.id} 
                    product={relatedProduct} 
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
