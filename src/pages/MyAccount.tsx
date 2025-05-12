
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  User,
  Package,
  Heart,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';

const MyAccount = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your account information has been updated successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">John Doe</h2>
                  <p className="text-sm text-gray-500">Member since 2023</p>
                </div>
                
                <nav className="space-y-1">
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
                  
                  <Link
                    to="/"
                    className="w-full flex items-center px-3 py-2 text-red-500 rounded-md text-left hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'orders' && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>View and track your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500">You don't have any orders yet.</p>
                    <Button asChild variant="outline">
                      <Link to="/products">Start Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-500">You don't have any saved payment methods.</p>
                    <Button>Add New Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control what notifications you receive</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Notification preferences coming soon.</p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Update your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <Input
                        id="current-password"
                        type="password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <Input
                        id="new-password"
                        type="password"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                      />
                    </div>
                    
                    <div>
                      <Button onClick={() => {
                        toast({
                          title: "Password updated",
                          description: "Your password has been changed successfully."
                        });
                      }}>
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
