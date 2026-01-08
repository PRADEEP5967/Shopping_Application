
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend,
  ComposedChart
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, Package,
  ArrowUpRight, ArrowDownRight, Download, RefreshCw, Calendar, Target,
  Zap, Activity, Globe, Clock, Award, BarChart3, PieChartIcon, LineChartIcon,
  Filter, Share2, Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Modern color palette
const COLORS = {
  primary: 'hsl(var(--primary))',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
  cyan: '#06b6d4',
  gradient: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
};

const chartColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const numberVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
};

// Sample data
const revenueData = [
  { date: 'Jan', revenue: 42000, orders: 320, profit: 12600, visitors: 15000 },
  { date: 'Feb', revenue: 38000, orders: 280, profit: 10200, visitors: 13500 },
  { date: 'Mar', revenue: 52000, orders: 410, profit: 16800, visitors: 18000 },
  { date: 'Apr', revenue: 48000, orders: 380, profit: 14400, visitors: 16500 },
  { date: 'May', revenue: 61000, orders: 490, profit: 19500, visitors: 21000 },
  { date: 'Jun', revenue: 55000, orders: 440, profit: 17200, visitors: 19500 },
  { date: 'Jul', revenue: 67000, orders: 520, profit: 21400, visitors: 23000 },
];

const categoryData = [
  { name: 'Electronics', value: 42, revenue: 28000, color: '#8b5cf6' },
  { name: 'Fashion', value: 28, revenue: 18500, color: '#06b6d4' },
  { name: 'Home & Living', value: 18, revenue: 12000, color: '#10b981' },
  { name: 'Sports', value: 12, revenue: 8000, color: '#f59e0b' },
];

const hourlyData = [
  { hour: '00:00', visitors: 120, sales: 8 },
  { hour: '03:00', visitors: 80, sales: 4 },
  { hour: '06:00', visitors: 200, sales: 15 },
  { hour: '09:00', visitors: 580, sales: 42 },
  { hour: '12:00', visitors: 720, sales: 58 },
  { hour: '15:00', visitors: 650, sales: 48 },
  { hour: '18:00', visitors: 890, sales: 72 },
  { hour: '21:00', visitors: 420, sales: 32 },
];

const topProducts = [
  { name: 'iPhone 15 Pro Max', sales: 234, revenue: 280600, growth: 15.2, image: '📱' },
  { name: 'MacBook Air M3', sales: 156, revenue: 202800, growth: 8.7, image: '💻' },
  { name: 'AirPods Pro 2', sales: 412, revenue: 102588, growth: 22.4, image: '🎧' },
  { name: 'Samsung 4K TV 65"', sales: 89, revenue: 115700, growth: -3.2, image: '📺' },
  { name: 'Nike Air Max', sales: 567, revenue: 96390, growth: 12.1, image: '👟' },
];

const recentTransactions = [
  { id: 'TXN-001', customer: 'John Smith', amount: 599.99, status: 'completed', time: '2 min ago' },
  { id: 'TXN-002', customer: 'Sarah Johnson', amount: 1249.00, status: 'processing', time: '5 min ago' },
  { id: 'TXN-003', customer: 'Mike Williams', amount: 349.50, status: 'completed', time: '12 min ago' },
  { id: 'TXN-004', customer: 'Emily Davis', amount: 899.00, status: 'pending', time: '18 min ago' },
  { id: 'TXN-005', customer: 'Alex Brown', amount: 2199.99, status: 'completed', time: '25 min ago' },
];

const performanceGoals = [
  { label: 'Revenue Target', current: 67000, target: 80000, color: '#8b5cf6' },
  { label: 'Orders Target', current: 520, target: 600, color: '#06b6d4' },
  { label: 'Customer Acquisition', current: 156, target: 200, color: '#10b981' },
  { label: 'Conversion Rate', current: 3.8, target: 5, color: '#f59e0b' },
];

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  delay?: number;
  gradient: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeLabel, icon, trend, delay = 0, gradient }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay }}
  >
    <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <motion.div
              variants={numberVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: delay + 0.2 }}
            >
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            </motion.div>
            <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span className="font-semibold">{Math.abs(change)}%</span>
              <span className="text-muted-foreground ml-1">{changeLabel}</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
            {icon}
          </div>
        </div>
        <motion.div 
          className="mt-4 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        >
          <motion.div 
            className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
            transition={{ duration: 1.5, delay: delay + 0.5 }}
          />
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

const ModernAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(1247);

  // Simulate live visitor count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + Math.floor(Math.random() * 10) - 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-700';
    }
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
              <span className="font-medium">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">{liveVisitors.toLocaleString()} live</span>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 bg-background/50 backdrop-blur-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            className="bg-background/50 backdrop-blur-sm"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value="$67,890"
          change={12.5}
          changeLabel="vs last period"
          icon={<DollarSign className="h-6 w-6" />}
          trend="up"
          delay={0}
          gradient="from-violet-500 to-purple-600"
        />
        <MetricCard
          title="Total Orders"
          value="1,234"
          change={8.2}
          changeLabel="vs last period"
          icon={<ShoppingCart className="h-6 w-6" />}
          trend="up"
          delay={0.1}
          gradient="from-cyan-500 to-blue-600"
        />
        <MetricCard
          title="New Customers"
          value="456"
          change={-3.1}
          changeLabel="vs last period"
          icon={<Users className="h-6 w-6" />}
          trend="down"
          delay={0.2}
          gradient="from-emerald-500 to-teal-600"
        />
        <MetricCard
          title="Conversion Rate"
          value="3.8%"
          change={15.3}
          changeLabel="vs last period"
          icon={<Target className="h-6 w-6" />}
          trend="up"
          delay={0.3}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5 text-primary" />
                    Revenue & Orders Trend
                  </CardTitle>
                  <CardDescription>Monthly performance overview</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span className="text-muted-foreground">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-muted-foreground">Orders</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                  <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis yAxisId="left" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" fill="url(#revenueGradient)" stroke="#8b5cf6" strokeWidth={3} name="Revenue ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', strokeWidth: 2 }} name="Orders" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary" />
                Sales by Category
              </CardTitle>
              <CardDescription>Revenue distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-lg" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((category, index) => (
                  <motion.div 
                    key={category.name} 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{category.value}%</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Goals & Hourly Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Performance Goals
              </CardTitle>
              <CardDescription>Track your targets in real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceGoals.map((goal, index) => {
                const percentage = (goal.current / goal.target) * 100;
                return (
                  <motion.div 
                    key={goal.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{goal.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: goal.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant={percentage >= 100 ? 'default' : 'secondary'} className="text-xs">
                        {percentage.toFixed(1)}% achieved
                      </Badge>
                      {percentage >= 100 && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                          <Award className="h-3 w-3" /> Goal reached!
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Hourly Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Hourly Traffic & Sales
              </CardTitle>
              <CardDescription>Today's activity pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={hourlyData}>
                  <defs>
                    <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                  <XAxis dataKey="hour" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="visitors" fill="url(#visitorsGradient)" stroke="#8b5cf6" strokeWidth={2} name="Visitors" />
                  <Area type="monotone" dataKey="sales" fill="url(#salesGradient)" stroke="#10b981" strokeWidth={2} name="Sales" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Products & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Top Products
                  </CardTitle>
                  <CardDescription>Best performing items this period</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl">{product.image}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate group-hover:text-primary transition-colors">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                      <p className={`text-sm flex items-center justify-end gap-1 ${product.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {product.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(product.growth)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>Latest customer purchases</CardDescription>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-sm font-semibold">{transaction.customer.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.customer}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${transaction.amount.toLocaleString()}</p>
                      <Badge className={getStatusColor(transaction.status)} variant="secondary">
                        {transaction.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Geographic Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Geographic Performance
                </CardTitle>
                <CardDescription>Sales distribution by region</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Expand
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { region: 'North America', sales: 45200, percentage: 38, flag: '🇺🇸' },
                { region: 'Europe', sales: 32100, percentage: 27, flag: '🇪🇺' },
                { region: 'Asia Pacific', sales: 28400, percentage: 24, flag: '🌏' },
                { region: 'Rest of World', sales: 13100, percentage: 11, flag: '🌍' },
              ].map((region, index) => (
                <motion.div
                  key={region.region}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all hover:shadow-lg cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl mb-2">{region.flag}</div>
                  <h4 className="font-medium text-sm">{region.region}</h4>
                  <p className="text-2xl font-bold mt-1">${(region.sales / 1000).toFixed(1)}K</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${region.percentage}%` }}
                      transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{region.percentage}% of total</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ModernAnalyticsDashboard;
