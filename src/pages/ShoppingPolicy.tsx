import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, ShieldCheck, CreditCard, PackageCheck, Phone, Mail } from 'lucide-react';

const ShoppingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Shipping & Shopping Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about shopping with us, from shipping to payments.
            </p>
          </div>

          {/* Shipping Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Shipping Options</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Standard Shipping: 5-7 business days</li>
                    <li>• Expedited Shipping: 2-3 business days</li>
                    <li>• Overnight Shipping: 1 business day</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Shipping Costs</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Standard Shipping: $5.99</li>
                    <li>• Expedited Shipping: $12.99</li>
                    <li>• Overnight Shipping: $24.99</li>
                    <li>• Free shipping on orders over $50</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Note</h4>
                <p className="text-blue-700 text-sm">
                  Shipping times are estimates and may vary depending on location and carrier delays.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We accept the following payment methods:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Visa</li>
                <li>• MasterCard</li>
                <li>• American Express</li>
                <li>• Discover</li>
                <li>• PayPal</li>
                <li>• Apple Pay</li>
              </ul>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Secure Payments</h4>
                <p className="text-green-700 text-sm">
                  All payments are processed securely using SSL encryption.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5" />
                Order Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                You can track your order using the tracking number provided in your shipping confirmation email.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Lost Package?</h4>
                <p className="text-yellow-700 text-sm">
                  If you have not received your order within the estimated delivery time, please contact us.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Need Assistance?</h3>
              <p className="text-gray-600 mb-4">
                Contact our customer service team for any questions or concerns.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  8130885013
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  support@example.com
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShoppingPolicy;
