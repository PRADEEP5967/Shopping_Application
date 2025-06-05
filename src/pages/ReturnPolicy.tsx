
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package, 
  CreditCard,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const ReturnPolicy = () => {
  const returnableItems = [
    "Clothing and accessories in original condition",
    "Electronics in original packaging",
    "Home goods and furniture (within size limits)",
    "Books and media in new condition",
    "Beauty products (unopened and unused)"
  ];

  const nonReturnableItems = [
    "Personalized or customized items",
    "Perishable goods (food, flowers)",
    "Digital downloads",
    "Gift cards",
    "Final sale items",
    "Items damaged by misuse"
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Log into your account and start a return request from your order history."
    },
    {
      step: 2,
      title: "Print Label",
      description: "Download and print the prepaid return shipping label we provide."
    },
    {
      step: 3,
      title: "Package Items",
      description: "Pack items securely in original packaging with all tags and accessories."
    },
    {
      step: 4,
      title: "Ship Back",
      description: "Drop off package at designated carrier location or schedule pickup."
    },
    {
      step: 5,
      title: "Get Refunded",
      description: "Receive your refund within 3-5 business days after we process your return."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Return & Exchange Policy</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We want you to be completely satisfied with your purchase. 
              Here's everything you need to know about returns and exchanges.
            </p>
          </div>

          {/* Policy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">30-Day Window</h3>
                <p className="text-sm text-gray-600">
                  Returns accepted within 30 days of delivery
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Free Returns</h3>
                <p className="text-sm text-gray-600">
                  We provide prepaid return labels
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Fast Refunds</h3>
                <p className="text-sm text-gray-600">
                  Refunds processed within 3-5 business days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Return Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                How to Return Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
                    <p className="text-blue-800 text-sm">
                      Keep your tracking number! It helps us locate your return quickly and process your refund faster.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eligible Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Returnable Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {returnableItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  Non-Returnable Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {nonReturnableItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Conditions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Return Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Required</Badge>
                    Item Condition
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Items must be in original condition</li>
                    <li>• All tags and labels must be attached</li>
                    <li>• Items must be clean and unworn</li>
                    <li>• Original packaging when applicable</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Timeline</Badge>
                    Return Window
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 30 days from delivery date</li>
                    <li>• Must be initiated within 30 days</li>
                    <li>• Items received after 45 days not accepted</li>
                    <li>• Holidays may extend processing time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchanges */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We offer exchanges for different sizes or colors of the same item. The exchange process 
                is similar to returns, and we'll send the new item once we receive the original.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Exchange Policy</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Exchanges must be for the same item in different size/color</li>
                  <li>• Price differences may apply for different models</li>
                  <li>• Original item must meet return conditions</li>
                  <li>• New item ships after we receive the return</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Need Help with a Return?</h3>
              <p className="text-gray-600 mb-4">
                Our customer service team is here to help make your return process as smooth as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <a href="/orders">Start a Return</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact-us">Contact Support</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
