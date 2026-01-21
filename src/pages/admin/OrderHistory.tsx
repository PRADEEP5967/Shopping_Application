import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  Filter, 
  Calendar, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Eye,
  MoreVertical,
  RefreshCw,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface HistoricalOrder {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'completed' | 'cancelled' | 'refunded' | 'delivered';
  items: number;
  paymentMethod: string;
}

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [orders] = useState<HistoricalOrder[]>([
    { id: '1', orderNumber: 'ORD-2024-001', customer: 'John Doe', email: 'john@example.com', date: '2024-01-15', total: 299.99, status: 'completed', items: 3, paymentMethod: 'Credit Card' },
    { id: '2', orderNumber: 'ORD-2024-002', customer: 'Jane Smith', email: 'jane@example.com', date: '2024-01-14', total: 549.00, status: 'delivered', items: 2, paymentMethod: 'PayPal' },
    { id: '3', orderNumber: 'ORD-2024-003', customer: 'Bob Wilson', email: 'bob@example.com', date: '2024-01-13', total: 129.99, status: 'cancelled', items: 1, paymentMethod: 'Credit Card' },
    { id: '4', orderNumber: 'ORD-2024-004', customer: 'Alice Brown', email: 'alice@example.com', date: '2024-01-12', total: 899.00, status: 'refunded', items: 4, paymentMethod: 'Debit Card' },
    { id: '5', orderNumber: 'ORD-2024-005', customer: 'Charlie Davis', email: 'charlie@example.com', date: '2024-01-11', total: 199.50, status: 'completed', items: 2, paymentMethod: 'Credit Card' },
    { id: '6', orderNumber: 'ORD-2024-006', customer: 'Diana Evans', email: 'diana@example.com', date: '2024-01-10', total: 459.99, status: 'delivered', items: 3, paymentMethod: 'PayPal' },
    { id: '7', orderNumber: 'ORD-2024-007', customer: 'Edward Fox', email: 'edward@example.com', date: '2024-01-09', total: 79.99, status: 'completed', items: 1, paymentMethod: 'Credit Card' },
    { id: '8', orderNumber: 'ORD-2024-008', customer: 'Fiona Grant', email: 'fiona@example.com', date: '2024-01-08', total: 1299.00, status: 'delivered', items: 5, paymentMethod: 'Credit Card' },
  ]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const stats = useMemo(() => ({
    totalOrders: orders.length,
    completedOrders: orders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
    cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled' && o.status !== 'refunded').reduce((sum, o) => sum + o.total, 0)
  }), [orders]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast.success('Order history refreshed');
  };

  const handleExport = () => {
    const csvContent = [
      ['Order Number', 'Customer', 'Email', 'Date', 'Total', 'Status', 'Items', 'Payment Method'].join(','),
      ...filteredOrders.map(order => 
        [order.orderNumber, order.customer, order.email, order.date, order.total, order.status, order.items, order.paymentMethod].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'order-history.csv';
    a.click();
    toast.success('Order history exported');
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: React.ElementType; className: string; label: string }> = {
      completed: { icon: CheckCircle, className: 'bg-emerald-100 text-emerald-700', label: 'Completed' },
      delivered: { icon: Truck, className: 'bg-blue-100 text-blue-700', label: 'Delivered' },
      cancelled: { icon: XCircle, className: 'bg-red-100 text-red-700', label: 'Cancelled' },
      refunded: { icon: AlertCircle, className: 'bg-amber-100 text-amber-700', label: 'Refunded' },
    };
    const { icon: Icon, className, label } = config[status] || config.completed;
    return (
      <Badge className={`${className} gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'from-violet-500 to-purple-600' },
          { title: 'Completed', value: stats.completedOrders, icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
          { title: 'Cancelled', value: stats.cancelledOrders, icon: XCircle, color: 'from-red-500 to-rose-500' },
          { title: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-violet-500/10 to-purple-500/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-600" />
              Order History
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info(`Viewing order ${order.orderNumber}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success(`Invoice for ${order.orderNumber} downloaded`)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No orders found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderHistory;
