
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModernClientFeatures } from '@/components/modern/ModernClientFeatures';
import { 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Star, 
  Package, 
  CreditCard,
  User,
  Settings,
  Sparkles
} from 'lucide-react';

const ClientDashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "text-blue-600"
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: <Heart className="h-5 w-5" />,
      color: "text-red-600"
    },
    {
      title: "Rewards Points",
      value: "1,250",
      icon: <Star className="h-5 w-5" />,
      color: "text-yellow-600"
    },
    {
      title: "Active Subscriptions",
      value: "3",
      icon: <Package className="h-5 w-5" />,
      color: "text-green-600"
    }
  ];

  const recentOrders = [
    { id: "ORD-001", status: "Delivered", total: "$89.99", date: "2024-01-15" },
    { id: "ORD-002", status: "Shipped", total: "$156.50", date: "2024-01-20" },
    { id: "ORD-003", status: "Processing", total: "$45.00", date: "2024-01-25" }
  ];

  const quickActions = [
    { title: "View Orders", icon: <ShoppingBag className="h-5 w-5" />, href: "/orders" },
    { title: "Wishlist", icon: <Heart className="h-5 w-5" />, href: "/wishlist" },
    { title: "Payment Methods", icon: <CreditCard className="h-5 w-5" />, href: "/my-account" },
    { title: "Profile Settings", icon: <Settings className="h-5 w-5" />, href: "/my-account" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-3">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-gray-600">Here's what's happening with your account</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modern" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Modern Features
          </TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.total}</p>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center gap-2"
                    >
                      {action.icon}
                      <span className="text-sm">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modern" className="mt-6">
          <ModernClientFeatures />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Order placed</p>
                    <p className="text-sm text-gray-500">Order #ORD-003 for $45.00</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Added to wishlist</p>
                    <p className="text-sm text-gray-500">Wireless Gaming Headset</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Earned reward points</p>
                    <p className="text-sm text-gray-500">+50 points from purchase</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
