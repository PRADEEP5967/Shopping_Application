
import React from "react";
import { Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentPending = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6">
        <CreditCard className="text-green-500 mx-auto mb-2" size={48} />
        <Loader2 className="animate-spin text-green-500 absolute -top-2 -right-2" size={24} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Processing Payment...</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Your payment is being processed securely.<br />
        Please do not close this window or navigate away.
      </p>
      <img
        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80"
        alt="Payment Processing"
        className="rounded-lg shadow-lg mb-6 w-full max-w-xs sm:max-w-sm mx-auto"
      />
      <div className="flex gap-3">
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
        <Button onClick={() => navigate('/checkout')} variant="default">Return to Checkout</Button>
      </div>
    </div>
  );
};

export default PaymentPending;
