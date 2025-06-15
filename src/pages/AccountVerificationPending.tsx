
import React from "react";
import { Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccountVerificationPending = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6">
        <Shield className="text-orange-500 mx-auto mb-2" size={48} />
        <Loader2 className="animate-spin text-orange-500 absolute -top-2 -right-2" size={24} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Verifying Your Account...</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We're verifying your account details.<br />
        Please check your email for a verification link and follow the instructions.
      </p>
      <img
        src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=500&q=80"
        alt="Account Verification"
        className="rounded-lg shadow-lg mb-6 w-full max-w-xs sm:max-w-sm mx-auto"
      />
      <div className="flex gap-3">
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
        <Button onClick={() => navigate('/login')} variant="default">Back to Login</Button>
      </div>
    </div>
  );
};

export default AccountVerificationPending;
