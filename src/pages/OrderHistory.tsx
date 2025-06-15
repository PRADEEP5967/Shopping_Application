import React from 'react';
import Header from '@/components/Header';
import CartFlyout from '@/components/CartFlyout';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  Download,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isAdmin) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Mock order data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: new Date('2024-01-15'),
      status: 'delivered',
      total: 129.99,
      items: 3,
      trackingNumber: 'TRK-789456123',
      estimatedDelivery: new Date('2024-01-20'),
      items_detail: [
        { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
        { name: 'Phone Case', quantity: 2, price: 25.00 }
      ]
    },
    {
      id: 'ORD-2024-002',
      date: new Date('2024-01-20'),
      status: 'shipped',
      total: 89.50,
      items: 2,
      trackingNumber: 'TRK-456789012',
      estimatedDelivery: new Date('2024-01-25'),
      items_detail: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 59.99 },
        { name: 'USB Cable', quantity: 1, price: 29.51 }
      ]
    },
    {
      id: 'ORD-2024-003',
      date: new Date('2024-01-22'),
      status: 'processing',
      total: 199.99,
      items: 1,
      trackingNumber: null,
      estimatedDelivery: new Date('2024-01-28'),
      items_detail: [
        { name: 'Smart Watch', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: 'ORD-2024-004',
      date: new Date('2024-01-10'),
      status: 'cancelled',
      total: 45.00,
      items: 1,
      trackingNumber: null,
      estimatedDelivery: null,
      items_detail: [
        { name: 'Wireless Mouse', quantity: 1, price: 45.00 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items_detail.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = order.date >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = order.date >= monthAgo;
    } else if (dateFilter === 'year') {
      const yearAgo = new Date();
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      matchesDate = order.date >= yearAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Order History</h1>
            <p className="text-gray-600">Track and manage all your orders</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search orders by ID or product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm bg-white min-w-[120px]"
                  >
                    <option value="all">All Status</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <select 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm bg-white min-w-[120px]"
                  >
                    <option value="all">All Time</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {order.date.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {order.items} {order.items === 1 ? 'item' : 'items'}
                          </div>
                          <div className="font-semibold text-gray-900">
                            Total: ${order.total.toFixed(2)}
                          </div>
                          {order.trackingNumber && (
                            <div className="flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              {order.trackingNumber}
                            </div>
                          )}
                        </div>

                        {/* Items Preview */}
                        <div className="mt-3">
                          <div className="text-sm text-gray-600">
                            {order.items_detail.map((item, index) => (
                              <span key={index}>
                                {item.name} {item.quantity > 1 && `(${item.quantity}x)`}
                                {index < order.items_detail.length - 1 && ', '}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        {order.estimatedDelivery && order.status !== 'cancelled' && (
                          <div className="mt-2 text-sm text-gray-600">
                            {order.status === 'delivered' ? 'Delivered on' : 'Estimated delivery'}: {' '}
                            <span className="font-medium">
                              {order.estimatedDelivery.toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link to={`/order-detail/${order.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-1 w-full sm:w-auto">
                            <Eye className="h-3 w-3" />
                            View Details
                          </Button>
                        </Link>
                        
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm" className="flex items-center gap-1 w-full sm:w-auto">
                            <Download className="h-3 w-3" />
                            Invoice
                          </Button>
                        )}
                        
                        {order.trackingNumber && order.status === 'shipped' && (
                          <Button size="sm" className="flex items-center gap-1 w-full sm:w-auto">
                            <Truck className="h-3 w-3" />
                            Track
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : "You haven't placed any orders yet"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('all');
                          setDateFilter('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                    <Link to="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Stats */}
          {filteredOrders.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredOrders.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {filteredOrders.reduce((sum, order) => sum + order.items, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Items Ordered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      ${(filteredOrders.reduce((sum, order) => sum + order.total, 0) / filteredOrders.length || 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Average Order</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
