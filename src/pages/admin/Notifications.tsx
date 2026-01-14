import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Mail, MessageCircle, AlertTriangle, Check, X, Trash2, Settings, Search, Filter, Archive, MailOpen, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'order' | 'inventory' | 'user' | 'system' | 'security' | 'marketing';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1', type: 'order', title: 'New Order Received', message: 'Order #ORD-12345 from John Doe - $299.99',
      time: new Date(Date.now() - 5 * 60000).toISOString(), read: false, priority: 'high'
    },
    {
      id: '2', type: 'inventory', title: 'Low Stock Alert', message: 'Wireless Headphones: Only 3 items left in stock',
      time: new Date(Date.now() - 15 * 60000).toISOString(), read: false, priority: 'high'
    },
    {
      id: '3', type: 'user', title: 'New User Registration', message: 'Jane Smith has created an account',
      time: new Date(Date.now() - 60 * 60000).toISOString(), read: true, priority: 'low'
    },
    {
      id: '4', type: 'system', title: 'System Update Complete', message: 'The scheduled maintenance has been completed successfully',
      time: new Date(Date.now() - 2 * 60 * 60000).toISOString(), read: true, priority: 'low'
    },
    {
      id: '5', type: 'security', title: 'Suspicious Login Attempt', message: 'Failed login attempt from IP 192.168.1.55',
      time: new Date(Date.now() - 3 * 60 * 60000).toISOString(), read: false, priority: 'high'
    },
    {
      id: '6', type: 'order', title: 'Order Shipped', message: 'Order #ORD-12340 has been shipped via FedEx',
      time: new Date(Date.now() - 4 * 60 * 60000).toISOString(), read: true, priority: 'medium'
    },
    {
      id: '7', type: 'marketing', title: 'Campaign Performance', message: 'Summer Sale campaign achieved 150% of target',
      time: new Date(Date.now() - 5 * 60 * 60000).toISOString(), read: false, priority: 'medium'
    },
    {
      id: '8', type: 'inventory', title: 'Restock Complete', message: 'Premium Laptop inventory has been restocked (50 units)',
      time: new Date(Date.now() - 6 * 60 * 60000).toISOString(), read: true, priority: 'low'
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailOrders: true,
    emailInventory: true,
    emailSecurity: true,
    emailMarketing: false,
    pushOrders: true,
    pushInventory: true,
    pushSecurity: true,
    pushMarketing: false,
    desktopNotifications: true,
    soundEnabled: true,
  });

  const getIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      order: <Bell className="h-4 w-4" />,
      inventory: <AlertTriangle className="h-4 w-4" />,
      user: <MessageCircle className="h-4 w-4" />,
      system: <Settings className="h-4 w-4" />,
      security: <AlertTriangle className="h-4 w-4" />,
      marketing: <Mail className="h-4 w-4" />,
    };
    return icons[type] || <Bell className="h-4 w-4" />;
  };

  const getTypeStyles = (type: string) => {
    const styles: Record<string, string> = {
      order: 'bg-blue-500/10 text-blue-600',
      inventory: 'bg-amber-500/10 text-amber-600',
      user: 'bg-purple-500/10 text-purple-600',
      system: 'bg-gray-500/10 text-gray-600',
      security: 'bg-red-500/10 text-red-600',
      marketing: 'bg-green-500/10 text-green-600',
    };
    return styles[type] || '';
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    };
    return styles[priority] || '';
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return time.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(n => !n.read));
    toast.success('Read notifications cleared');
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || n.type === filterType;
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'unread' && !n.read) || 
        (activeTab === 'read' && n.read);
      return matchesSearch && matchesType && matchesTab;
    });
  }, [notifications, searchTerm, filterType, activeTab]);

  const stats = useMemo(() => ({
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    highPriority: notifications.filter(n => n.priority === 'high' && !n.read).length,
  }), [notifications]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <MailOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unread}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highPriority}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <MessageCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.filter(n => 
                new Date(n.time).toDateString() === new Date().toDateString()
              ).length}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <CardTitle>Recent Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={stats.unread === 0}>
                    <Check className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                  <Button variant="outline" size="sm" onClick={deleteAllRead}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Read
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread ({stats.unread})</TabsTrigger>
                    <TabsTrigger value="read">Read</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                      className={`flex items-start space-x-3 p-4 rounded-lg border transition-all hover:shadow-md ${
                        notification.read ? 'bg-muted/30' : 'bg-background border-primary/20'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${getTypeStyles(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : ''}`}>
                            {notification.title}
                          </p>
                          <Badge className={getPriorityBadge(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(notification.time)}</p>
                      </div>
                      <div className="flex-shrink-0 flex gap-1">
                        {!notification.read && (
                          <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No notifications found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'emailOrders', label: 'Order updates', desc: 'New orders, status changes, cancellations' },
                    { key: 'emailInventory', label: 'Inventory alerts', desc: 'Low stock, restock reminders' },
                    { key: 'emailSecurity', label: 'Security alerts', desc: 'Login attempts, password changes' },
                    { key: 'emailMarketing', label: 'Marketing updates', desc: 'Campaign performance, promotions' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <Label>{item.label}</Label>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={preferences[item.key as keyof typeof preferences] as boolean}
                        onCheckedChange={(checked) => {
                          setPreferences({ ...preferences, [item.key]: checked });
                          toast.success(`${item.label} ${checked ? 'enabled' : 'disabled'}`);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'pushOrders', label: 'Order updates' },
                    { key: 'pushInventory', label: 'Inventory alerts' },
                    { key: 'pushSecurity', label: 'Security alerts' },
                    { key: 'pushMarketing', label: 'Marketing updates' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between">
                      <Label>{item.label}</Label>
                      <Switch
                        checked={preferences[item.key as keyof typeof preferences] as boolean}
                        onCheckedChange={(checked) => {
                          setPreferences({ ...preferences, [item.key]: checked });
                          toast.success(`Push ${item.label} ${checked ? 'enabled' : 'disabled'}`);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">General Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Desktop notifications</Label>
                      <p className="text-xs text-muted-foreground">Show notifications in browser</p>
                    </div>
                    <Switch
                      checked={preferences.desktopNotifications}
                      onCheckedChange={(checked) => {
                        setPreferences({ ...preferences, desktopNotifications: checked });
                        toast.success(`Desktop notifications ${checked ? 'enabled' : 'disabled'}`);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notification sounds</Label>
                      <p className="text-xs text-muted-foreground">Play sound for new notifications</p>
                    </div>
                    <Switch
                      checked={preferences.soundEnabled}
                      onCheckedChange={(checked) => {
                        setPreferences({ ...preferences, soundEnabled: checked });
                        toast.success(`Notification sounds ${checked ? 'enabled' : 'disabled'}`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
