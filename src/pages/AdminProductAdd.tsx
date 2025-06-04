
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AddProductForm } from '@/components/admin/AddProductForm';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import Footer from '@/components/Footer';

const AdminProductAdd = () => {
  const { isAdmin, isAuthenticated } = useAuth();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-gray-600 mt-2">Create a new product with images and details</p>
        </div>
        
        <AddProductForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminProductAdd;
