
import React from 'react';
import { Truck, Shield, RotateCcw, Award } from 'lucide-react';

const ProductFeatures: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <div className="flex items-center gap-2 text-sm">
        <Truck className="h-4 w-4 text-green-500" />
        <span>Free Shipping</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Shield className="h-4 w-4 text-blue-500" />
        <span>Secure Payment</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <RotateCcw className="h-4 w-4 text-orange-500" />
        <span>Easy Returns</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Award className="h-4 w-4 text-purple-500" />
        <span>Quality Guarantee</span>
      </div>
    </div>
  );
};

export default ProductFeatures;
