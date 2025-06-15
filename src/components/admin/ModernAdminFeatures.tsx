
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  Zap,
  Target,
  Users2
} from 'lucide-react';

export const ModernAdminFeatures = () => {
  const quickActions = [
    { title: 'Add Product', icon: Zap, color: 'bg-blue-500', action: '/admin/add-product' },
    { title: 'View Orders', icon: Target, color: 'bg-green-500', action: '/admin/orders' },
    { title: 'Manage Users', icon: Users2, color: 'bg-purple-500', action: '/admin/customers' },
    { title: 'Analytics', icon: TrendingUp, color: 'bg-orange-500', action: '/admin/analytics' }
  ];

  const recentActivities = [
    { type: 'order', message: 'New order #ORD-001 received', time: '2 min ago', status: 'success' },
    { type: 'product', message: 'Product "Gaming Laptop" updated', time: '5 min ago', status: 'info' },
    { type: 'alert', message: 'Low stock: Wireless Headphones', time: '10 min ago', status: 'warning' },
    { type: 'user', message: 'New user registration', time: '15 min ago', status: 'success' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all"
                onClick={() => window.location.href = action.action}
              >
                <div className={`${action.color} p-2 rounded-full text-white`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Real-time Activity
            </CardTitle>
            <Badge variant="secondary" className="animate-pulse">
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Sales Target</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Customer Satisfaction</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Inventory Turnover</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
