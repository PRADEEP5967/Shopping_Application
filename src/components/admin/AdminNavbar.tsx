
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
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/ed6f414d-1f2f-430f-93d3-758d4fd9738f.png"
                alt="Pradeep Sahani Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 rounded object-cover"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-sm sm:text-lg">PRADEEP SAHANI</span>
                <span className="text-xs sm:text-sm font-medium text-primary/80">MART</span>
              </div>
            </Link>
            <Badge variant="destructive" className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2">Admin Panel</Badge>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link to="/">
              <Button variant="ghost" size="sm" title="Back to Store" className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3">
                <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="ml-2 hidden md:inline text-sm">Store</span>
              </Button>
            </Link>
            
            <Link to="/admin/add-product">
              <Button variant="ghost" size="sm" title="Add Product" className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3">
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="ml-2 hidden lg:inline text-sm">Add Product</span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" title="Notifications" className="relative h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3">
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">3</Badge>
            </Button>

            <Button variant="ghost" size="sm" title="Settings" className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>

            <div className="flex items-center space-x-2 sm:space-x-3 border-l pl-2 sm:pl-3 ml-1 sm:ml-2">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage 
                    src="https://avatars.githubusercontent.com/u/your-github-username" 
                    alt="Pradeep Sahani" 
                  />
                  <AvatarFallback className="bg-primary text-white text-xs sm:text-sm">PS</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-xs sm:text-sm font-medium">Pradeep Sahani</p>
                  <Badge variant="outline" className="text-xs">Admin</Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleLogout} className="h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm">
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="ml-1 sm:ml-2 hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
