
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Settings, LogOut, Home, Store, ShoppingCart } from 'lucide-react';
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
              <Store className="h-6 w-6 text-primary" />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg">PRADEEP SAHANI</span>
                <span className="text-sm font-medium text-primary/80">MART</span>
              </div>
            </Link>
            <Badge variant="destructive" className="ml-2">Admin Panel</Badge>
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
                <ShoppingCart className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Add Product</span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" title="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">3</Badge>
            </Button>

            <Button variant="ghost" size="sm" title="Settings">
              <Settings className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-3 border-l pl-3 ml-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src="https://avatars.githubusercontent.com/u/your-github-username" 
                    alt="Pradeep Sahani" 
                  />
                  <AvatarFallback className="bg-primary text-white text-sm">PS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Pradeep Sahani</p>
                  <Badge variant="outline" className="text-xs">Admin</Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden lg:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
