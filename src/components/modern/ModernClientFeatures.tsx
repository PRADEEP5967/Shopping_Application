
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  Gift,
  Truck,
  CreditCard,
  Bell,
  Zap,
  TrendingUp,
  Calendar
} from 'lucide-react';

export const ModernClientFeatures = () => {
  const loyaltyProgram = {
    currentPoints: 1250,
    nextTierPoints: 2000,
    tier: 'Silver',
    nextTier: 'Gold'
  };

  const personalizedOffers = [
    { title: '20% Off Electronics', expires: '3 days left', category: 'Limited Time' },
    { title: 'Free Shipping', expires: '1 week left', category: 'Exclusive' },
    { title: 'Birthday Special', expires: '2 weeks left', category: 'Personal' }
  ];

  const recentViewedProducts = [
    { name: 'Wireless Headphones', price: '$199', image: '/placeholder.svg' },
    { name: 'Gaming Mouse', price: '$89', image: '/placeholder.svg' },
    { name: 'Laptop Stand', price: '$45', image: '/placeholder.svg' }
  ];

  const upcomingDeliveries = [
    { order: 'ORD-001', status: 'In Transit', eta: 'Tomorrow', progress: 75 },
    { order: 'ORD-002', status: 'Processing', eta: '3-5 days', progress: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* Loyalty Program */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Loyalty Program - {loyaltyProgram.tier} Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{loyaltyProgram.currentPoints} Points</span>
              <Badge variant="secondary">{loyaltyProgram.nextTierPoints - loyaltyProgram.currentPoints} to {loyaltyProgram.nextTier}</Badge>
            </div>
            <Progress 
              value={(loyaltyProgram.currentPoints / loyaltyProgram.nextTierPoints) * 100} 
              className="h-3" 
            />
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Gift className="h-4 w-4 mr-2" />
                Redeem Points
              </Button>
              <Button size="sm" variant="outline">
                View Rewards
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Offers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Just for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {personalizedOffers.map((offer, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium">{offer.title}</h4>
                  <p className="text-sm text-gray-500">{offer.expires}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-2">{offer.category}</Badge>
                  <Button size="sm">Claim</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeliveries.map((delivery, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{delivery.order}</span>
                  <Badge variant={delivery.status === 'In Transit' ? 'default' : 'secondary'}>
                    {delivery.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>ETA: {delivery.eta}</span>
                  <span>{delivery.progress}%</span>
                </div>
                <Progress value={delivery.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recently Viewed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Continue Shopping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentViewedProducts.map((product, index) => (
              <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer">
                <div className="aspect-square bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-sm text-gray-500">{product.price}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Smart Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-sm">Subscription Renewal</p>
                <p className="text-xs text-gray-500">Your premium subscription renews in 5 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Payment Method</p>
                <p className="text-xs text-gray-500">Your card ending in •••• 4532 expires next month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
