import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { Gauge, Activity, Users, ShoppingCart, TrendingUp, RefreshCw, Pause, Play, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LiveDataPoint {
  time: string;
  users: number;
  sales: number;
  orders: number;
}

interface RecentEvent {
  id: string;
  type: 'order' | 'signup' | 'pageview' | 'cart';
  message: string;
  time: string;
}

const RealTimeAnalysis: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [liveData, setLiveData] = useState<LiveDataPoint[]>([]);
  const [metrics, setMetrics] = useState({
    onlineUsers: 162,
    liveSales: 5200,
    conversionRate: 3.8,
    ordersPerMinute: 2.4
  });
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);

  // Initialize data
  useEffect(() => {
    const initialData: LiveDataPoint[] = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 10000);
      initialData.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        users: 120 + Math.floor(Math.random() * 50),
        sales: 4000 + Math.floor(Math.random() * 1500),
        orders: Math.floor(Math.random() * 5)
      });
    }
    setLiveData(initialData);

    setRecentEvents([
      { id: '1', type: 'order', message: 'New order #12847 - $125.00', time: '10s ago' },
      { id: '2', type: 'signup', message: 'New user registered', time: '25s ago' },
      { id: '3', type: 'cart', message: 'Item added to cart - Wireless Headphones', time: '45s ago' }
    ]);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const newPoint: LiveDataPoint = {
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        users: metrics.onlineUsers + Math.floor(Math.random() * 10) - 5,
        sales: metrics.liveSales + Math.floor(Math.random() * 200),
        orders: Math.floor(Math.random() * 5)
      };

      setLiveData(prev => [...prev.slice(-11), newPoint]);
      
      setMetrics(prev => ({
        onlineUsers: Math.max(100, prev.onlineUsers + Math.floor(Math.random() * 10) - 5),
        liveSales: prev.liveSales + Math.floor(Math.random() * 150),
        conversionRate: Math.round((prev.conversionRate + (Math.random() * 0.2 - 0.1)) * 10) / 10,
        ordersPerMinute: Math.round((prev.ordersPerMinute + (Math.random() * 0.4 - 0.2)) * 10) / 10
      }));

      // Random new event
      if (Math.random() > 0.5) {
        const eventTypes: RecentEvent['type'][] = ['order', 'signup', 'pageview', 'cart'];
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const messages = {
          order: `New order #${10000 + Math.floor(Math.random() * 10000)} - $${(50 + Math.random() * 200).toFixed(2)}`,
          signup: 'New user registered',
          pageview: 'Product page viewed - ' + ['Laptop', 'Headphones', 'Camera', 'Phone'][Math.floor(Math.random() * 4)],
          cart: 'Item added to cart - ' + ['Electronics', 'Clothing', 'Books', 'Sports'][Math.floor(Math.random() * 4)]
        };

        const newEvent: RecentEvent = {
          id: Date.now().toString(),
          type: eventType,
          message: messages[eventType],
          time: 'Just now'
        };

        setRecentEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, metrics]);

  const getEventIcon = (type: RecentEvent['type']) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4 text-green-500" />;
      case 'signup': return <Users className="h-4 w-4 text-blue-500" />;
      case 'pageview': return <Activity className="h-4 w-4 text-purple-500" />;
      case 'cart': return <ShoppingCart className="h-4 w-4 text-orange-500" />;
    }
  };

  const getEventColor = (type: RecentEvent['type']) => {
    switch (type) {
      case 'order': return 'border-green-500/20 bg-green-500/5';
      case 'signup': return 'border-blue-500/20 bg-blue-500/5';
      case 'pageview': return 'border-purple-500/20 bg-purple-500/5';
      case 'cart': return 'border-orange-500/20 bg-orange-500/5';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPaused ? 'bg-yellow-400' : 'bg-green-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isPaused ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
            </span>
          </div>
          <span className="text-sm font-medium">
            {isPaused ? 'Updates Paused' : 'Live Updates Active'}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? (
            <>
              <Play className="h-4 w-4 mr-2" />
              Resume
            </>
          ) : (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          )}
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Online Users</p>
                  <motion.p 
                    key={metrics.onlineUsers}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    {metrics.onlineUsers}
                  </motion.p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8 in last 10 min
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full" />
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Activity className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Live Sales</p>
                  <motion.p 
                    key={metrics.liveSales}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    ${metrics.liveSales.toLocaleString()}
                  </motion.p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                +14% vs average
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Gauge className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <motion.p 
                    key={metrics.conversionRate}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    {metrics.conversionRate}%
                  </motion.p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-yellow-500">
                <Zap className="h-3 w-3 mr-1" />
                Above target
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <ShoppingCart className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orders/Min</p>
                  <motion.p 
                    key={metrics.ordersPerMinute}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold"
                  >
                    {metrics.ordersPerMinute}
                  </motion.p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                Peak hour
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Live User Activity
            </CardTitle>
            <CardDescription>Real-time connected users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={liveData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fill="url(#userGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Live Sales Updates
            </CardTitle>
            <CardDescription>Revenue in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={liveData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                />
                <Bar dataKey="sales" fill="url(#salesGradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Live Activity Feed
          </CardTitle>
          <CardDescription>Real-time events happening now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {recentEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getEventColor(event.type)}`}
                >
                  <div className="flex items-center gap-3">
                    {getEventIcon(event.type)}
                    <span className="text-sm">{event.message}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.time}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeAnalysis;
