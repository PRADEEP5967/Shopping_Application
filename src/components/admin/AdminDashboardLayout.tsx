import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminNavbar } from './AdminNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart,
  Settings,
  BarChart3,
  Bell,
  Inbox,
  Tag,
  Files,
  HelpCircle,
  Percent,
  History,
  Activity,
  Clock,
  Menu,
  X,
  Gauge,
  ChartPie,
  Shield,
  ShieldCheck,
  KeySquare,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

// Modern sidebar menu item component with animations
interface ModernMenuItemProps {
  path: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  gradient?: string;
  badge?: string;
  badgeColor?: string;
}

const ModernMenuItem: React.FC<ModernMenuItemProps> = ({ 
  path, 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  gradient = "from-violet-500 to-purple-600",
  badge,
  badgeColor = "bg-emerald-500"
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative group",
        isActive 
          ? `bg-gradient-to-r ${gradient} text-white shadow-lg shadow-violet-500/25`
          : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
      )}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      initial={false}
      animate={isActive ? { scale: 1 } : { scale: 1 }}
    >
      {/* Active indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: -12 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Icon with glow effect */}
      <div className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
        isActive 
          ? "bg-white/20" 
          : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-violet-100 group-hover:to-purple-100"
      )}>
        <Icon className={cn(
          "h-4 w-4 transition-all duration-300",
          isActive ? "text-white" : "text-gray-500 group-hover:text-violet-600"
        )} />
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-white/30"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
        )}
      </div>
      
      <span className="truncate flex-1 text-left">{label}</span>
      
      {/* Badge */}
      {badge && (
        <Badge className={cn(
          "h-5 px-1.5 text-xs font-semibold",
          badgeColor,
          isActive ? "bg-white/20 text-white" : ""
        )}>
          {badge}
        </Badge>
      )}
      
      {/* Hover arrow */}
      <motion.div
        className={cn(
          "opacity-0 group-hover:opacity-100 transition-opacity",
          isActive ? "text-white/70" : "text-violet-500"
        )}
        initial={{ x: -5 }}
        animate={{ x: 0 }}
      >
        <TrendingUp className="h-3 w-3" />
      </motion.div>
    </motion.button>
  );
};

// Section header component
const SectionHeader: React.FC<{ title: string; icon?: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 px-3 mb-2 mt-4">
    {Icon && (
      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <Icon className="h-3 w-3 text-gray-500" />
      </div>
    )}
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
  </div>
);

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ 
  children, 
  title,
  subtitle
}) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', gradient: 'from-violet-500 to-purple-600' },
    { path: '/admin/products', icon: Package, label: 'Products', gradient: 'from-blue-500 to-cyan-500', badge: '124' },
    { path: '/admin/inventory', icon: Inbox, label: 'Inventory', gradient: 'from-amber-500 to-orange-500' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders', gradient: 'from-emerald-500 to-teal-500', badge: '8', badgeColor: 'bg-rose-500' },
    { path: '/admin/customers', icon: Users, label: 'Customers', gradient: 'from-pink-500 to-rose-500' },
  ];

  const contentMenuItems = [
    { path: '/admin/categories', icon: Grid, label: 'Categories', gradient: 'from-indigo-500 to-blue-500' },
    { path: '/admin/discounts', icon: Percent, label: 'Discounts', gradient: 'from-rose-500 to-pink-500', badge: '3' },
    { path: '/admin/pages', icon: Files, label: 'Pages', gradient: 'from-cyan-500 to-teal-500' },
  ];

  const modernAnalyticsMenuItems = [
    { path: '/admin/real-time-analysis', icon: Gauge, label: 'Real-Time Analysis', gradient: 'from-violet-600 to-indigo-600' },
    { path: '/admin/customer-reports', icon: Users, label: 'Customer Reports', gradient: 'from-blue-600 to-violet-600' },
    { path: '/admin/insights', icon: ChartPie, label: 'Insights', gradient: 'from-emerald-600 to-cyan-600' },
  ];

  const analyticsMenuItems = [
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', gradient: 'from-purple-500 to-violet-600' },
    { path: '/admin/activity', icon: Activity, label: 'Activity Log', gradient: 'from-orange-500 to-amber-500' },
    { path: '/admin/order-history', icon: History, label: 'Order History', gradient: 'from-teal-500 to-emerald-500' },
    { path: '/admin/ab-testing', icon: BarChart3, label: 'A/B Testing', gradient: 'from-pink-500 to-rose-500' },
  ];

  const systemMenuItems = [
    { path: '/admin/notifications', icon: Bell, label: 'Notifications', gradient: 'from-amber-500 to-yellow-500', badge: '5', badgeColor: 'bg-red-500' },
    { path: '/admin/settings', icon: Settings, label: 'Settings', gradient: 'from-gray-500 to-slate-600' },
    { path: '/admin/help', icon: HelpCircle, label: 'Help', gradient: 'from-sky-500 to-blue-500' },
  ];

  const complianceMenuItems = [
    { path: "/admin/ssl-encryption", icon: ShieldCheck, label: "SSL Encryption", gradient: 'from-green-500 to-emerald-600' },
    { path: "/admin/pci-compliance", icon: Shield, label: "PCI Compliance", gradient: 'from-blue-600 to-indigo-600' },
    { path: "/admin/2fa-support", icon: KeySquare, label: "2FA Support", gradient: 'from-violet-600 to-purple-700' },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Header with gradient */}
      <div className="p-4 lg:p-6 border-b bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Zap className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Premium Dashboard
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        <div className="space-y-1">
          {/* Main Navigation */}
          <SectionHeader title="Main Menu" icon={LayoutDashboard} />
          {menuItems.map((item) => (
            <ModernMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path);
                setIsMobileSidebarOpen(false);
              }}
              gradient={item.gradient}
              badge={item.badge}
              badgeColor={item.badgeColor}
            />
          ))}
          
          {/* Content Section */}
          <SectionHeader title="Content" icon={Files} />
          {contentMenuItems.map((item) => (
            <ModernMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path);
                setIsMobileSidebarOpen(false);
              }}
              gradient={item.gradient}
              badge={item.badge}
            />
          ))}
          
          {/* Analytics Section */}
          <SectionHeader title="Analytics" icon={BarChart3} />
          {analyticsMenuItems.map((item) => (
            <ModernMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path);
                setIsMobileSidebarOpen(false);
              }}
              gradient={item.gradient}
            />
          ))}
          
          {/* Modern Reports Section */}
          <SectionHeader title="Modern Reports" icon={Gauge} />
          {modernAnalyticsMenuItems.map((item) => (
            <ModernMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path);
                setIsMobileSidebarOpen(false);
              }}
              gradient={item.gradient}
            />
          ))}
          
          {/* Security & Compliance Section */}
          <SectionHeader title="Security" icon={Shield} />
          {complianceMenuItems.map((item) => (
            <ModernMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path);
                setIsMobileSidebarOpen(false);
              }}
              gradient={item.gradient}
            />
          ))}
          
          {/* System Section */}
          <SectionHeader title="System" icon={Settings} />
          {systemMenuItems.map((item) => (
            <ModernMenuItem
              key={item.path}
              path={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => {
                navigate(item.path);
                setIsMobileSidebarOpen(false);
              }}
              gradient={item.gradient}
              badge={item.badge}
              badgeColor={item.badgeColor}
            />
          ))}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-100/50 to-purple-100/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">Pro Features</p>
            <p className="text-xs text-gray-500">All unlocked</p>
          </div>
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-xs">
            PRO
          </Badge>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      <AdminNavbar />
      
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 border-r bg-white/80 backdrop-blur-xl shadow-xl shadow-gray-200/50">
          <SidebarContent />
        </aside>
        
        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        {/* Main content */}
        <main className="flex-1 py-4 px-4 lg:py-6 lg:px-8 overflow-x-hidden">
          <div className="mb-4 lg:mb-6">
            <div className="flex items-center gap-3 mb-2">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="lg:hidden h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-lg shadow-violet-500/25"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
              </div>
            </div>
          </div>
          
          <motion.div 
            className="max-w-full overflow-x-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
