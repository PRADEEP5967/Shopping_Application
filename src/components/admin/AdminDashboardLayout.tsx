import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminNavbar } from './AdminNavbar';
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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ 
  children, 
  title,
  subtitle
}) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  
  // Redirect if not admin
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
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/inventory', icon: Inbox, label: 'Inventory' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
  ];

  const contentMenuItems = [
    { path: '/admin/categories', icon: Grid, label: 'Categories' },
    { path: '/admin/discounts', icon: Percent, label: 'Discounts' },
    { path: '/admin/pages', icon: Files, label: 'Pages' },
  ];

  // Add our new modern analytics links to the sidebar!
  const modernAnalyticsMenuItems = [
    { path: '/admin/real-time-analysis', icon: 'gauge', label: 'Real-Time Analysis' },
    { path: '/admin/customer-reports', icon: 'users', label: 'Customer Reports' },
    { path: '/admin/insights', icon: 'chart-pie', label: 'Insights' },
  ];

  const analyticsMenuItems = [
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/activity', icon: Activity, label: 'Activity Log' },
    { path: '/admin/order-history', icon: History, label: 'Order History' },
    { path: '/admin/ab-testing', icon: BarChart3, label: 'A/B Testing' },
  ];

  const systemMenuItems = [
    { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
    { path: '/admin/help', icon: HelpCircle, label: 'Help' },
  ];

  const complianceMenuItems = [
    { path: "/admin/ssl-encryption", icon: "shield-check", label: "SSL Encryption" },
    { path: "/admin/pci-compliance", icon: "shield", label: "PCI Compliance" },
    { path: "/admin/2fa-support", icon: "key-square", label: "2FA Support" },
  ];

  // Map string 'icon' to actual Lucide icon
  const iconMap: Record<string, React.ElementType> = {
    'gauge': require('lucide-react').Gauge,
    'users': require('lucide-react').Users,
    'chart-pie': require('lucide-react').ChartPie,
    "shield": require('lucide-react').Shield,
    "shield-check": require('lucide-react').ShieldCheck,
    "key-square": require('lucide-react').KeySquare,
    // ... add other icons if needed ...
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="font-bold text-lg sm:text-xl text-gray-800">Admin Panel</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your store</p>
      </div>
      
      <nav className="flex-1 p-3 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-sm" 
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Content
            </h3>
            <div className="space-y-1">
              {contentMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Analytics Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Analytics
            </h3>
            <div className="space-y-1">
              {analyticsMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Modern Analytics Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2">
              Modern Reports
            </h3>
            <div className="space-y-1">
              {modernAnalyticsMenuItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <Button 
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"} 
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    {Icon ? <Icon className="mr-2 h-4 w-4 shrink-0" /> : null}
                    <span className="truncate">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* Compliance & Security Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2">
              Security & Compliance
            </h3>
            <div className="space-y-1">
              {complianceMenuItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <Button 
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"} 
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileSidebarOpen(false);
                    }}
                  >
                    {Icon ? <Icon className="mr-2 h-4 w-4 shrink-0" /> : null}
                    <span className="truncate">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          
          {/* System Section */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              System
            </h3>
            <div className="space-y-1">
              {systemMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-white shadow-sm">
          <SidebarContent />
        </aside>
        
        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        {/* Main content */}
        <main className="flex-1 py-4 px-4 sm:py-6 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 mb-2">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{title}</h1>
            </div>
            {subtitle && <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>}
          </div>
          
          <div className="max-w-full overflow-x-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
