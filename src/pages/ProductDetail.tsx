
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus, Check, ChevronLeft, ChevronRight, X, Zap, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | undefined>('');
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
      setMainImage(foundProduct.images?.[0]);

      // Find related products (same category, exclude current product)
      const related = allProducts.filter(
        (p) => p.category === foundProduct.category && p.id !== productId
      ).slice(0, 4); // Limit to 4 related products
      setRelatedProducts(related);
    } else {
      setProduct(null);
    }
  }, [productId]);

  const isProductInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity); // product: Product, quantity: number
      toast({
        title: "Added to cart",
        description: `${product.name} x${quantity} added to your cart.`,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist.`,
      });
    }
  };

  const handleRemoveFromWishlist = () => {
    if (product) {
      removeFromWishlist(product.id); // pass ID not object
      toast({
        title: "Removed from wishlist",
        description: `${product.name} removed from your wishlist.`,
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

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
        {/* Product Header */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-gray-700">{product.rating ?? "N/A"}</span>
                  <span className="text-gray-500 ml-2">({product.reviewCount || 0} reviews)</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Badge>{product.category}</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Product Gallery & Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div>
                <img
                  src={mainImage || product.images?.[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-96 object-contain rounded-lg shadow-md"
                />
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                      onClick={() => setMainImage(image)}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Price</h2>
                  <p className="text-gray-900 text-xl font-bold">${product.price}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Quantity</h2>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={incrementQuantity}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <Button className="w-full" size="lg" onClick={handleAddToCart}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="mb-6">
                  {isProductInWishlist ? (
                    <Button variant="destructive" className="w-full" size="lg" onClick={handleRemoveFromWishlist}>
                      <Heart className="h-5 w-5 mr-2" />
                      Remove from Wishlist
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" size="lg" onClick={handleAddToWishlist}>
                      <Heart className="h-5 w-5 mr-2" />
                      Add to Wishlist
                    </Button>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <Card className="shadow-none border">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <Truck className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="text-sm font-semibold">Free Shipping</h3>
                        <p className="text-xs text-gray-500">On orders over $50</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none border">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <Shield className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="text-sm font-semibold">Secure Payments</h3>
                        <p className="text-xs text-gray-500">100% secure payments</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none border">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <RotateCcw className="h-6 w-6 text-yellow-500" />
                      <div>
                        <h3 className="text-sm font-semibold">Easy Returns</h3>
                        <p className="text-xs text-gray-500">30-day return policy</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-none border">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <Share2 className="h-6 w-6 text-gray-500" />
                      <div>
                        <h3 className="text-sm font-semibold">Share</h3>
                        <p className="text-xs text-gray-500">Share this product</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="bg-white rounded-lg shadow-sm">
                <TabsTrigger value="description" className="data-[state=active]:text-blue-500">Description</TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:text-blue-500">Details</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:text-blue-500">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-6">
                <ul className="list-disc list-inside text-gray-700">
                  <li>Category: {product.category}</li>
                  <li>Brand: {product.brand || 'N/A'}</li>
                  <li>Condition: New</li>
                  <li>Weight: 1.2 lbs</li>
                  <li>Dimensions: 10 x 6 x 4 inches</li>
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <p className="text-gray-700">No reviews yet.</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Related Products</h2>
            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.images?.[0] || '/placeholder.svg'}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                        <p className="text-gray-700">${relatedProduct.price}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
