
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, ArrowUpRight, ArrowDownRight, Package, Target, Calendar, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const SalesReporting: React.FC = () => {
  const [reportType, setReportType] = useState('revenue');
  const [timeRange, setTimeRange] = useState('7days');

  // Sample data with more metrics
  const revenueData = [
    { name: 'Mon', revenue: 12400, orders: 124, profit: 3720, target: 15000 },
    { name: 'Tue', revenue: 13980, orders: 138, profit: 4194, target: 15000 },
    { name: 'Wed', revenue: 19800, orders: 195, profit: 5940, target: 15000 },
    { name: 'Thu', revenue: 13908, orders: 132, profit: 4172, target: 15000 },
    { name: 'Fri', revenue: 14800, orders: 148, profit: 4440, target: 15000 },
    { name: 'Sat', revenue: 18300, orders: 185, profit: 5490, target: 15000 },
    { name: 'Sun', revenue: 14300, orders: 141, profit: 4290, target: 15000 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, revenue: 52000, color: '#8b5cf6' },
    { name: 'Fashion', value: 30, revenue: 34000, color: '#06b6d4' },
    { name: 'Home & Living', value: 15, revenue: 17000, color: '#10b981' },
    { name: 'Sports', value: 10, revenue: 11000, color: '#f59e0b' },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro Max', sales: 256, revenue: 307200, growth: 18.5, rank: 1 },
    { name: 'MacBook Air M3', sales: 189, revenue: 245700, growth: 12.3, rank: 2 },
    { name: 'AirPods Pro 2', sales: 434, revenue: 108066, growth: 25.8, rank: 3 },
    { name: 'Samsung 4K TV 65"', sales: 98, revenue: 127400, growth: -5.2, rank: 4 },
    { name: 'Nike Air Max 2024', sales: 567, revenue: 96390, growth: 8.9, rank: 5 },
  ];

  const metrics = [
    { 
      title: 'Total Revenue', 
      value: '$107,486', 
      change: 12.5, 
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-100 dark:bg-violet-900/30'
    },
    { 
      title: 'Total Orders', 
      value: '1,063', 
      change: 8.2, 
      trend: 'up',
      icon: ShoppingCart,
      gradient: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30'
    },
    { 
      title: 'New Customers', 
      value: '245', 
      change: 15.3, 
      trend: 'up',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    { 
      title: 'Avg Order Value', 
      value: '$101.12', 
      change: -2.1, 
      trend: 'down',
      icon: Target,
      gradient: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30'
    },
  ];

  const exportReport = () => {
    const data = {
      reportType,
      timeRange,
      generatedAt: new Date().toISOString(),
      data: revenueData,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${reportType}-${timeRange}.json`;
    a.click();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-4">
          <p className="font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">
                {entry.name.toLowerCase().includes('revenue') || entry.name.toLowerCase().includes('profit') 
                  ? `$${entry.value.toLocaleString()}` 
                  : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 via-background to-cyan-500/5">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-cyan-500">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Sales Reports</CardTitle>
                  <CardDescription>Comprehensive sales analytics and insights</CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-36 bg-background/50 backdrop-blur-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={exportReport} className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <motion.p 
                      className="text-2xl sm:text-3xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      {metric.value}
                    </motion.p>
                    <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {metric.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      <span className="font-semibold">{Math.abs(metric.change)}%</span>
                      <span className="text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.gradient} text-white shadow-lg`}>
                    <metric.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue vs Target
              </CardTitle>
              <CardDescription>Daily performance against goals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                  <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" fill="url(#revenueGrad)" stroke="#8b5cf6" strokeWidth={3} name="Revenue" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Revenue distribution</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-lg hover:opacity-80 transition-opacity" />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 w-full lg:w-auto">
                  {categoryData.map((category, index) => (
                    <motion.div 
                      key={category.name}
                      className="flex items-center justify-between gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">{category.value}%</span>
                        <span className="text-xs text-muted-foreground ml-2">${(category.revenue / 1000).toFixed(0)}K</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Top Selling Products
                </CardTitle>
                <CardDescription>Best performers this period</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div 
                  key={product.name} 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all hover:shadow-md cursor-pointer group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                      product.rank === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                      product.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      product.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                      'bg-gradient-to-br from-primary/50 to-primary'
                    }`}>
                      {product.rank}
                    </div>
                    <div>
                      <span className="font-semibold group-hover:text-primary transition-colors">{product.name}</span>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="font-bold text-lg">${product.revenue.toLocaleString()}</p>
                      <div className={`text-sm flex items-center justify-end gap-1 ${product.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {product.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(product.growth)}%
                      </div>
                    </div>
                    <Badge variant={product.growth >= 0 ? 'default' : 'secondary'} className={product.growth >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}>
                      {product.growth >= 0 ? 'Growing' : 'Declining'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SalesReporting;
