
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { getAllProducts } from '@/data/products';
import { Sparkles } from 'lucide-react';

interface AIRecommendationsProps {
  currentProduct?: Product;
  userId?: string;
  limit?: number;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  currentProduct, 
  userId, 
  limit = 4 
}) => {
  const { items: wishlistItems } = useWishlist();
  const { items: cartItems } = useCart();
  const allProducts = getAllProducts();

  const recommendations = useMemo(() => {
    // Simple AI-like recommendation algorithm
    let scored = allProducts
      .filter(product => product.id !== currentProduct?.id)
      .map(product => {
        let score = 0;
        
        // Category matching (highest weight)
        if (currentProduct && product.category === currentProduct.category) {
          score += 50;
        }
        
        // Price range matching
        if (currentProduct) {
          const priceDiff = Math.abs(product.price - currentProduct.price);
          const priceScore = Math.max(0, 20 - (priceDiff / currentProduct.price) * 20);
          score += priceScore;
        }
        
        // Rating boost
        score += (product.rating || 0) * 5;
        
        // Popularity boost (review count)
        score += Math.min((product.reviewCount || 0) * 0.1, 10);
        
        // Wishlist affinity - if user has similar items in wishlist
        const wishlistCategories = wishlistItems.map(item => item.category);
        if (wishlistCategories.includes(product.category)) {
          score += 15;
        }
        
        // Cart affinity - boost items that complement cart items
        const cartCategories = cartItems.map(item => item.product.category);
        if (cartCategories.length > 0 && !cartCategories.includes(product.category)) {
          score += 10; // Encourage diverse purchases
        }
        
        // Stock availability
        if (product.inStock) {
          score += 5;
        }
        
        // Random factor for diversity
        score += Math.random() * 5;
        
        return { product, score };
      });

    // Sort by score and return top recommendations
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }, [allProducts, currentProduct, wishlistItems, cartItems, userId, limit]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Recommended for You
          <span className="text-sm font-normal text-gray-500">
            AI-powered suggestions
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
