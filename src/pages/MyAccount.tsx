
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Import existing components
import AccountSidebar from '@/components/account/AccountSidebar';
import DashboardTab from '@/components/account/DashboardTab';
import ProfileTab from '@/components/account/ProfileTab';
import OrdersTab from '@/components/account/OrdersTab';
import PaymentTab from '@/components/account/PaymentTab';
import AddressesTab from '@/components/account/AddressesTab';
import NotificationsTab from '@/components/account/NotificationsTab';
import SecurityTab from '@/components/account/SecurityTab';

// Import new modern features
import { ModernAccountFeatures } from '@/components/account/ModernAccountFeatures';

const MyAccount = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your account information has been updated successfully."
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // Don't render until authentication check is complete
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'modern':
        return <ModernAccountFeatures />;
      case 'profile':
        return <ProfileTab user={user} onSave={handleSave} />;
      case 'orders':
        return <OrdersTab />;
      case 'payment':
        return <PaymentTab />;
      case 'addresses':
        return <AddressesTab user={user} />;
      case 'notifications':
        return <NotificationsTab />;
      case 'security':
        return <SecurityTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64">
            <AccountSidebar 
              user={user} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>
          
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="modern" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Modern
                </TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {renderTabContent()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
