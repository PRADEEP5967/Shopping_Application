
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
  X,
  Gauge,
  ChartPie,
  Shield,
  ShieldCheck,
  KeySquare
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

  const modernAnalyticsMenuItems = [
    { path: '/admin/real-time-analysis', icon: Gauge, label: 'Real-Time Analysis' },
    { path: '/admin/customer-reports', icon: Users, label: 'Customer Reports' },
    { path: '/admin/insights', icon: ChartPie, label: 'Insights' },
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
    { path: "/admin/ssl-encryption", icon: ShieldCheck, label: "SSL Encryption" },
    { path: "/admin/pci-compliance", icon: Shield, label: "PCI Compliance" },
    { path: "/admin/2fa-support", icon: KeySquare, label: "2FA Support" },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-3 sm:p-4 lg:p-6 border-b">
        <h2 className="font-bold text-base sm:text-lg lg:text-xl text-gray-800">Admin Panel</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage your store</p>
      </div>
      
      <nav className="flex-1 p-2 sm:p-3 py-3 sm:py-4 overflow-y-auto">
        <div className="space-y-4 sm:space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3" 
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <h3 className="px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Content
            </h3>
            <div className="space-y-1">
              {contentMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Analytics Section */}
          <div>
            <h3 className="px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Analytics
            </h3>
            <div className="space-y-1">
              {analyticsMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Modern Analytics Section */}
          <div>
            <h3 className="px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3 sm:mt-4 mb-2">
              Modern Reports
            </h3>
            <div className="space-y-1">
              {modernAnalyticsMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Compliance & Security Section */}
          <div>
            <h3 className="px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3 sm:mt-4 mb-2">
              Security & Compliance
            </h3>
            <div className="space-y-1">
              {complianceMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* System Section */}
          <div>
            <h3 className="px-2 sm:px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              System
            </h3>
            <div className="space-y-1">
              {systemMenuItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
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
        <aside className="hidden lg:block w-56 xl:w-64 border-r bg-white shadow-sm">
          <SidebarContent />
        </aside>
        
        {/* Mobile Sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        
        {/* Main content */}
        <main className="flex-1 py-3 px-3 sm:py-4 sm:px-4 lg:py-6 lg:px-8 overflow-x-hidden">
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden h-8 w-8 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{title}</h1>
            </div>
            {subtitle && <p className="text-sm sm:text-base text-gray-600 px-0 sm:px-0">{subtitle}</p>}
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
