
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  Heart,
  Check,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProductVariant } from '@/types';
import { cn, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const relatedProducts = getRelatedProducts(id || '');
  
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="mt-2">The product you're looking for does not exist.</p>
            <Link to="/products" className="mt-4 inline-block">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const inWishlist = isInWishlist(product.id);
  const isInStock = selectedVariant ? selectedVariant.inStock : product.inStock;
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
      return;
    }
    addItem(product, quantity, selectedVariant);
  };
  
  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/products" className="flex items-center text-primary hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-20 rounded-md overflow-hidden border-2",
                        selectedImage === index ? "border-primary" : "border-transparent"
                      )}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center mt-2 mb-4">
                {/* Star Rating */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-4">
                {formatCurrency(displayPrice)}
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {/* Authentication Notice */}
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Please <Link to="/login" className="font-medium underline">login</Link> to add items to your cart.
                  </p>
                </div>
              )}
              
              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.inStock}
                        className={cn(
                          "px-4 py-2 rounded-md border",
                          selectedVariant?.id === variant.id 
                            ? "border-primary bg-primary/10 text-primary" 
                            : "border-gray-300 bg-white",
                          !variant.inStock && "bg-gray-100 text-gray-400 cursor-not-allowed"
                        )}
                      >
                        {variant.name}
                        {!variant.inStock && " (Out of stock)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center border rounded-md w-32">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className="flex-1"
                  size="lg"
                >
                  {!isInStock ? "Out of Stock" : !isAuthenticated ? "Login to Add to Cart" : "Add to Cart"}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={handleToggleWishlist}
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5", 
                      inWishlist ? "fill-red-500 text-red-500" : ""
                    )}
                  />
                </Button>
              </div>
              
              {/* Features */}
              {product.features && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Trust Badges */}
              <div className="mt-8 border-t pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center">
                    <Truck className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Free Shipping</span>
                    <span className="text-xs text-gray-500">On orders over $50</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <RefreshCw className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Easy Returns</span>
                    <span className="text-xs text-gray-500">30-day returns</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">Secure Payment</span>
                    <span className="text-xs text-gray-500">100% secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <ProductGrid 
                products={relatedProducts} 
                title="You May Also Like"
                subtitle="Products similar to this one"
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
