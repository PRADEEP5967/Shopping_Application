import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { Users, Info, Download, Search, Filter, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, Globe, ArrowUpRight, ArrowDownRight, UserPlus, UserMinus, RefreshCw, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface CustomerData {
  id: string;
  name: string;
  email: string;
  segment: 'new' | 'returning' | 'vip';
  country: string;
  totalSpent: number;
  orders: number;
  lastPurchase: string;
  ltv: number;
}

const CustomerReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('30days');

  const [segmentsData] = useState([
    { name: "Returning", value: 58, color: "#6366f1", count: 94 },
    { name: "New", value: 34, color: "#22c55e", count: 55 },
    { name: "VIP", value: 8, color: "#f59e0b", count: 13 },
  ]);

  const [countriesData] = useState([
    { country: "USA", users: 120, revenue: 45000, flag: "🇺🇸" },
    { country: "UK", users: 32, revenue: 12500, flag: "🇬🇧" },
    { country: "Canada", users: 18, revenue: 7200, flag: "🇨🇦" },
    { country: "Germany", users: 15, revenue: 6100, flag: "🇩🇪" },
    { country: "Australia", users: 12, revenue: 4800, flag: "🇦🇺" },
    { country: "Others", users: 11, revenue: 4200, flag: "🌍" },
  ]);

  const [customers] = useState<CustomerData[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', segment: 'vip', country: 'USA', totalSpent: 8500, orders: 24, lastPurchase: '2024-01-18', ltv: 12500 },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', segment: 'returning', country: 'UK', totalSpent: 2300, orders: 8, lastPurchase: '2024-01-15', ltv: 4200 },
    { id: '3', name: 'Mike Wilson', email: 'mike@example.com', segment: 'new', country: 'Canada', totalSpent: 450, orders: 2, lastPurchase: '2024-01-19', ltv: 890 },
    { id: '4', name: 'Emily Brown', email: 'emily@example.com', segment: 'returning', country: 'USA', totalSpent: 3100, orders: 12, lastPurchase: '2024-01-17', ltv: 5600 },
    { id: '5', name: 'David Lee', email: 'david@example.com', segment: 'vip', country: 'Germany', totalSpent: 12400, orders: 35, lastPurchase: '2024-01-20', ltv: 18500 },
    { id: '6', name: 'Lisa Chen', email: 'lisa@example.com', segment: 'new', country: 'Australia', totalSpent: 280, orders: 1, lastPurchase: '2024-01-19', ltv: 450 },
  ]);

  const [retentionData] = useState([
    { month: 'Jan', retained: 85, churned: 15 },
    { month: 'Feb', retained: 82, churned: 18 },
    { month: 'Mar', retained: 88, churned: 12 },
    { month: 'Apr', retained: 86, churned: 14 },
    { month: 'May', retained: 90, churned: 10 },
    { month: 'Jun', retained: 87, churned: 13 },
  ]);

  const [cohortData] = useState([
    { cohort: 'Week 1', week1: 100, week2: 65, week3: 48, week4: 42 },
    { cohort: 'Week 2', week1: 100, week2: 72, week3: 55, week4: 45 },
    { cohort: 'Week 3', week1: 100, week2: 68, week3: 52, week4: 40 },
    { cohort: 'Week 4', week1: 100, week2: 70, week3: 58, week4: 48 },
  ]);

  const kpis = [
    { label: 'Total Customers', value: '162', change: '+14.8%', trend: 'up', icon: Users },
    { label: 'New This Week', value: '24', change: '+8.2%', trend: 'up', icon: UserPlus },
    { label: 'Avg. LTV', value: '$2,450', change: '+12.3%', trend: 'up', icon: DollarSign },
    { label: 'Churn Rate', value: '4.2%', change: '-1.1%', trend: 'down', icon: UserMinus },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter;
    const matchesCountry = countryFilter === 'all' || customer.country === countryFilter;
    return matchesSearch && matchesSegment && matchesCountry;
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast.success('Customer data refreshed');
  };

  const handleExport = (format: 'csv' | 'json') => {
    const data = format === 'json' 
      ? JSON.stringify({ customers: filteredCustomers, segments: segmentsData, countries: countriesData }, null, 2)
      : filteredCustomers.map(c => `${c.name},${c.email},${c.segment},${c.country},${c.totalSpent},${c.orders}`).join('\n');
    
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer-report.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Report exported as ${format.toUpperCase()}`);
  };

  const getSegmentBadge = (segment: string) => {
    switch (segment) {
      case 'vip': return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">VIP</Badge>;
      case 'returning': return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Returning</Badge>;
      case 'new': return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">New</Badge>;
      default: return <Badge>{segment}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Customer Reports
          </h2>
          <p className="text-muted-foreground">Comprehensive customer analytics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => handleExport('csv')}>
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
                      (kpi.trend === 'up' && !kpi.label.includes('Churn')) || (kpi.trend === 'down' && kpi.label.includes('Churn'))
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <kpi.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="customers">Customer List</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={segmentsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {segmentsData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {segmentsData.map((segment) => (
                    <div key={segment.name} className="text-center p-3 rounded-lg bg-accent/50">
                      <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: segment.color }} />
                      <p className="text-sm font-medium">{segment.name}</p>
                      <p className="text-2xl font-bold">{segment.count}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Countries by Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={countriesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="country" type="category" width={60} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-medium text-green-800 dark:text-green-400">Returning customers have 3x higher LTV</h4>
                  <p className="text-sm text-green-600 dark:text-green-500 mt-1">Focus retention campaigns on new customers</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <DollarSign className="w-5 h-5 text-yellow-600 mb-2" />
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-400">VIP users avg cart: $7,200</h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">Consider exclusive VIP promotions</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <Globe className="w-5 h-5 text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800 dark:text-blue-400">USA leads with steady growth</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-500 mt-1">Expand marketing in UK and Canada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {segmentsData.map((segment) => (
              <Card key={segment.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{segment.name} Customers</h3>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Percentage</span>
                        <span className="font-medium">{segment.value}%</span>
                      </div>
                      <Progress value={segment.value} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Count</p>
                        <p className="text-xl font-bold">{segment.count}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. LTV</p>
                        <p className="text-xl font-bold">
                          ${segment.name === 'VIP' ? '12,400' : segment.name === 'Returning' ? '3,200' : '450'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Distribution by Country</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg. Order Value</TableHead>
                    <TableHead>Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countriesData.map((country) => (
                    <TableRow key={country.country}>
                      <TableCell className="font-medium">
                        <span className="mr-2">{country.flag}</span>
                        {country.country}
                      </TableCell>
                      <TableCell>{country.users}</TableCell>
                      <TableCell>${country.revenue.toLocaleString()}</TableCell>
                      <TableCell>${Math.round(country.revenue / country.users)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(country.users / 162) * 100} className="w-20 h-2" />
                          <span className="text-sm">{Math.round((country.users / 162) * 100)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="retained" name="Retained" fill="#22c55e" stackId="a" />
                    <Bar dataKey="churned" name="Churned" fill="#ef4444" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cohort Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cohortData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="cohort" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="week1" name="Week 1" stroke="#6366f1" strokeWidth={2} />
                    <Line type="monotone" dataKey="week2" name="Week 2" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="week3" name="Week 3" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="week4" name="Week 4" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="returning">Returning</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[150px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>LTV</TableHead>
                    <TableHead>Last Purchase</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getSegmentBadge(customer.segment)}</TableCell>
                      <TableCell>{customer.country}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell className="font-medium text-green-600">${customer.ltv.toLocaleString()}</TableCell>
                      <TableCell>{new Date(customer.lastPurchase).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerReports;