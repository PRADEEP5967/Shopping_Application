import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-' + Date.now();
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date>(new Date());

  useEffect(() => {
    // Calculate estimated delivery (5-7 business days)
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 6);
    setEstimatedDelivery(delivery);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Order Number</h3>
                  <p className="text-lg font-mono">{orderId}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Order Date</h3>
                  <p>{new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Estimated Delivery</h3>
                  <p>{estimatedDelivery.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Status</h3>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Order Processing</h4>
                    <p className="text-sm text-gray-600">
                      We're preparing your items for shipment. This usually takes 1-2 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-400">Shipped</h4>
                    <p className="text-sm text-gray-600">
                      You'll receive a tracking number via email once your order ships.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-400">Delivered</h4>
                    <p className="text-sm text-gray-600">
                      Your package will arrive within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Confirmation */}
          <Card className="mb-8">
            <CardContent className="flex items-center gap-3 pt-6">
              <Mail className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-semibold">Email Confirmation Sent</h4>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email with your order details and tracking information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders">
              <Button variant="outline" className="w-full sm:w-auto">
                View Order History
              </Button>
            </Link>
            
            <Link to="/products">
              <Button className="w-full sm:w-auto flex items-center gap-2">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you have any questions about your order, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/contact-us">
                <Button variant="ghost" size="sm">Contact Support</Button>
              </Link>
              <Link to="/faq">
                <Button variant="ghost" size="sm">FAQ</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
