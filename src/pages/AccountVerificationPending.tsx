
import React from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccountVerificationPending = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6">
        <Mail className="text-purple-500 mx-auto mb-2" size={48} />
        <Loader2 className="animate-spin text-purple-500 absolute -top-2 -right-2" size={24} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Verifying Your Account...</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We've sent a verification email to your inbox.<br />
        Please check your email and click the verification link.
      </p>
      <img
        src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=500&q=80"
        alt="Email Verification"
        className="rounded-lg shadow-lg mb-6 w-full max-w-xs sm:max-w-sm mx-auto"
      />
      <div className="flex gap-3">
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
        <Button onClick={() => navigate('/login')} variant="default">Go to Login</Button>
      </div>
    </div>
  );
};

export default AccountVerificationPending;
