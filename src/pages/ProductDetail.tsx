
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAllProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product, ProductVariant } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductVariantSelector from '@/components/product/ProductVariantSelector';
import ModernProductCard from '@/components/ModernProductCard';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductInfo from '@/components/product/ProductInfo';
import ProductActions from '@/components/product/ProductActions';
import ProductFeatures from '@/components/product/ProductFeatures';
import ProductTabs from '@/components/product/ProductTabs';

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
        <ProductBreadcrumb product={product} />

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
                <ProductInfo product={product} selectedVariant={selectedVariant} />

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <ProductVariantSelector
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onVariantSelect={setSelectedVariant}
                  />
                )}

                {/* Actions */}
                <ProductActions
                  product={product}
                  selectedVariant={selectedVariant}
                  quantity={quantity}
                  isProductInWishlist={isProductInWishlist}
                  isInStock={isInStock}
                  onAddToCart={handleAddToCart}
                  onWishlistToggle={handleWishlistToggle}
                  onIncrementQuantity={incrementQuantity}
                  onDecrementQuantity={decrementQuantity}
                />

                {/* Features */}
                <ProductFeatures />
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <ProductTabs product={product} />

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
