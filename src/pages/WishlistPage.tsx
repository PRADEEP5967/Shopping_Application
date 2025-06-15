
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const WishlistPage = () => {
  const { items, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddAllToCart = () => {
    items.forEach(product => {
      addItem(product, 1);
    });
    
    toast({
      title: "Added to cart",
      description: `${items.length} items added to your cart.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mt-4" />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearWishlist}
                className="w-full sm:w-auto"
              >
                Clear All
              </Button>
              
              <Button 
                size="sm"
                onClick={handleAddAllToCart}
                className="flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <ShoppingBag className="h-4 w-4" />
                Add All to Cart
              </Button>
            </div>
          )}
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-gray-50 rounded-lg mx-4 sm:mx-0">
            <Heart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
              Save items you love by clicking the heart icon on any product.
              Your wishlist will be here when you're ready to decide.
            </p>
            <Link to="/products">
              <Button className="w-full sm:w-auto">Discover Products</Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
