
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, Lock } from 'lucide-react';

const Checkout = () => {
  const { items, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [orderData, setOrderData] = useState(null);

  const handleOrderComplete = (data: any) => {
    setOrderData(data);
  };

  if (orderData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <OrderConfirmation orderData={orderData} />
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">Secure Checkout</span>
              </div>
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-gray-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your order
              </p>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some items to your cart before proceeding to checkout.
              </p>
              <Link to="/products">
                <Button size="lg">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <CheckoutForm onOrderComplete={handleOrderComplete} />
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <OrderSummaryCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
