
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Mail, Download, ArrowRight, Home } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface OrderConfirmationProps {
  orderData: {
    id: string;
    items: any[];
    customerInfo: any;
    shippingAddress: any;
    paymentMethod: string;
    totals: {
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    };
    createdAt: string;
  };
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderData }) => {
  const estimatedDelivery = () => {
    const orderDate = new Date(orderData.createdAt);
    const deliveryDate = new Date(orderDate.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-green-700 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-white rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-xl font-mono font-semibold text-gray-900">
              {orderData.id}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.product.name}</h4>
                    {item.variant && (
                      <p className="text-sm text-gray-600">{item.variant.name}</p>
                    )}
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency((item.variant ? item.variant.price : item.product.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">
                  {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                </p>
                <p>{orderData.shippingAddress.address}</p>
                <p>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                </p>
                <p>{orderData.shippingAddress.country}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center gap-2 text-green-600">
                <Package className="h-4 w-4" />
                <span className="font-medium">Estimated Delivery: {estimatedDelivery()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Actions */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(orderData.totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {orderData.totals.shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    formatCurrency(orderData.totals.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(orderData.totals.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(orderData.totals.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Confirmation Email</p>
                  <p className="text-xs text-gray-600">
                    Sent to {orderData.customerInfo.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Order Processing</p>
                  <p className="text-xs text-gray-600">
                    1-2 business days
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Tracking Info</p>
                  <p className="text-xs text-gray-600">
                    Available once shipped
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/orders" className="w-full">
              <Button variant="outline" className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </Link>
            
            <Link to="/products" className="w-full">
              <Button className="w-full">
                <ArrowRight className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            
            <Link to="/" className="w-full">
              <Button variant="ghost" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
