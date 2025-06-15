import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import ProductVariantSelector from '@/components/product/ProductVariantSelector';
import AIRecommendations from '@/components/AIRecommendations';
import ProductFeatures from '@/components/product/ProductFeatures';
import ProductSubscription from '@/components/ProductSubscription';
import { getAllProducts, getProductById } from '@/data/products';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { items: wishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct);
      
      // Set default variant if product has variants
      if (foundProduct?.variants && foundProduct.variants.length > 0) {
        setSelectedVariant(foundProduct.variants[0]);
      }
    }
  }, [productId]);

  const isProductInWishlist = product ? wishlist.some(item => item.id === product.id) : false;
  const isInStock = selectedVariant ? selectedVariant.inStock : product?.inStock || false;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedVariant || undefined);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
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
        <div className="container mx-auto px-4 py-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo product={product} selectedVariant={selectedVariant} />
            
            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
              <ProductVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantSelect={handleVariantSelect}
              />
            )}
            
            {/* Product Actions */}
            <ProductActions 
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
              isProductInWishlist={isProductInWishlist}
              isInStock={isInStock}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
              onIncrementQuantity={handleIncrementQuantity}
              onDecrementQuantity={handleDecrementQuantity}
            />
            
            {/* Product Subscription */}
            <ProductSubscription 
              product={product} 
              onSubscriptionChange={(subscription) => {
                console.log('Subscription changed:', subscription);
              }}
            />
            
            {/* Product Features */}
            <ProductFeatures />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {/* AI Recommendations */}
        <AIRecommendations currentProduct={product} />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
