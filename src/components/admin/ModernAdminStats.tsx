import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Package, Users, DollarSign, ShoppingCart, AlertTriangle, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const ModernAdminStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
      tag: 'Revenue',
      tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
    },
    {
      title: 'Total Orders',
      value: '2,345',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
      tag: 'Orders',
      tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: '+5.2%',
      trend: 'up',
      icon: Package,
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
      tag: 'Inventory',
      tagColor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
    },
    {
      title: 'Active Users',
      value: '8,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
      tag: 'Users',
      tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-cyan-500 to-sky-600',
      bgGradient: 'from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30',
      tag: 'Growth',
      tagColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300'
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5 items',
      trend: 'down',
      icon: AlertTriangle,
      gradient: 'from-rose-500 to-red-600',
      bgGradient: 'from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30',
      tag: 'Alert',
      tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === 'up';
        
        return (
          <motion.div key={index} variants={cardVariants}>
            <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${stat.bgGradient} group cursor-pointer`}>
              {/* Animated background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-3xl transform rotate-12`} />
              </div>
              
              {/* Sparkle effect on hover */}
              <motion.div 
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </motion.div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <div className="flex items-center gap-2">
                  <Badge className={`${stat.tagColor} text-xs font-medium border-0 shadow-sm`}>
                    {stat.tag}
                  </Badge>
                </div>
                <motion.div 
                  className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </motion.div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <CardTitle className="text-xs font-medium text-muted-foreground mb-1">
                  {stat.title}
                </CardTitle>
                <motion.div 
                  className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="flex items-center gap-1 mt-2">
                  <motion.div 
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                      isPositive 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' 
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </motion.div>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
              
              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ModernAdminStats;
