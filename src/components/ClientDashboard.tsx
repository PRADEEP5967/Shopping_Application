
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
      icon: <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "text-blue-600"
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: <Heart className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "text-red-600"
    },
    {
      title: "Rewards Points",
      value: "1,250",
      icon: <Star className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "text-yellow-600"
    },
    {
      title: "Active Subscriptions",
      value: "3",
      icon: <Package className="h-4 w-4 sm:h-5 sm:w-5" />,
      color: "text-green-600"
    }
  ];

  const recentOrders = [
    { id: "ORD-001", status: "Delivered", total: "$89.99", date: "2024-01-15" },
    { id: "ORD-002", status: "Shipped", total: "$156.50", date: "2024-01-20" },
    { id: "ORD-003", status: "Processing", total: "$45.00", date: "2024-01-25" }
  ];

  const quickActions = [
    { title: "View Orders", icon: <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />, href: "/orders" },
    { title: "Wishlist", icon: <Heart className="h-4 w-4 sm:h-5 sm:w-5" />, href: "/wishlist" },
    { title: "Payment Methods", icon: <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />, href: "/my-account" },
    { title: "Profile Settings", icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />, href: "/my-account" }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-white rounded-full p-2 sm:p-3">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Welcome back!</h1>
            <p className="text-sm sm:text-base text-gray-600">Here's what's happening with your account</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="mt-4 sm:mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="modern" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            Modern Features
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm sm:text-base">{order.id}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm sm:text-base">{order.total}</p>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3 sm:mt-4 text-sm">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-16 sm:h-20 flex flex-col items-center justify-center gap-1 sm:gap-2"
                    >
                      {action.icon}
                      <span className="text-xs sm:text-sm">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modern" className="mt-4 sm:mt-6">
          <ModernClientFeatures />
        </TabsContent>

        <TabsContent value="activity" className="mt-4 sm:mt-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Order placed</p>
                    <p className="text-xs sm:text-sm text-gray-500">Order #ORD-003 for $45.00</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Added to wishlist</p>
                    <p className="text-xs sm:text-sm text-gray-500">Wireless Gaming Headset</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Earned reward points</p>
                    <p className="text-xs sm:text-sm text-gray-500">+50 points from purchase</p>
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
