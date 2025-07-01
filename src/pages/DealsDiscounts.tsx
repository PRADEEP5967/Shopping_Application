
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent, Clock, Star, Zap } from 'lucide-react';

const DealsDiscounts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800">
            <Percent className="w-4 h-4 mr-2" />
            Special Offers
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Deals & Discounts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals and exclusive discounts on your favorite products
          </p>
        </div>

        {/* Featured Deals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Zap className="w-5 h-5" />
                Flash Sale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-2">Up to 70% OFF</div>
              <p className="text-gray-600 mb-4">Limited time electronics deals</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                Ends in 2 days
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Shop Flash Sale
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Star className="w-5 h-5" />
                Daily Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">Save 40%</div>
              <p className="text-gray-600 mb-4">New deals every day</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                Updates at midnight
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Daily Deals
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Percent className="w-5 h-5" />
                Clearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">Up to 80% OFF</div>
              <p className="text-gray-600 mb-4">Last chance items</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                While supplies last
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Shop Clearance
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Clothing', 'Home', 'Sports'].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-20 text-lg font-medium hover:bg-gray-50"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealsDiscounts;
