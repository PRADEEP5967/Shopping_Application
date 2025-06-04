
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, User, LogOut, Home, Package, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const AdminNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">NextCommerce</span>
            </Link>
            <Badge variant="destructive">Admin Panel</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm" title="Back to Store">
                <Home className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Store</span>
              </Button>
            </Link>
            
            <Link to="/admin/add-product">
              <Button variant="ghost" size="sm" title="Add Product">
                <Package className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Add Product</span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" title="Notifications">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1 hidden sm:inline">3</Badge>
            </Button>

            <Button variant="ghost" size="sm" title="Settings">
              <Settings className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2 border-l pl-2 ml-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                <Badge variant="outline" className="text-xs">Admin</Badge>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
