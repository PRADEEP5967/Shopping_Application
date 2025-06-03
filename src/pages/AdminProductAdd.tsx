
import React from 'react';
import { AddProductForm } from '@/components/admin/AddProductForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminProductAdd = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
