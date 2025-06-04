
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  User,
  Package,
  Heart,
  CreditCard,
  Bell,
  Lock,
  Home,
  ShieldCheck,
  BarChart,
} from 'lucide-react';

interface AccountSidebarProps {
  user: {
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ user, activeTab, setActiveTab }) => {
  return (
    <aside className="md:w-64 flex-shrink-0">
      <Card className="sticky top-20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary/80 to-primary rounded-full flex items-center justify-center mb-4 shadow-md">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
            <Badge className="mt-2">{user.role === 'admin' ? 'Administrator' : 'Customer'}</Badge>
          </div>
          
          <nav className="space-y-1">
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart className="h-4 w-4 mr-3" />
              Dashboard
            </button>
            
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User className="h-4 w-4 mr-3" />
              Profile
            </button>
            
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package className="h-4 w-4 mr-3" />
              Orders
            </button>
            
            <Link
              to="/wishlist"
              className="w-full flex items-center px-3 py-2 rounded-md text-left hover:bg-gray-100"
            >
              <Heart className="h-4 w-4 mr-3" />
              Wishlist
            </Link>
            
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'payment' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('payment')}
            >
              <CreditCard className="h-4 w-4 mr-3" />
              Payment Methods
            </button>
            
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'addresses' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('addresses')}
            >
              <Home className="h-4 w-4 mr-3" />
              Addresses
            </button>

            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'notifications' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell className="h-4 w-4 mr-3" />
              Notifications
            </button>
            
            <button
              className={`w-full flex items-center px-3 py-2 rounded-md text-left ${activeTab === 'security' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('security')}
            >
              <Lock className="h-4 w-4 mr-3" />
              Security
            </button>
            
            {user.role === 'admin' && (
              <Link to="/admin" className="w-full flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md text-left hover:from-blue-700 hover:to-blue-800">
                <ShieldCheck className="h-4 w-4 mr-3" />
                Admin Dashboard
              </Link>
            )}
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AccountSidebar;
