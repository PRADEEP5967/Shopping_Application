
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Package, Users, DollarSign, ShoppingCart, AlertTriangle } from 'lucide-react';

export const AdminStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '2,345',
      change: '+15.3%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+5.2%',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Active Users',
      value: '8,234',
      change: '+12.5%',
      icon: Users,
      color: 'text-orange-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5 items',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
