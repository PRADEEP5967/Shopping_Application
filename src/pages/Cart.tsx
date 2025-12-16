import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CartItemCard from '@/components/cart/CartItemCard';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import SEOHead from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEOHead title="Shopping Cart" description="View and manage your shopping cart." />
        <Header />
        <CartFlyout />
        
        <main className="flex-grow container mx-auto px-4 py-8" role="main">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-semibold mb-4 text-foreground">Please Log In</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to view your cart.
            </p>
            <Link to="/login">
              <Button>Log In to Continue</Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title={`Shopping Cart (${totalItems} items)`} 
        description={`You have ${totalItems} items in your cart.`}
      />
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8" role="main">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/products">
              <Button variant="ghost" size="icon" aria-label="Back to products">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <CartItemCard
                    key={`${item.product.id}-${item.variant?.id || 'default'}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
