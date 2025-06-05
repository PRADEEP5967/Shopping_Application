
import React from 'react';
import { AddProductForm } from '@/components/admin/AddProductForm';

const AddProduct = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Product Information</h2>
        <p className="text-gray-600">Add a new product to your store with all the necessary details.</p>
      </div>
      
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
