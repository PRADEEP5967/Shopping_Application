
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Users, Eye, ShoppingCart, TrendingUp, Download, Filter } from 'lucide-react';
import { useCustomerBehavior } from '@/hooks/useCustomerBehavior';

interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  conversionRate: number;
  avgOrderValue: number;
  color: string;
}

interface BehaviorInsight {
  metric: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

const CustomerAnalyticsDashboard: React.FC = () => {
  const { behavior } = useCustomerBehavior();
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [insights, setInsights] = useState<BehaviorInsight[]>([]);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    generateAnalytics();
  }, [behavior, timeRange]);

  const generateAnalytics = () => {
    // Generate customer segments
    const mockSegments: CustomerSegment[] = [
      {
        id: 'high-value',
        name: 'High Value Customers',
        count: 145,
        conversionRate: 85,
        avgOrderValue: 250,
        color: '#8884d8'
      },
      {
        id: 'regular',
        name: 'Regular Customers',
        count: 892,
        conversionRate: 45,
        avgOrderValue: 120,
        color: '#82ca9d'
      },
      {
        id: 'browsers',
        name: 'Window Shoppers',
        count: 1456,
        conversionRate: 8,
        avgOrderValue: 75,
        color: '#ffc658'
      },
      {
        id: 'new',
        name: 'New Visitors',
        count: 678,
        conversionRate: 12,
        avgOrderValue: 95,
        color: '#ff7300'
      }
    ];

    setSegments(mockSegments);

    // Generate behavior insights
    const behaviorInsights: BehaviorInsight[] = [
      {
        metric: 'Page Views',
        value: '24.5K',
        change: 12.5,
        trend: 'up'
      },
      {
        metric: 'Session Duration',
        value: '4m 32s',
        change: -5.2,
        trend: 'down'
      },
      {
        metric: 'Bounce Rate',
        value: '32.1%',
        change: -8.1,
        trend: 'up'
      },
      {
        metric: 'Conversion Rate',
        value: '3.8%',
        change: 15.3,
        trend: 'up'
      }
    ];

    setInsights(behaviorInsights);
  };

  // Mock data for charts
  const trafficData = [
    { date: '2024-01-01', visits: 1200, conversions: 48 },
    { date: '2024-01-02', visits: 1450, conversions: 62 },
    { date: '2024-01-03', visits: 1320, conversions: 55 },
    { date: '2024-01-04', visits: 1680, conversions: 78 },
    { date: '2024-01-05', visits: 1520, conversions: 71 },
    { date: '2024-01-06', visits: 1890, conversions: 89 },
    { date: '2024-01-07', visits: 2100, conversions: 98 }
  ];

  const topPagesData = [
    { page: '/products', views: 5420, conversionRate: 4.2 },
    { page: '/product/wireless-headphones', views: 3210, conversionRate: 8.5 },
    { page: '/category/electronics', views: 2890, conversionRate: 3.1 },
    { page: '/deals', views: 2340, conversionRate: 6.7 },
    { page: '/product/gaming-laptop', views: 1980, conversionRate: 12.3 }
  ];

  const getTrendIcon = (trend: string, change: number) => {
    const isPositive = (trend === 'up' && change > 0) || (trend === 'down' && change < 0);
    return (
      <TrendingUp 
        className={`w-4 h-4 ${isPositive ? 'text-green-500' : 'text-red-500'} ${
          trend === 'down' ? 'rotate-180' : ''
        }`} 
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <Card key={insight.metric}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{insight.metric}</p>
                  <p className="text-2xl font-bold">{insight.value}</p>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(insight.trend, insight.change)}
                  <span className={`text-sm ${
                    insight.change > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {Math.abs(insight.change)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Flow</TabsTrigger>
          <TabsTrigger value="pages">Page Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic & Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={segments}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {segments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((segment) => (
              <Card key={segment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <h3 className="font-medium">{segment.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Customers</span>
                      <span className="font-medium">{segment.count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conversion</span>
                      <span className="font-medium">{segment.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Order</span>
                      <span className="font-medium">${segment.avgOrderValue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Journey Stages */}
                <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
                  {[
                    { stage: 'Landing', users: 10000, rate: 100, color: '#8884d8' },
                    { stage: 'Browse', users: 7500, rate: 75, color: '#82ca9d' },
                    { stage: 'Product View', users: 4500, rate: 45, color: '#ffc658' },
                    { stage: 'Add to Cart', users: 2000, rate: 20, color: '#ff7300' },
                    { stage: 'Checkout', users: 1200, rate: 12, color: '#a855f7' },
                    { stage: 'Purchase', users: 800, rate: 8, color: '#22c55e' }
                  ].map((item, index, arr) => (
                    <div key={item.stage} className="flex items-center">
                      <div className="flex flex-col items-center min-w-[100px]">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.rate}%
                        </div>
                        <p className="mt-2 font-medium text-sm">{item.stage}</p>
                        <p className="text-xs text-muted-foreground">{item.users.toLocaleString()}</p>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="flex items-center mx-2">
                          <div className="w-8 h-0.5 bg-muted-foreground/30"></div>
                          <div className="text-xs text-muted-foreground mx-1">
                            {Math.round((arr[index + 1].users / item.users) * 100)}%
                          </div>
                          <div className="w-8 h-0.5 bg-muted-foreground/30"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Drop-off Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-red-500/5 border-red-500/20">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Highest Drop-off</p>
                          <p className="font-bold">Browse → Product View</p>
                        </div>
                        <Badge variant="destructive">-40%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-500/5 border-yellow-500/20">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Cart Abandonment</p>
                          <p className="font-bold">Add to Cart → Checkout</p>
                        </div>
                        <Badge className="bg-yellow-500">-40%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-500/5 border-green-500/20">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Best Conversion</p>
                          <p className="font-bold">Checkout → Purchase</p>
                        </div>
                        <Badge className="bg-green-500">67%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* User Paths */}
                <div>
                  <h4 className="font-medium mb-3">Common User Paths</h4>
                  <div className="space-y-2">
                    {[
                      { path: 'Home → Electronics → Product → Cart → Purchase', users: 2340, conversion: 8.5 },
                      { path: 'Search → Product → Cart → Purchase', users: 1890, conversion: 12.3 },
                      { path: 'Deals → Product → Wishlist', users: 1456, conversion: 2.1 },
                      { path: 'Category → Product → Exit', users: 980, conversion: 0 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm">{item.path}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{item.users.toLocaleString()} users</span>
                          <Badge variant={item.conversion > 5 ? 'default' : 'secondary'}>
                            {item.conversion}% conv.
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPagesData.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-gray-600">{page.views.toLocaleString()} views</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {page.conversionRate}% conversion
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerAnalyticsDashboard;
