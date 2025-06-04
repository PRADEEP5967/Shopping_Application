
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStats } from '@/components/admin/AdminStats';
import { ProductManagement } from '@/components/admin/ProductManagement';
import { OrderManagement } from '@/components/admin/OrderManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { InventoryManagement } from '@/components/admin/InventoryManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { SettingsPanel } from '@/components/admin/SettingsPanel';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import { ArrowUpRight, BarChart3, Package, ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout 
      title="Admin Dashboard" 
      subtitle="Manage your e-commerce platform with full CRUD operations"
    >
      <AdminStats />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Products</p>
                  <h3 className="text-2xl font-bold text-gray-900">12,234</h3>
                  <p className="text-xs text-green-600 mt-1">+19% from last month</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Package className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900">2,350</h3>
                  <p className="text-xs text-green-600 mt-1">+180.1% from last month</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShoppingCart className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <h3 className="text-2xl font-bold text-gray-900">573</h3>
                  <p className="text-xs text-green-600 mt-1">+201 since last hour</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin" className="block">
          <Card className="hover:shadow-md transition-all">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">$45,231.89</h3>
                  <p className="text-xs text-green-600 mt-1">+20.1% from last month</p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Activity</CardTitle>
              <CardDescription>Recent orders, product updates, and customer activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Sales Overview */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-xs text-gray-500">Today's Sales</div>
                      <div className="text-2xl font-bold">$1,429</div>
                      <div className="flex items-center mt-1 text-xs text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+15%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-xs text-gray-500">Weekly Sales</div>
                      <div className="text-2xl font-bold">$9,529</div>
                      <div className="flex items-center mt-1 text-xs text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+8%</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="text-xs text-gray-500">Monthly Sales</div>
                      <div className="text-2xl font-bold">$43,594</div>
                      <div className="flex items-center mt-1 text-xs text-green-600">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>+12%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Orders */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Recent Orders</h3>
                    <Link to="/admin" className="text-sm text-primary hover:underline">View all</Link>
                  </div>
                  <div className="space-y-4">
                    {/* Demo Orders */}
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Order #45321</p>
                        <p className="text-sm text-gray-500">June 3, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$129.99</p>
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Processing</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Order #45320</p>
                        <p className="text-sm text-gray-500">June 2, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$85.50</p>
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Shipped</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <p className="font-medium">Order #45319</p>
                        <p className="text-sm text-gray-500">June 2, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$214.22</p>
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <OrderManagement />
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <InventoryManagement />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
