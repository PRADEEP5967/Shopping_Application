
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Package, Calendar, Settings } from 'lucide-react';

const SubscriptionsPage = () => {
  // Mock subscription data
  const subscriptions = [
    {
      id: '1',
      productName: 'Premium Coffee Beans',
      frequency: 'Monthly',
      nextDelivery: '2024-02-15',
      price: 24.99,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400'
    },
    {
      id: '2',
      productName: 'Organic Dog Food',
      frequency: 'Every 3 weeks',
      nextDelivery: '2024-02-20',
      price: 45.99,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400'
    },
    {
      id: '3',
      productName: 'Vitamins & Supplements',
      frequency: 'Every 2 months',
      nextDelivery: '2024-03-01',
      price: 32.50,
      status: 'paused',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Subscriptions</h1>
              <p className="text-gray-600">Manage your recurring orders</p>
            </div>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </div>

          <div className="space-y-6">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={subscription.image}
                        alt={subscription.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{subscription.productName}</h3>
                        <p className="text-sm text-gray-600">{subscription.frequency}</p>
                      </div>
                    </div>
                    <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                      {subscription.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Next Delivery</p>
                        <p className="font-medium">
                          {new Date(subscription.nextDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Frequency</p>
                        <p className="font-medium">{subscription.frequency}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-medium text-lg">${subscription.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Modify
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={subscription.status === 'paused'}
                    >
                      {subscription.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                    <Button variant="outline" size="sm">
                      Skip Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Subscription */}
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Add New Subscription</h3>
              <p className="text-gray-600 mb-4">
                Never run out of your favorite products with auto-delivery
              </p>
              <Button>Browse Products</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubscriptionsPage;
