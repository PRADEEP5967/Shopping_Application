
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User,
  Package,
  Heart,
  CreditCard,
  Bell,
  Lock,
  LogOut,
  Home,
  Settings,
  Truck,
  ShieldCheck,
  Star,
  BarChart,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
          {/* Sidebar */}
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
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard</CardTitle>
                  <CardDescription>Your account overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <Package className="h-8 w-8 text-primary mb-2" />
                          <h3 className="text-2xl font-bold">0</h3>
                          <p className="text-sm text-gray-500">Orders</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <Heart className="h-8 w-8 text-red-500 mb-2" />
                          <h3 className="text-2xl font-bold">0</h3>
                          <p className="text-sm text-gray-500">Wishlist Items</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <Star className="h-8 w-8 text-yellow-500 mb-2" />
                          <h3 className="text-2xl font-bold">0</h3>
                          <p className="text-sm text-gray-500">Reviews</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                      <p className="text-gray-500 text-sm">No recent activity yet.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Profile Completion</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Basic Info</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Add a profile picture</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Email verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Add payment method</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                          defaultValue={user.firstName}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          defaultValue={user.lastName}
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
                        defaultValue={user.email}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <Input
                        id="address"
                        defaultValue={user.address}
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
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="space-y-1">
                        <p className="text-gray-500 text-sm">You don't have any orders yet.</p>
                      </div>
                      <div>
                        <Truck className="h-8 w-8 text-gray-300" />
                      </div>
                    </div>
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
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="space-y-1">
                        <p className="text-gray-500 text-sm">You don't have any saved payment methods.</p>
                      </div>
                      <div>
                        <CreditCard className="h-8 w-8 text-gray-300" />
                      </div>
                    </div>
                    <Button>Add New Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'addresses' && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Addresses</CardTitle>
                  <CardDescription>Manage your shipping addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Default Address</h3>
                          <p className="text-sm text-gray-600 mt-1">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-600">{user.address}</p>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Add New Address</Button>
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
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b">
                      <div className="space-y-1">
                        <p className="text-gray-500 text-sm">Notification preferences coming soon.</p>
                      </div>
                      <div>
                        <Bell className="h-8 w-8 text-gray-300" />
                      </div>
                    </div>
                  </div>
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
