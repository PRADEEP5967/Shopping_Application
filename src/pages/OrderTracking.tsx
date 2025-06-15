
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import OrderTracking from '@/components/tracking/OrderTracking';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tracking data
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (orderId) {
        toast.success(`Loaded tracking information for order ${orderId}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderId]);

  // Real-time tracking simulation
  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(() => {
      // Simulate random tracking updates
      const updates = [
        'Package is out for delivery',
        'Package arrived at local facility',
        'Package is in transit',
        'Delivery attempted - will retry tomorrow'
      ];
      
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      
      // Randomly show notifications (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        toast.info(`Order ${orderId}: ${randomUpdate}`, {
          duration: 5000,
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-6 w-6 text-blue-600" />
                <h1 className="text-3xl font-bold">Track Your Order</h1>
              </div>
              {orderId && (
                <p className="text-gray-600">
                  Tracking order: <span className="font-mono">{orderId}</span>
                </p>
              )}
            </div>
          </div>

          {/* Order Tracking Component */}
          <OrderTracking orderId={orderId} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;
