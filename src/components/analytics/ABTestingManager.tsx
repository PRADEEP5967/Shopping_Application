
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical, TrendingUp, Users, Target, Play, Pause, Eye } from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variants: ABVariant[];
  startDate: Date;
  endDate?: Date;
  targetAudience: string;
  conversionGoal: string;
  confidence: number;
  statisticalSignificance: boolean;
}

interface ABVariant {
  id: string;
  name: string;
  description: string;
  traffic: number; // percentage
  conversions: number;
  visitors: number;
  conversionRate: number;
  isControl: boolean;
}

const ABTestingManager: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadABTests();
  }, []);

  const loadABTests = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTests: ABTest[] = [
      {
        id: '1',
        name: 'Product Page CTA Button',
        description: 'Testing different button colors and text',
        status: 'running',
        variants: [
          {
            id: 'control',
            name: 'Control (Blue)',
            description: 'Original blue "Add to Cart" button',
            traffic: 50,
            conversions: 156,
            visitors: 1240,
            conversionRate: 12.6,
            isControl: true
          },
          {
            id: 'variant-a',
            name: 'Variant A (Green)',
            description: 'Green "Buy Now" button',
            traffic: 50,
            conversions: 198,
            visitors: 1180,
            conversionRate: 16.8,
            isControl: false
          }
        ],
        startDate: new Date('2024-01-15'),
        targetAudience: 'All visitors',
        conversionGoal: 'Add to Cart clicks',
        confidence: 95,
        statisticalSignificance: true
      },
      {
        id: '2',
        name: 'Homepage Hero Section',
        description: 'Testing different hero section layouts',
        status: 'running',
        variants: [
          {
            id: 'control-2',
            name: 'Control',
            description: 'Current hero with carousel',
            traffic: 33,
            conversions: 89,
            visitors: 890,
            conversionRate: 10.0,
            isControl: true
          },
          {
            id: 'variant-b',
            name: 'Video Hero',
            description: 'Hero with background video',
            traffic: 33,
            conversions: 112,
            visitors: 865,
            conversionRate: 12.9,
            isControl: false
          },
          {
            id: 'variant-c',
            name: 'Minimal Hero',
            description: 'Clean, minimal design',
            traffic: 34,
            conversions: 98,
            visitors: 920,
            conversionRate: 10.7,
            isControl: false
          }
        ],
        startDate: new Date('2024-01-20'),
        targetAudience: 'New visitors',
        conversionGoal: 'Email signup',
        confidence: 85,
        statisticalSignificance: false
      }
    ];

    setTests(mockTests);
    setLoading(false);
  };

  const handleTestAction = (testId: string, action: 'start' | 'pause' | 'stop') => {
    setTests(prev => prev.map(test => {
      if (test.id === testId) {
        let newStatus = test.status;
        switch (action) {
          case 'start':
            newStatus = 'running';
            break;
          case 'pause':
            newStatus = 'paused';
            break;
          case 'stop':
            newStatus = 'completed';
            break;
        }
        return { ...test, status: newStatus };
      }
      return test;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getWinningVariant = (test: ABTest) => {
    return test.variants.reduce((prev, current) => 
      current.conversionRate > prev.conversionRate ? current : prev
    );
  };

  const prepareChartData = (test: ABTest) => {
    return test.variants.map(variant => ({
      name: variant.name,
      conversions: variant.conversions,
      conversionRate: variant.conversionRate,
      visitors: variant.visitors
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-6 w-6" />
          <h1 className="text-2xl font-bold">A/B Testing Manager</h1>
        </div>
        <Button>
          <Target className="h-4 w-4 mr-2" />
          Create New Test
        </Button>
      </div>

      {/* Tests Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Running Tests</p>
                <p className="text-2xl font-bold">
                  {tests.filter(t => t.status === 'running').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Avg. Lift</p>
                <p className="text-2xl font-bold">+14.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold">12.4K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">1,547</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => {
                const winner = getWinningVariant(test);
                return (
                  <TableRow key={test.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-gray-500">{test.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(test.status)}`}></div>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{test.variants.length}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{winner.name}</p>
                        <p className="text-sm text-green-600">
                          +{(winner.conversionRate - test.variants.find(v => v.isControl)!.conversionRate).toFixed(1)}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Progress value={test.confidence} className="w-16 h-2" />
                        <span className="text-sm">{test.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedTest(test)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        {test.status === 'running' ? (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleTestAction(test.id, 'pause')}
                          >
                            <Pause className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleTestAction(test.id, 'start')}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Test Details Modal/Panel */}
      {selectedTest && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedTest.name} - Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Variants Performance */}
              <div className="space-y-4">
                <h4 className="font-semibold">Variant Performance</h4>
                {selectedTest.variants.map((variant) => (
                  <Card key={variant.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{variant.name}</h5>
                        {variant.isControl && <Badge variant="outline">Control</Badge>}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Visitors</p>
                          <p className="font-bold">{variant.visitors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conversions</p>
                          <p className="font-bold">{variant.conversions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rate</p>
                          <p className="font-bold">{variant.conversionRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Chart */}
              <div>
                <h4 className="font-semibold mb-4">Conversion Rate Comparison</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prepareChartData(selectedTest)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversionRate" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ABTestingManager;
