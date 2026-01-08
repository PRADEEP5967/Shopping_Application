
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, PieChart as PieChartIcon, BarChart3, Clock, Zap } from 'lucide-react';
import SalesReporting from '@/components/admin/SalesReporting';
import ModernAnalyticsDashboard from '@/components/admin/ModernAnalyticsDashboard';

const salesData = [
  { month: 'Jan', sales: 4000, orders: 240, profit: 1200 },
  { month: 'Feb', sales: 3000, orders: 139, profit: 900 },
  { month: 'Mar', sales: 2000, orders: 980, profit: 600 },
  { month: 'Apr', sales: 2780, orders: 390, profit: 834 },
  { month: 'May', sales: 1890, orders: 480, profit: 567 },
  { month: 'Jun', sales: 2390, orders: 380, profit: 717 },
];

const categoryData = [
  { name: 'Electronics', value: 400, color: '#8b5cf6' },
  { name: 'Clothing', value: 300, color: '#06b6d4' },
  { name: 'Books', value: 200, color: '#10b981' },
  { name: 'Home & Garden', value: 100, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-xl p-3">
        <p className="font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsDashboard = () => {
  const [activeView, setActiveView] = useState('modern');

  return (
    <div className="space-y-6">
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="modern" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Modern View
          </TabsTrigger>
          <TabsTrigger value="classic" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Classic View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modern" className="mt-0">
          <ModernAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="classic" className="mt-0 space-y-6">
          {/* Classic Analytics View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Sales Overview
                  </CardTitle>
                  <CardDescription>Monthly sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <defs>
                        <linearGradient id="salesBarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sales" fill="url(#salesBarGradient)" radius={[4, 4, 0, 0]} name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Order Trends
                  </CardTitle>
                  <CardDescription>Monthly order volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="ordersAreaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fill="url(#ordersAreaGradient)" 
                        name="Orders"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                    Sales by Category
                  </CardTitle>
                  <CardDescription>Revenue distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={5}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-md" />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { color: 'bg-emerald-500', time: '2 minutes ago', text: 'New order #ORD-001 received', icon: '🛍️' },
                      { color: 'bg-blue-500', time: '5 minutes ago', text: 'Product "Wireless Headphones" updated', icon: '📦' },
                      { color: 'bg-amber-500', time: '10 minutes ago', text: 'Low stock alert for "Gaming Mouse"', icon: '⚠️' },
                      { color: 'bg-violet-500', time: '15 minutes ago', text: 'New user registration', icon: '👤' },
                      { color: 'bg-rose-500', time: '20 minutes ago', text: 'Payment received for order #ORD-098', icon: '💳' },
                    ].map((activity, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <span className="text-xl">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.text}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {activity.time}
                          </p>
                        </div>
                        <div className={`w-2 h-2 ${activity.color} rounded-full animate-pulse`}></div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sales Reporting */}
          <SalesReporting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
