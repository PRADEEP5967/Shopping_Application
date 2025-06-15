
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard';
import { useCart } from '@/contexts/CartContext';
import { Navigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  // Redirect to cart if no items
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleOrderComplete = (orderData: any) => {
    // Store order data in localStorage or send to backend
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    // Navigate to order confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
            <p className="text-gray-600">
              Complete your order securely and safely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="order-2 lg:order-1">
              <CheckoutForm onOrderComplete={handleOrderComplete} />
            </div>

            {/* Order Summary */}
            <div className="order-1 lg:order-2">
              <OrderSummaryCard />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
