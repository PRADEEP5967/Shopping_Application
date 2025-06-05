
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, Eye, ShoppingCart, DollarSign } from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'draft';
  variants: Array<{
    name: string;
    traffic: number;
    conversions: number;
    revenue: number;
    visitors: number;
  }>;
  metric: string;
  startDate: string;
  endDate?: string;
}

const ABTestingPanel: React.FC = () => {
  const [activeTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'Product Card Button Color',
      status: 'running',
      variants: [
        { name: 'Blue Button (Control)', traffic: 50, conversions: 156, revenue: 12480, visitors: 2340 },
        { name: 'Green Button', traffic: 50, conversions: 189, revenue: 15120, visitors: 2298 }
      ],
      metric: 'Conversion Rate',
      startDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Checkout Page Layout',
      status: 'running',
      variants: [
        { name: 'Single Page Checkout', traffic: 60, conversions: 234, revenue: 23400, visitors: 1876 },
        { name: 'Multi-step Checkout', traffic: 40, conversions: 198, revenue: 19800, visitors: 1245 }
      ],
      metric: 'Completion Rate',
      startDate: '2024-01-10',
    },
    {
      id: '3',
      name: 'Product Price Display',
      status: 'completed',
      variants: [
        { name: 'Regular Pricing', traffic: 50, conversions: 89, revenue: 8900, visitors: 1500 },
        { name: 'Strike-through Pricing', traffic: 50, conversions: 134, revenue: 13400, visitors: 1487 }
      ],
      metric: 'Purchase Rate',
      startDate: '2023-12-01',
      endDate: '2024-01-01'
    }
  ]);

  const calculateConversionRate = (conversions: number, visitors: number) => {
    return ((conversions / visitors) * 100).toFixed(2);
  };

  const calculateRevenuePerVisitor = (revenue: number, visitors: number) => {
    return (revenue / visitors).toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getWinningVariant = (variants: ABTest['variants']) => {
    return variants.reduce((prev, current) => {
      const prevRate = prev.conversions / prev.visitors;
      const currentRate = current.conversions / current.visitors;
      return currentRate > prevRate ? current : prev;
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                A/B Testing Dashboard
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Monitor and analyze your experiments
              </p>
            </div>
            <Button>
              <TrendingUp className="h-4 w-4 mr-2" />
              Create New Test
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Tests</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeTests.filter(test => test.status === 'running').map((test) => (
                <Card key={test.id} className="border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-gray-600">Started: {test.startDate}</p>
                      </div>
                      <Badge className={getStatusColor(test.status)}>
                        {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {test.variants.map((variant, index) => {
                        const conversionRate = calculateConversionRate(variant.conversions, variant.visitors);
                        const revenuePerVisitor = calculateRevenuePerVisitor(variant.revenue, variant.visitors);
                        const isWinning = variant === getWinningVariant(test.variants);
                        
                        return (
                          <div key={index} className={`p-4 rounded-lg border ${isWinning ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">{variant.name}</h4>
                              {isWinning && <Badge variant="default" className="bg-green-500">Leading</Badge>}
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span>Traffic Split:</span>
                                <span className="font-medium">{variant.traffic}%</span>
                              </div>
                              <Progress value={variant.traffic} className="h-2" />
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-blue-500" />
                                  <div>
                                    <div className="font-medium">{variant.visitors}</div>
                                    <div className="text-gray-500">Visitors</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <ShoppingCart className="h-4 w-4 text-green-500" />
                                  <div>
                                    <div className="font-medium">{variant.conversions}</div>
                                    <div className="text-gray-500">Conversions</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Eye className="h-4 w-4 text-purple-500" />
                                  <div>
                                    <div className="font-medium">{conversionRate}%</div>
                                    <div className="text-gray-500">Conv. Rate</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-orange-500" />
                                  <div>
                                    <div className="font-medium">${revenuePerVisitor}</div>
                                    <div className="text-gray-500">Rev/Visitor</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Stop Test</Button>
                      <Button variant="outline" size="sm">Export Data</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {activeTests.filter(test => test.status === 'completed').map((test) => (
                <Card key={test.id} className="border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-gray-600">
                          {test.startDate} - {test.endDate}
                        </p>
                      </div>
                      <Badge className={getStatusColor(test.status)}>
                        Completed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Winner: {getWinningVariant(test.variants).name}</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Achieved {calculateConversionRate(getWinningVariant(test.variants).conversions, getWinningVariant(test.variants).visitors)}% conversion rate
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {test.variants.map((variant, index) => (
                          <div key={index} className="p-3 border rounded">
                            <h4 className="font-medium mb-2">{variant.name}</h4>
                            <div className="text-sm space-y-1">
                              <div>Visitors: {variant.visitors}</div>
                              <div>Conversions: {variant.conversions}</div>
                              <div>Conversion Rate: {calculateConversionRate(variant.conversions, variant.visitors)}%</div>
                              <div>Revenue: ${variant.revenue}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Tests</p>
                        <p className="text-2xl font-bold">
                          {activeTests.filter(test => test.status === 'running').length}
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completed Tests</p>
                        <p className="text-2xl font-bold">
                          {activeTests.filter(test => test.status === 'completed').length}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Improvement</p>
                        <p className="text-2xl font-bold">+12.5%</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ABTestingPanel;
