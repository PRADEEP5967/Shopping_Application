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
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminInventory from '@/pages/admin/Inventory';

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-white shadow-sm">
          <div className="p-6">
            <h2 className="font-bold text-xl text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Manage your store</p>
          </div>
          
          <nav className="px-3 py-2">
            <div className="space-y-1">
              <Button 
                variant={isActive('/admin') ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => navigate('/admin')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button 
                variant={isActive('/admin/products') ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => navigate('/admin/products')}
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
              
              <Button 
                variant={isActive('/admin/inventory') ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => navigate('/admin/inventory')}
              >
                <Inbox className="mr-2 h-4 w-4" />
                Inventory
              </Button>
              
              <Button 
                variant={isActive('/admin/orders') ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => navigate('/admin/orders')}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Button>
              
              <Button 
                variant={isActive('/admin/customers') ? "default" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => navigate('/admin/customers')}
              >
                <Users className="mr-2 h-4 w-4" />
                Customers
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Content
              </h3>
              <div className="mt-2 space-y-1">
                <Button 
                  variant={isActive('/admin/categories') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/categories')}
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Categories
                </Button>
                <Button 
                  variant={isActive('/admin/discounts') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/discounts')}
                >
                  <Percent className="mr-2 h-4 w-4" />
                  Discounts
                </Button>
                <Button 
                  variant={isActive('/admin/pages') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/pages')}
                >
                  <Files className="mr-2 h-4 w-4" />
                  Pages
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Analytics
              </h3>
              <div className="mt-2 space-y-1">
                <Button 
                  variant={isActive('/admin/analytics') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/analytics')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button 
                  variant={isActive('/admin/activity') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/activity')}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Activity Log
                </Button>
                <Button 
                  variant={isActive('/admin/order-history') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/order-history')}
                >
                  <History className="mr-2 h-4 w-4" />
                  Order History
                </Button>
                <Button 
                  variant={isActive('/admin/ab-testing') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/ab-testing')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  A/B Testing
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </h3>
              <div className="mt-2 space-y-1">
                <Button 
                  variant={isActive('/admin/notifications') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/notifications')}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button 
                  variant={isActive('/admin/settings') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button 
                  variant={isActive('/admin/help') ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/help')}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </div>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
