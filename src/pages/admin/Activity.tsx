
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Activity, Search, User, Package, ShoppingCart, Settings, Clock } from 'lucide-react';

const ActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock activity data
  const activities = [
    { 
      id: '1', 
      type: 'user_login', 
      user: 'John Doe', 
      action: 'logged in', 
      details: 'User successfully authenticated',
      timestamp: '2024-06-05T10:30:00Z',
      icon: User,
      color: 'text-green-600'
    },
    { 
      id: '2', 
      type: 'product_created', 
      user: 'Admin', 
      action: 'created product', 
      details: 'Wireless Headphones added to catalog',
      timestamp: '2024-06-05T09:15:00Z',
      icon: Package,
      color: 'text-blue-600'
    },
    { 
      id: '3', 
      type: 'order_placed', 
      user: 'Jane Smith', 
      action: 'placed order', 
      details: 'Order #12345 - $129.99',
      timestamp: '2024-06-05T08:45:00Z',
      icon: ShoppingCart,
      color: 'text-purple-600'
    },
    { 
      id: '4', 
      type: 'settings_updated', 
      user: 'Admin', 
      action: 'updated settings', 
      details: 'Store configuration modified',
      timestamp: '2024-06-05T08:20:00Z',
      icon: Settings,
      color: 'text-orange-600'
    }
  ];

  const filteredActivities = activities.filter(activity =>
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return activityTime.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Log
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Monitor all system activities and user actions
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeAgo(activity.timestamp)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {activity.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLog;
