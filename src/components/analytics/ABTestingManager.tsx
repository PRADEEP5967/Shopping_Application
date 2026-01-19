import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { FlaskConical, TrendingUp, Users, Target, Play, Pause, Eye, Plus, Square, Trash2, Copy, RefreshCw, Download, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ABVariant {
  id: string;
  name: string;
  description: string;
  traffic: number;
  conversions: number;
  visitors: number;
  conversionRate: number;
  isControl: boolean;
}

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

const ABTestingManager: React.FC = () => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [newTest, setNewTest] = useState({
    name: '',
    description: '',
    targetAudience: 'all',
    conversionGoal: 'purchase',
    variants: [
      { name: 'Control', description: 'Original version', traffic: 50 },
      { name: 'Variant A', description: 'New version', traffic: 50 }
    ]
  });

  useEffect(() => {
    loadABTests();
  }, []);

  const loadABTests = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTests: ABTest[] = [
      {
        id: '1',
        name: 'Product Page CTA Button',
        description: 'Testing different button colors and text',
        status: 'running',
        variants: [
          { id: 'control', name: 'Control (Blue)', description: 'Original blue "Add to Cart" button', traffic: 50, conversions: 156, visitors: 1240, conversionRate: 12.6, isControl: true },
          { id: 'variant-a', name: 'Variant A (Green)', description: 'Green "Buy Now" button', traffic: 50, conversions: 198, visitors: 1180, conversionRate: 16.8, isControl: false }
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
          { id: 'control-2', name: 'Control', description: 'Current hero with carousel', traffic: 33, conversions: 89, visitors: 890, conversionRate: 10.0, isControl: true },
          { id: 'variant-b', name: 'Video Hero', description: 'Hero with background video', traffic: 33, conversions: 112, visitors: 865, conversionRate: 12.9, isControl: false },
          { id: 'variant-c', name: 'Minimal Hero', description: 'Clean, minimal design', traffic: 34, conversions: 98, visitors: 920, conversionRate: 10.7, isControl: false }
        ],
        startDate: new Date('2024-01-20'),
        targetAudience: 'New visitors',
        conversionGoal: 'Email signup',
        confidence: 85,
        statisticalSignificance: false
      },
      {
        id: '3',
        name: 'Checkout Flow',
        description: 'Single page vs multi-step checkout',
        status: 'completed',
        variants: [
          { id: 'control-3', name: 'Multi-step', description: '4-step checkout process', traffic: 50, conversions: 234, visitors: 1520, conversionRate: 15.4, isControl: true },
          { id: 'variant-d', name: 'Single Page', description: 'One page checkout', traffic: 50, conversions: 298, visitors: 1480, conversionRate: 20.1, isControl: false }
        ],
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-14'),
        targetAudience: 'Cart visitors',
        conversionGoal: 'Purchase completion',
        confidence: 98,
        statisticalSignificance: true
      }
    ];

    setTests(mockTests);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadABTests();
    setIsRefreshing(false);
    toast.success('Tests refreshed');
  };

  const handleTestAction = (testId: string, action: 'start' | 'pause' | 'stop') => {
    setTests(prev => prev.map(test => {
      if (test.id === testId) {
        let newStatus: ABTest['status'] = test.status;
        switch (action) {
          case 'start': newStatus = 'running'; break;
          case 'pause': newStatus = 'paused'; break;
          case 'stop': newStatus = 'completed'; break;
        }
        return { ...test, status: newStatus };
      }
      return test;
    }));
    
    const messages = { start: 'Test started', pause: 'Test paused', stop: 'Test stopped' };
    toast.success(messages[action]);
  };

  const handleCreateTest = () => {
    if (!newTest.name) {
      toast.error('Please enter a test name');
      return;
    }

    const totalTraffic = newTest.variants.reduce((sum, v) => sum + v.traffic, 0);
    if (totalTraffic !== 100) {
      toast.error('Traffic split must total 100%');
      return;
    }

    const test: ABTest = {
      id: Date.now().toString(),
      name: newTest.name,
      description: newTest.description,
      status: 'draft',
      variants: newTest.variants.map((v, i) => ({
        id: `variant-${Date.now()}-${i}`,
        name: v.name,
        description: v.description,
        traffic: v.traffic,
        conversions: 0,
        visitors: 0,
        conversionRate: 0,
        isControl: i === 0
      })),
      startDate: new Date(),
      targetAudience: newTest.targetAudience,
      conversionGoal: newTest.conversionGoal,
      confidence: 0,
      statisticalSignificance: false
    };

    setTests(prev => [...prev, test]);
    setIsCreateDialogOpen(false);
    setNewTest({
      name: '',
      description: '',
      targetAudience: 'all',
      conversionGoal: 'purchase',
      variants: [
        { name: 'Control', description: 'Original version', traffic: 50 },
        { name: 'Variant A', description: 'New version', traffic: 50 }
      ]
    });
    toast.success('Test created successfully');
  };

  const handleDeleteTest = () => {
    if (!testToDelete) return;
    setTests(prev => prev.filter(t => t.id !== testToDelete));
    setIsDeleteDialogOpen(false);
    setTestToDelete(null);
    if (selectedTest?.id === testToDelete) setSelectedTest(null);
    toast.success('Test deleted');
  };

  const handleDuplicateTest = (test: ABTest) => {
    const duplicate: ABTest = {
      ...test,
      id: Date.now().toString(),
      name: `${test.name} (Copy)`,
      status: 'draft',
      startDate: new Date(),
      endDate: undefined,
      variants: test.variants.map(v => ({ ...v, conversions: 0, visitors: 0, conversionRate: 0 })),
      confidence: 0,
      statisticalSignificance: false
    };
    setTests(prev => [...prev, duplicate]);
    toast.success('Test duplicated');
  };

  const handleExportResults = (test: ABTest) => {
    const data = {
      test: test.name,
      status: test.status,
      startDate: test.startDate,
      endDate: test.endDate,
      variants: test.variants,
      confidence: test.confidence,
      winner: getWinningVariant(test).name
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ab-test-${test.id}-results.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Results exported');
  };

  const addVariant = () => {
    if (newTest.variants.length >= 4) {
      toast.error('Maximum 4 variants allowed');
      return;
    }
    const trafficPerVariant = Math.floor(100 / (newTest.variants.length + 1));
    const variants = newTest.variants.map(v => ({ ...v, traffic: trafficPerVariant }));
    variants.push({ name: `Variant ${String.fromCharCode(65 + newTest.variants.length - 1)}`, description: '', traffic: trafficPerVariant });
    
    // Adjust last variant to make total 100
    const total = variants.reduce((sum, v) => sum + v.traffic, 0);
    variants[variants.length - 1].traffic += 100 - total;
    
    setNewTest({ ...newTest, variants });
  };

  const removeVariant = (index: number) => {
    if (newTest.variants.length <= 2) {
      toast.error('Minimum 2 variants required');
      return;
    }
    const variants = newTest.variants.filter((_, i) => i !== index);
    const trafficPerVariant = Math.floor(100 / variants.length);
    variants.forEach((v, i) => {
      v.traffic = trafficPerVariant;
      if (i === variants.length - 1) v.traffic += 100 - (trafficPerVariant * variants.length);
    });
    setNewTest({ ...newTest, variants });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
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

  const kpis = [
    { label: 'Running Tests', value: tests.filter(t => t.status === 'running').length, icon: Play, color: 'text-green-500' },
    { label: 'Avg. Lift', value: '+14.2%', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Total Visitors', value: '12.4K', icon: Users, color: 'text-purple-500' },
    { label: 'Conversions', value: '1,547', icon: Target, color: 'text-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">A/B Testing Manager</h1>
            <p className="text-muted-foreground">Create and manage experiments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New A/B Test</DialogTitle>
                <DialogDescription>Set up your experiment configuration</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="test-name">Test Name</Label>
                  <Input 
                    id="test-name"
                    value={newTest.name}
                    onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                    placeholder="e.g., Homepage CTA Button Color"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="test-desc">Description</Label>
                  <Textarea 
                    id="test-desc"
                    value={newTest.description}
                    onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                    placeholder="Describe what you're testing"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Target Audience</Label>
                    <Select value={newTest.targetAudience} onValueChange={(v) => setNewTest({ ...newTest, targetAudience: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Visitors</SelectItem>
                        <SelectItem value="new">New Visitors</SelectItem>
                        <SelectItem value="returning">Returning Visitors</SelectItem>
                        <SelectItem value="mobile">Mobile Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Conversion Goal</Label>
                    <Select value={newTest.conversionGoal} onValueChange={(v) => setNewTest({ ...newTest, conversionGoal: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="signup">Sign Up</SelectItem>
                        <SelectItem value="add_to_cart">Add to Cart</SelectItem>
                        <SelectItem value="click">Click</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Variants</Label>
                    <Button variant="outline" size="sm" onClick={addVariant}>
                      <Plus className="h-3 w-3 mr-1" /> Add Variant
                    </Button>
                  </div>
                  {newTest.variants.map((variant, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <Input 
                                value={variant.name}
                                onChange={(e) => {
                                  const variants = [...newTest.variants];
                                  variants[index].name = e.target.value;
                                  setNewTest({ ...newTest, variants });
                                }}
                                placeholder="Variant name"
                              />
                              {index === 0 && <Badge variant="outline">Control</Badge>}
                            </div>
                            <Input 
                              value={variant.description}
                              onChange={(e) => {
                                const variants = [...newTest.variants];
                                variants[index].description = e.target.value;
                                setNewTest({ ...newTest, variants });
                              }}
                              placeholder="Description"
                            />
                            <div className="flex items-center gap-4">
                              <Label className="w-24">Traffic: {variant.traffic}%</Label>
                              <Slider
                                value={[variant.traffic]}
                                min={5}
                                max={95}
                                step={5}
                                onValueChange={([value]) => {
                                  const variants = [...newTest.variants];
                                  variants[index].traffic = value;
                                  setNewTest({ ...newTest, variants });
                                }}
                                className="flex-1"
                              />
                            </div>
                          </div>
                          {index > 0 && (
                            <Button variant="ghost" size="sm" onClick={() => removeVariant(index)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Total traffic: {newTest.variants.reduce((sum, v) => sum + v.traffic, 0)}%
                    {newTest.variants.reduce((sum, v) => sum + v.traffic, 0) !== 100 && (
                      <span className="text-red-500 ml-2">(Must equal 100%)</span>
                    )}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateTest}>Create Test</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading tests...</div>
          ) : tests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tests yet. Create your first A/B test to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>Winner</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => {
                  const winner = getWinningVariant(test);
                  const control = test.variants.find(v => v.isControl);
                  const lift = control ? (winner.conversionRate - control.conversionRate).toFixed(1) : '0';
                  
                  return (
                    <TableRow key={test.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-sm text-muted-foreground">{test.description}</p>
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
                          <p className={`text-sm ${parseFloat(lift) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {parseFloat(lift) > 0 ? '+' : ''}{lift}%
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={test.confidence} className="w-16 h-2" />
                          <span className="text-sm">{test.confidence}%</span>
                          {test.statisticalSignificance && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTest(test)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {test.status === 'running' ? (
                            <Button variant="ghost" size="sm" onClick={() => handleTestAction(test.id, 'pause')}>
                              <Pause className="h-4 w-4" />
                            </Button>
                          ) : test.status !== 'completed' ? (
                            <Button variant="ghost" size="sm" onClick={() => handleTestAction(test.id, 'start')}>
                              <Play className="h-4 w-4" />
                            </Button>
                          ) : null}
                          {test.status === 'running' && (
                            <Button variant="ghost" size="sm" onClick={() => handleTestAction(test.id, 'stop')}>
                              <Square className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleDuplicateTest(test)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleExportResults(test)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => { setTestToDelete(test.id); setIsDeleteDialogOpen(true); }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Test Details Panel */}
      {selectedTest && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedTest.name} - Detailed Results</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTest(null)}>Close</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Variant Performance</h4>
                {selectedTest.variants.map((variant) => (
                  <Card key={variant.id} className={variant === getWinningVariant(selectedTest) ? 'border-green-500' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{variant.name}</h5>
                        <div className="flex items-center gap-2">
                          {variant.isControl && <Badge variant="outline">Control</Badge>}
                          {variant === getWinningVariant(selectedTest) && (
                            <Badge className="bg-green-500">Leading</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{variant.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Visitors</p>
                          <p className="font-bold">{variant.visitors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Conversions</p>
                          <p className="font-bold">{variant.conversions}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rate</p>
                          <p className="font-bold">{variant.conversionRate}%</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Traffic Split</span>
                          <span>{variant.traffic}%</span>
                        </div>
                        <Progress value={variant.traffic} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <h4 className="font-semibold mb-4">Conversion Rate Comparison</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={prepareChartData(selectedTest)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="conversionRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 p-4 rounded-lg bg-accent/50">
                  <h5 className="font-medium mb-2">Statistical Summary</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target Audience</p>
                      <p className="font-medium">{selectedTest.targetAudience}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversion Goal</p>
                      <p className="font-medium">{selectedTest.conversionGoal}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Confidence Level</p>
                      <p className="font-medium">{selectedTest.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Statistical Significance</p>
                      <p className={`font-medium ${selectedTest.statisticalSignificance ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedTest.statisticalSignificance ? 'Yes' : 'Not yet'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Test</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this test? This action cannot be undone and all test data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTest} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ABTestingManager;