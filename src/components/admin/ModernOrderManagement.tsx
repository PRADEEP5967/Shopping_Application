import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Download, Filter, Loader as Loader2, ShoppingBag, Clock, CheckCircle, XCircle, Truck, Package, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { getAllOrders } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig: Record<string, { icon: React.ElementType; gradient: string; bgGradient: string }> = {
  delivered: { icon: CheckCircle, gradient: 'from-emerald-500 to-green-600', bgGradient: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
  shipped: { icon: Truck, gradient: 'from-blue-500 to-indigo-600', bgGradient: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
  processing: { icon: Package, gradient: 'from-amber-500 to-orange-600', bgGradient: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
  pending: { icon: Clock, gradient: 'from-gray-400 to-gray-500', bgGradient: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  cancelled: { icon: XCircle, gradient: 'from-rose-500 to-red-600', bgGradient: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 }
  })
};

export const ModernOrderManagement = () => {
  const [orders] = useState(getAllOrders());
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const itemsPerPage = 10;

  const filteredOrders = orders.filter(order =>
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!statusFilter || order.status === statusFilter)
  );

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Order Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', value: orderStats.total, gradient: 'from-violet-500 to-purple-600', bg: 'from-violet-50 to-purple-50' },
          { label: 'Pending', value: orderStats.pending, gradient: 'from-gray-400 to-gray-500', bg: 'from-gray-50 to-slate-50' },
          { label: 'Processing', value: orderStats.processing, gradient: 'from-amber-500 to-orange-600', bg: 'from-amber-50 to-orange-50' },
          { label: 'Shipped', value: orderStats.shipped, gradient: 'from-blue-500 to-indigo-600', bg: 'from-blue-50 to-indigo-50' },
          { label: 'Delivered', value: orderStats.delivered, gradient: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="cursor-pointer"
            onClick={() => setStatusFilter(stat.label === 'Total Orders' ? null : stat.label.toLowerCase())}
          >
            <Card className={`border-0 shadow-lg bg-gradient-to-br ${stat.bg} dark:from-gray-900 dark:to-gray-950 overflow-hidden relative group`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </CardContent>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Orders Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
        
        <CardHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <ShoppingBag className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Order Management
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Track and manage all customer orders
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-200 dark:border-blue-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
                  onClick={async () => {
                    setIsExporting(true);
                    try {
                      await new Promise(resolve => setTimeout(resolve, 1500));
                      toast.success('Orders exported', { description: `${filteredOrders.length} orders exported to CSV` });
                    } catch (error) {
                      toast.error('Export failed');
                    } finally {
                      setIsExporting(false);
                    }
                  }}
                  disabled={isExporting}
                >
                  {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                  Export
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400 dark:border-blue-800"
              />
            </div>
            
            {statusFilter && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 cursor-pointer" onClick={() => setStatusFilter(null)}>
                  {statusFilter} × Clear
                </Badge>
              </motion.div>
            )}
          </div>

          <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Total</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredOrders
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((order, index) => {
                      const config = statusConfig[order.status] || statusConfig.pending;
                      const StatusIcon = config.icon;
                      
                      return (
                        <motion.tr
                          key={order.id}
                          custom={index}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          className="border-b border-blue-50 dark:border-blue-900/30 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
                        >
                          <TableCell>
                            <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                              {order.id}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.shippingAddress.fullName}</div>
                              <div className="text-xs text-muted-foreground">
                                {order.shippingAddress.city}, {order.shippingAddress.state}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge className={`${config.bgGradient} flex items-center gap-1 w-fit`}>
                                <StatusIcon className="h-3 w-3" />
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-blue-200 dark:border-blue-800">
                              {order.items.length} items
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredOrders.length > itemsPerPage && (
            <div className="flex items-center justify-between py-4 mt-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong className="text-blue-600">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</strong> of <strong className="text-blue-600">{filteredOrders.length}</strong> orders
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="border-blue-200 dark:border-blue-800"
                >
                  Previous
                </Button>
                {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, i) => i + 1)
                  .filter(pageNum => pageNum === 1 || pageNum === Math.ceil(filteredOrders.length / itemsPerPage) || Math.abs(pageNum - currentPage) <= 1)
                  .map((pageNum) => (
                    <motion.div key={pageNum} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className={currentPage === pageNum 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0' 
                          : 'border-blue-200 dark:border-blue-800'
                        }
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    </motion.div>
                  ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="border-blue-200 dark:border-blue-800"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernOrderManagement;
