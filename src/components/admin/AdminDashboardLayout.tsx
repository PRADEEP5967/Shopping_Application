
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  
  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-white">
          <div className="p-6">
            <h2 className="font-bold text-xl text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-500">Manage your store</p>
          </div>
          
          <nav className="px-3 py-2">
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate('/admin')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate('/admin')}
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate('/admin')}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate('/admin')}
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
                <Button variant="ghost" className="w-full justify-start">
                  <Grid className="mr-2 h-4 w-4" />
                  Categories
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Tag className="mr-2 h-4 w-4" />
                  Discounts
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Files className="mr-2 h-4 w-4" />
                  Pages
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </h3>
              <div className="mt-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Inbox className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
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
