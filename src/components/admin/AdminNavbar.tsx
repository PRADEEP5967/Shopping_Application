
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, User, LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">ShopAdmin</span>
            </Link>
            <Badge variant="secondary">Admin Panel</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              <span className="ml-2">Admin</span>
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
