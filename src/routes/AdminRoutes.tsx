
import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminProductAdd from '@/pages/AdminProductAdd';
import AdminProducts from '@/pages/admin/Products';
import AdminOrders from '@/pages/admin/Orders';
import AdminCustomers from '@/pages/admin/Customers';
import AdminCategories from '@/pages/admin/Categories';
import AdminDiscounts from '@/pages/admin/Discounts';
import AdminInventory from '@/pages/admin/Inventory';
import AdminAnalytics from '@/pages/admin/Analytics';
import AdminActivity from '@/pages/admin/Activity';
import AdminABTesting from '@/pages/admin/ABTesting';
import AdminSettings from '@/pages/admin/Settings';
import AdminNotifications from '@/pages/admin/Notifications';
import AdminHelp from '@/pages/admin/Help';
import AdminPages from '@/pages/admin/Pages';

// Modern Report/Admin Pages
import RealTimeAnalysis from '@/pages/admin/RealTimeAnalysis';
import CustomerReports from '@/pages/admin/CustomerReports';
import Insights from '@/pages/admin/Insights';

// Security Pages
import SSLEncryption from '@/pages/admin/SSLEncryption';
import PCICompliance from '@/pages/admin/PCICompliance';
import TwoFASupport from '@/pages/admin/TwoFASupport';

export const AdminRoutes = (
  <>
    {/* Main Admin Dashboard - exact path match */}
    <Route path="/admin" element={
      <AdminDashboardLayout title="Dashboard">
        <AdminDashboard />
      </AdminDashboardLayout>
    } />
    
    {/* Product Management */}
    <Route path="/admin/add-product" element={
      <AdminDashboardLayout title="Add Product">
        <AdminProductAdd />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/products" element={
      <AdminDashboardLayout title="Product Management">
        <AdminProducts />
      </AdminDashboardLayout>
    } />
    
    {/* Order & Customer Management */}
    <Route path="/admin/orders" element={
      <AdminDashboardLayout title="Order Management">
        <AdminOrders />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/customers" element={
      <AdminDashboardLayout title="Customer Management">
        <AdminCustomers />
      </AdminDashboardLayout>
    } />
    
    {/* Content Management */}
    <Route path="/admin/categories" element={
      <AdminDashboardLayout title="Category Management">
        <AdminCategories />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/discounts" element={
      <AdminDashboardLayout title="Discount Management">
        <AdminDiscounts />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/inventory" element={
      <AdminDashboardLayout title="Inventory Management">
        <AdminInventory />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/pages" element={
      <AdminDashboardLayout title="Page Management">
        <AdminPages />
      </AdminDashboardLayout>
    } />
    
    {/* Analytics & Reports */}
    <Route path="/admin/analytics" element={
      <AdminDashboardLayout title="Analytics Dashboard">
        <AdminAnalytics />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/activity" element={
      <AdminDashboardLayout title="Activity Log">
        <AdminActivity />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/ab-testing" element={
      <AdminDashboardLayout title="A/B Testing">
        <AdminABTesting />
      </AdminDashboardLayout>
    } />
    
    {/* Modern Analytics/Reports Pages */}
    <Route path="/admin/real-time-analysis" element={
      <AdminDashboardLayout title="Real-Time Data Analysis">
        <RealTimeAnalysis />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/customer-reports" element={
      <AdminDashboardLayout title="Customer Reports">
        <CustomerReports />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/insights" element={
      <AdminDashboardLayout title="Insights">
        <Insights />
      </AdminDashboardLayout>
    } />
    
    {/* Security Pages */}
    <Route path="/admin/ssl-encryption" element={
      <AdminDashboardLayout title="SSL Encryption">
        <SSLEncryption />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/pci-compliance" element={
      <AdminDashboardLayout title="PCI Compliance">
        <PCICompliance />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/2fa-support" element={
      <AdminDashboardLayout title="2FA Support">
        <TwoFASupport />
      </AdminDashboardLayout>
    } />
    
    {/* System Management */}
    <Route path="/admin/settings" element={
      <AdminDashboardLayout title="Settings">
        <AdminSettings />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/notifications" element={
      <AdminDashboardLayout title="Notifications">
        <AdminNotifications />
      </AdminDashboardLayout>
    } />
    <Route path="/admin/help" element={
      <AdminDashboardLayout title="Help & Documentation">
        <AdminHelp />
      </AdminDashboardLayout>
    } />
  </>
);
