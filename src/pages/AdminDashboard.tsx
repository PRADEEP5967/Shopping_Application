import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModernAdminStats } from '@/components/admin/ModernAdminStats';
import { ModernProductManagement } from '@/components/admin/ModernProductManagement';
import { ModernOrderManagement } from '@/components/admin/ModernOrderManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { ModernInventoryManagement } from '@/components/admin/ModernInventoryManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { SettingsPanel } from '@/components/admin/SettingsPanel';
import { ModernAdminFeatures } from '@/components/admin/ModernAdminFeatures';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { ArrowUpRight, BarChart3, Package, ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout 
      title="Admin Dashboard" 
      subtitle="Manage your e-commerce platform with modern tools and insights"
    >
      <ModernAdminStats />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Products</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">12,234</h3>
                  <p className="text-xs text-green-600 mt-1">+19% from last month</p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Orders</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">2,350</h3>
                  <p className="text-xs text-green-600 mt-1">+180.1% from last month</p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Active Users</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">573</h3>
                  <p className="text-xs text-green-600 mt-1">+201 since last hour</p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-4 sm:py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">$45,231.89</h3>
                  <p className="text-xs text-green-600 mt-1">+20.1% from last month</p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="mt-4 sm:mt-6">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8 h-auto">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Overview</TabsTrigger>
          <TabsTrigger value="modern" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Modern</TabsTrigger>
          <TabsTrigger value="products" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Products</TabsTrigger>
          <TabsTrigger value="orders" className="text-xs sm:text-sm px-2 sm:px-3 py-2">Orders</TabsTrigger>
          <TabsTrigger value="users" className="text-xs sm:text-sm px-2 sm:px-3 py-2 hidden sm:block">Users</TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs sm:text-sm px-2 sm:px-3 py-2 hidden sm:block">Inventory</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 sm:px-3 py-2 hidden sm:block">Analytics</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm px-2 sm:px-3 py-2 hidden sm:block">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">Latest Activity</CardTitle>
              <CardDescription className="text-sm sm:text-base">Recent orders, product updates, and customer activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 sm:space-y-8">
                {/* Sales Overview */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Sales Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                      <div className="text-xs text-gray-500">Today's Sales</div>
                      <div className="text-xl sm:text-2xl font-bold">$1,429</div>
                      <div className="flex items-center mt-1 text-xs text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+15%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                      <div className="text-xs text-gray-500">Weekly Sales</div>
                      <div className="text-xl sm:text-2xl font-bold">$9,529</div>
                      <div className="flex items-center mt-1 text-xs text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+8%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                      <div className="text-xs text-gray-500">Monthly Sales</div>
                      <div className="text-xl sm:text-2xl font-bold">$43,594</div>
                      <div className="flex items-center mt-1 text-xs text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+12%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Orders */}
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-medium">Recent Orders</h3>
                    <Link to="/admin" className="text-sm text-primary hover:underline">View all</Link>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Demo Orders */}
                    <div className="flex items-center justify-between p-3 sm:p-4 border rounded-md">
                      <div>
                        <p className="font-medium text-sm sm:text-base">Order #45321</p>
                        <p className="text-xs sm:text-sm text-gray-500">June 3, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm sm:text-base">$129.99</p>
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Processing</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 border rounded-md">
                      <div>
                        <p className="font-medium text-sm sm:text-base">Order #45320</p>
                        <p className="text-xs sm:text-sm text-gray-500">June 2, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm sm:text-base">$85.50</p>
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Shipped</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 border rounded-md">
                      <div>
                        <p className="font-medium text-sm sm:text-base">Order #45319</p>
                        <p className="text-xs sm:text-sm text-gray-500">June 2, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm sm:text-base">$214.22</p>
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modern" className="mt-4 sm:mt-6">
          <ModernAdminFeatures />
        </TabsContent>

        <TabsContent value="products" className="mt-4 sm:mt-6">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="orders" className="mt-4 sm:mt-6">
          <OrderManagement />
        </TabsContent>

        <TabsContent value="users" className="mt-4 sm:mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="inventory" className="mt-4 sm:mt-6">
          <InventoryManagement />
        </TabsContent>

        <TabsContent value="analytics" className="mt-4 sm:mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="settings" className="mt-4 sm:mt-6">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
