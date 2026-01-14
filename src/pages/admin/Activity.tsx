import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Search, User, Package, ShoppingCart, Settings, Clock, AlertTriangle, CheckCircle, XCircle, RefreshCw, Download, Filter, Eye, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityItem {
  id: string;
  type: 'user_login' | 'user_logout' | 'product_created' | 'product_updated' | 'product_deleted' | 'order_placed' | 'order_updated' | 'order_cancelled' | 'settings_updated' | 'error' | 'security';
  user: string;
  action: string;
  details: string;
  timestamp: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  metadata?: Record<string, string>;
}

const ActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [isLive, setIsLive] = useState(true);

  const [activities, setActivities] = useState<ActivityItem[]>([
    { 
      id: '1', type: 'user_login', user: 'John Doe', action: 'logged in', 
      details: 'User successfully authenticated from 192.168.1.1',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      severity: 'success',
      metadata: { ip: '192.168.1.1', browser: 'Chrome 120' }
    },
    { 
      id: '2', type: 'product_created', user: 'Admin', action: 'created product', 
      details: 'Wireless Headphones added to catalog (SKU: WH-001)',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      severity: 'info',
      metadata: { productId: 'prod_123', sku: 'WH-001' }
    },
    { 
      id: '3', type: 'order_placed', user: 'Jane Smith', action: 'placed order', 
      details: 'Order #ORD-12345 - $129.99 - 3 items',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      severity: 'success',
      metadata: { orderId: 'ORD-12345', amount: '$129.99' }
    },
    { 
      id: '4', type: 'settings_updated', user: 'Admin', action: 'updated settings', 
      details: 'Store tax configuration modified',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      severity: 'info',
      metadata: { setting: 'tax_rate', oldValue: '8%', newValue: '9%' }
    },
    { 
      id: '5', type: 'order_cancelled', user: 'Mike Johnson', action: 'cancelled order', 
      details: 'Order #ORD-12340 was cancelled by customer',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      severity: 'warning',
      metadata: { orderId: 'ORD-12340', reason: 'Customer request' }
    },
    { 
      id: '6', type: 'error', user: 'System', action: 'payment failed', 
      details: 'Payment processing failed for order #ORD-12339',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      severity: 'error',
      metadata: { orderId: 'ORD-12339', errorCode: 'PAYMENT_DECLINED' }
    },
    { 
      id: '7', type: 'security', user: 'System', action: 'suspicious activity', 
      details: 'Multiple failed login attempts detected from IP 10.0.0.55',
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
      severity: 'warning',
      metadata: { ip: '10.0.0.55', attempts: '5' }
    },
    { 
      id: '8', type: 'product_updated', user: 'Sarah Admin', action: 'updated product', 
      details: 'Price updated for Premium Laptop (SKU: PL-001)',
      timestamp: new Date(Date.now() - 150 * 60000).toISOString(),
      severity: 'info',
      metadata: { productId: 'prod_456', oldPrice: '$999', newPrice: '$899' }
    },
  ]);

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randomActivities: Partial<ActivityItem>[] = [
        { type: 'user_login', user: 'New User', action: 'logged in', details: 'New user session started', severity: 'success' },
        { type: 'order_placed', user: 'Customer', action: 'placed order', details: `Order #ORD-${Math.floor(Math.random() * 10000)} placed`, severity: 'success' },
        { type: 'product_updated', user: 'Admin', action: 'updated inventory', details: 'Stock levels updated', severity: 'info' },
      ];
      
      const random = randomActivities[Math.floor(Math.random() * randomActivities.length)];
      
      if (Math.random() > 0.7) { // 30% chance to add new activity
        setActivities(prev => [{
          id: Date.now().toString(),
          ...random,
          timestamp: new Date().toISOString(),
        } as ActivityItem, ...prev.slice(0, 49)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      user_login: <User className="h-4 w-4" />,
      user_logout: <User className="h-4 w-4" />,
      product_created: <Package className="h-4 w-4" />,
      product_updated: <Package className="h-4 w-4" />,
      product_deleted: <Package className="h-4 w-4" />,
      order_placed: <ShoppingCart className="h-4 w-4" />,
      order_updated: <ShoppingCart className="h-4 w-4" />,
      order_cancelled: <XCircle className="h-4 w-4" />,
      settings_updated: <Settings className="h-4 w-4" />,
      error: <AlertTriangle className="h-4 w-4" />,
      security: <AlertTriangle className="h-4 w-4" />,
    };
    return icons[type] || <Activity className="h-4 w-4" />;
  };

  const getSeverityStyles = (severity: string) => {
    const styles: Record<string, { bg: string; text: string; icon: string }> = {
      info: { bg: 'bg-blue-500/10', text: 'text-blue-600', icon: 'text-blue-600' },
      success: { bg: 'bg-green-500/10', text: 'text-green-600', icon: 'text-green-600' },
      warning: { bg: 'bg-amber-500/10', text: 'text-amber-600', icon: 'text-amber-600' },
      error: { bg: 'bg-red-500/10', text: 'text-red-600', icon: 'text-red-600' },
    };
    return styles[severity] || styles.info;
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return activityTime.toLocaleDateString();
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = 
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || activity.type === filterType;
      const matchesSeverity = filterSeverity === 'all' || activity.severity === filterSeverity;
      return matchesSearch && matchesType && matchesSeverity;
    });
  }, [activities, searchTerm, filterType, filterSeverity]);

  const stats = useMemo(() => ({
    total: activities.length,
    today: activities.filter(a => new Date(a.timestamp).toDateString() === new Date().toDateString()).length,
    errors: activities.filter(a => a.severity === 'error').length,
    warnings: activities.filter(a => a.severity === 'warning').length,
  }), [activities]);

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'User', 'Action', 'Details', 'Severity', 'Type'].join(','),
      ...activities.map(a => [
        new Date(a.timestamp).toISOString(),
        a.user,
        a.action,
        `"${a.details}"`,
        a.severity,
        a.type
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterSeverity('all');
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All logged activities</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-xs text-muted-foreground">Events today</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.warnings}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Errors</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.errors}</div>
              <p className="text-xs text-muted-foreground">Critical issues</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activity Log
                {isLive && (
                  <Badge variant="outline" className="ml-2 animate-pulse bg-green-500/10 text-green-600 border-green-500/30">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-ping" />
                    Live
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Monitor all system activities and user actions
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLive ? 'animate-spin' : ''}`} />
                {isLive ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="outline" size="sm" onClick={exportLogs}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="user_login">User Login</SelectItem>
                <SelectItem value="order_placed">Order Placed</SelectItem>
                <SelectItem value="product_created">Product Created</SelectItem>
                <SelectItem value="product_updated">Product Updated</SelectItem>
                <SelectItem value="settings_updated">Settings</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || filterType !== 'all' || filterSeverity !== 'all') && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <XCircle className="h-4 w-4 mr-1" /> Clear
              </Button>
            )}
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity) => {
                const styles = getSeverityStyles(activity.severity);
                return (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                    className={`flex items-start space-x-4 p-4 border rounded-lg hover:shadow-md transition-all ${styles.bg}`}
                  >
                    <div className={`p-2 rounded-full bg-background ${styles.icon}`}>
                      {getIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {getTimeAgo(activity.timestamp)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {activity.type.replace(/_/g, ' ').toUpperCase()}
                        </Badge>
                        <Badge className={`text-xs ${styles.text} bg-transparent border`}>
                          {activity.severity}
                        </Badge>
                        {activity.metadata && Object.entries(activity.metadata).slice(0, 2).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No activities found matching your filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLog;
