
import React from "react";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderProcessingPending = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6">
        <Package className="text-blue-500 mx-auto mb-2" size={48} />
        <Loader2 className="animate-spin text-blue-500 absolute -top-2 -right-2" size={24} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Processing Your Order...</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We're preparing your order for shipment.<br />
        You'll receive a confirmation email once your order is ready.
      </p>
      <img
        src="https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?auto=format&fit=crop&w=500&q=80"
        alt="Order Processing"
        className="rounded-lg shadow-lg mb-6 w-full max-w-xs sm:max-w-sm mx-auto"
      />
      <div className="flex gap-3">
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
        <Button onClick={() => navigate('/orders')} variant="default">View Orders</Button>
      </div>
    </div>
  );
};

export default OrderProcessingPending;
