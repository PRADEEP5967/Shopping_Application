import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { ChartPie, TrendingUp, TrendingDown, Download, RefreshCw, Lightbulb, Target, DollarSign, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Calendar, Filter, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface InsightItem {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

const Insights: React.FC = () => {
  const [timeRange, setTimeRange] = useState('quarter');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('profit');

  const [insightsTrends, setInsightsTrends] = useState([
    { period: "Q1", profit: 22000, revenue: 45000, orders: 320, customers: 89 },
    { period: "Q2", profit: 25800, revenue: 52000, orders: 385, customers: 112 },
    { period: "Q3", profit: 19700, revenue: 41000, orders: 298, customers: 78 },
    { period: "Q4", profit: 28500, revenue: 58000, orders: 425, customers: 134 },
  ]);

  const [monthlyTrends, setMonthlyTrends] = useState([
    { month: "Jan", profit: 7200, revenue: 15000 },
    { month: "Feb", profit: 7400, revenue: 15800 },
    { month: "Mar", profit: 7400, revenue: 14200 },
    { month: "Apr", profit: 8200, revenue: 17500 },
    { month: "May", profit: 8800, revenue: 18200 },
    { month: "Jun", profit: 8800, revenue: 16300 },
    { month: "Jul", profit: 6400, revenue: 13800 },
    { month: "Aug", profit: 6500, revenue: 13600 },
    { month: "Sep", profit: 6800, revenue: 13600 },
    { month: "Oct", profit: 9200, revenue: 19200 },
    { month: "Nov", profit: 9500, revenue: 19500 },
    { month: "Dec", profit: 9800, revenue: 19300 },
  ]);

  const [sourceData, setSourceData] = useState([
    { name: "Direct", value: 46, color: "#6366f1", visitors: 4600 },
    { name: "Social", value: 32, color: "#22c55e", visitors: 3200 },
    { name: "Referral", value: 15, color: "#f59e0b", visitors: 1500 },
    { name: "Ads", value: 7, color: "#ef4444", visitors: 700 },
  ]);

  const [insights, setInsights] = useState<InsightItem[]>([
    {
      id: '1',
      type: 'positive',
      title: 'Q4 shows strong profit growth',
      description: 'Q4 profit increased by 44.7% compared to Q3, driven by holiday season sales.',
      impact: '+$8,800 profit',
      priority: 'high',
      actionable: true
    },
    {
      id: '2',
      type: 'positive',
      title: 'Direct traffic is your top converter',
      description: 'Direct traffic accounts for 46% of visitors with highest conversion rate of 4.2%.',
      impact: '+12% conversions',
      priority: 'high',
      actionable: true
    },
    {
      id: '3',
      type: 'negative',
      title: 'Ad spend ROI below target',
      description: 'Paid advertising contributes only 7% of traffic but consumes 25% of marketing budget.',
      impact: '-18% ROI',
      priority: 'medium',
      actionable: true
    },
    {
      id: '4',
      type: 'neutral',
      title: 'Q3 seasonal dip identified',
      description: 'Historical pattern shows Q3 consistently underperforms. Consider summer promotions.',
      impact: 'Opportunity',
      priority: 'low',
      actionable: true
    },
    {
      id: '5',
      type: 'positive',
      title: 'Customer retention improving',
      description: 'Returning customer rate increased from 32% to 41% over the last quarter.',
      impact: '+28% retention',
      priority: 'medium',
      actionable: false
    }
  ]);

  const kpis = [
    { 
      label: 'Total Revenue', 
      value: '$196,000', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign
    },
    { 
      label: 'Total Profit', 
      value: '$96,000', 
      change: '+8.3%', 
      trend: 'up',
      icon: TrendingUp
    },
    { 
      label: 'Total Orders', 
      value: '1,428', 
      change: '+15.2%', 
      trend: 'up',
      icon: ShoppingCart
    },
    { 
      label: 'New Customers', 
      value: '413', 
      change: '-2.1%', 
      trend: 'down',
      icon: Users
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate data refresh with slight variations
    setInsightsTrends(prev => prev.map(item => ({
      ...item,
      profit: item.profit + Math.floor(Math.random() * 1000 - 500),
      revenue: item.revenue + Math.floor(Math.random() * 2000 - 1000),
    })));
    
    setIsRefreshing(false);
    toast.success('Insights refreshed with latest data');
  };

  const handleExport = () => {
    const data = {
      timeRange,
      kpis,
      quarterlyTrends: insightsTrends,
      trafficSources: sourceData,
      insights: insights.map(i => ({ title: i.title, description: i.description, impact: i.impact }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `insights-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported successfully');
  };

  const handleDismissInsight = (id: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
    toast.success('Insight dismissed');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ChartPie className="w-6 h-6 text-primary" />
            Business Insights
          </h2>
          <p className="text-muted-foreground">AI-powered analytics and recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                    <div className={`flex items-center gap-1 mt-1 text-sm ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${
                    kpi.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <kpi.icon className={`w-5 h-5 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Quarterly Performance</CardTitle>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit">Profit</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={insightsTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => selectedMetric === 'orders' ? value : `$${value.toLocaleString()}`}
                />
                <Bar 
                  dataKey={selectedMetric} 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sourceData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span>{source.name}</span>
                  <span className="text-muted-foreground ml-auto">{source.visitors.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Revenue & Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#22c55e" 
                fill="url(#profitGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              AI-Powered Insights
            </CardTitle>
            <Badge variant="secondary">{insights.length} insights</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="mt-1">{getTypeIcon(insight.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-sm font-medium ${
                      insight.type === 'positive' ? 'text-green-600' : 
                      insight.type === 'negative' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {insight.impact}
                    </span>
                    {insight.actionable && (
                      <Button variant="ghost" size="sm" className="h-7">
                        Take Action <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDismissInsight(insight.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dismiss
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;