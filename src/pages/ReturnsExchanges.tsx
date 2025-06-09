
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Shield
} from 'lucide-react';

const ReturnsExchanges = () => {
  const returnSteps = [
    {
      icon: <Package className="h-6 w-6" />,
      title: "Initiate Return",
      description: "Log into your account and select items to return"
    },
    {
      icon: <RotateCcw className="h-6 w-6" />,
      title: "Pack Items",
      description: "Pack items securely with original packaging"
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Ship Back",
      description: "Use our prepaid return label to ship items"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Get Refund",
      description: "Receive refund within 5-7 business days"
    }
  ];

  const policies = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "30-Day Return Window",
      description: "Items can be returned within 30 days of purchase"
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Original Condition",
      description: "Items must be in original, unused condition"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Original Packaging",
      description: "Items should include original packaging and tags"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
              <RotateCcw className="w-4 h-4 mr-2" />
              Easy Returns
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Returns & Exchanges
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We make returns and exchanges simple and hassle-free. Your satisfaction is our priority.
            </p>
            <Button size="lg" className="group">
              Start Return Process
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Return Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Returns Work</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to return your items quickly and easily.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {returnSteps.map((step, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Return Policy</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Please review our return policy to ensure a smooth return process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {policies.map((policy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        {policy.icon}
                      </div>
                      <h3 className="font-semibold">{policy.title}</h3>
                    </div>
                    <p className="text-gray-600">{policy.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Non-Returnable Items */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertCircle className="h-5 w-5" />
                  Non-Returnable Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• Personalized or customized products</li>
                  <li>• Perishable goods</li>
                  <li>• Digital downloads</li>
                  <li>• Gift cards</li>
                  <li>• Items marked as final sale</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our customer service team is here to help with any questions about returns or exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
              <Button size="lg">
                Start Return
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnsExchanges;
