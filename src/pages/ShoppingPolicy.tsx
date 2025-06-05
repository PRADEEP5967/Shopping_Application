
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  CreditCard, 
  Shield, 
  Package, 
  Globe, 
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ShoppingPolicy = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: "$4.99 (Free on orders $50+)",
      icon: Package
    },
    {
      name: "Expedited Shipping",
      time: "2-3 business days",
      cost: "$9.99",
      icon: Truck
    },
    {
      name: "Overnight Shipping",
      time: "1 business day",
      cost: "$19.99",
      icon: Clock
    }
  ];

  const paymentMethods = [
    { name: "Visa", accepted: true },
    { name: "Mastercard", accepted: true },
    { name: "American Express", accepted: true },
    { name: "Discover", accepted: true },
    { name: "PayPal", accepted: true },
    { name: "Apple Pay", accepted: true },
    { name: "Google Pay", accepted: true },
    { name: "Cryptocurrency", accepted: false }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Shopping & Shipping Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about placing orders, payment methods, 
              shipping options, and our commitment to secure shopping.
            </p>
          </div>

          {/* Shipping Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Options & Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {shippingOptions.map((option, index) => (
                  <div key={index} className="border rounded-lg p-4 text-center">
                    <option.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">{option.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{option.time}</p>
                    <Badge variant="secondary">{option.cost}</Badge>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Free Shipping</h4>
                    <p className="text-green-800 text-sm">
                      Get free standard shipping on all orders over $50. No code needed, discount applied automatically at checkout.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Accepted Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {paymentMethods.map((method, index) => (
                  <div key={index} className={`flex items-center gap-2 p-3 rounded-lg border ${
                    method.accepted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    {method.accepted ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      method.accepted ? 'text-green-900' : 'text-gray-500'
                    }`}>
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Security & Protection</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• All payments are processed through secure, encrypted connections</li>
                  <li>• We never store your complete credit card information</li>
                  <li>• Fraud protection and monitoring on all transactions</li>
                  <li>• PCI DSS compliant payment processing</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Order Processing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Processing & Fulfillment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Processing Times</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Standard items: 1-2 business days</li>
                    <li>• Custom/personalized items: 3-5 business days</li>
                    <li>• Pre-order items: Ships on release date</li>
                    <li>• Back-ordered items: 1-2 weeks (estimated)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Order Modifications</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Changes allowed within 1 hour of placing order</li>
                    <li>• Cancellations accepted before processing</li>
                    <li>• Address changes possible before shipping</li>
                    <li>• Contact support for urgent modifications</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Important Note</h4>
                    <p className="text-yellow-800 text-sm">
                      Orders placed after 2 PM EST on business days will be processed the next business day. 
                      Weekend and holiday orders are processed on the next business day.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Coverage */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Shipping Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">We Ship To:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• All 50 US States</li>
                    <li>• Washington D.C.</li>
                    <li>• Puerto Rico</li>
                    <li>• US Virgin Islands</li>
                    <li>• Military APO/FPO addresses</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Currently Not Available:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• International shipping</li>
                    <li>• P.O. Boxes (for large items)</li>
                    <li>• Alaska & Hawaii (some restrictions)</li>
                    <li>• US Territories (some items)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    *International shipping coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Special Circumstances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Damaged or Lost Packages</h4>
                <p className="text-sm text-gray-600 mb-3">
                  If your package arrives damaged or goes missing, please contact us within 48 hours. 
                  We'll work with the shipping carrier to resolve the issue and ensure you receive your items.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Weather & Natural Disasters</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Severe weather conditions or natural disasters may cause shipping delays. 
                  We'll notify you of any expected delays and work to minimize impact on your delivery.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Holiday Shipping</h4>
                <p className="text-sm text-gray-600">
                  During peak holiday seasons, shipping times may be extended. 
                  We recommend ordering early and choosing expedited shipping for time-sensitive gifts.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions About Your Order?</h3>
              <p className="text-gray-600 mb-4">
                Our customer service team is available to help with any shipping or order questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact-us" className="inline-block">
                  <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Contact Support
                  </button>
                </a>
                <a href="/orders" className="inline-block">
                  <button className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary/10 transition-colors">
                    Track My Order
                  </button>
                </a>
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
