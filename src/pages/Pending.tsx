
import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Pending = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <Loader2 className="animate-spin text-blue-500 mx-auto mb-6" size={48} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Processing Request...</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Please wait a moment while we process your request.<br />
        This page will update as soon as your process is complete.
      </p>
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80"
        alt="Pending"
        className="rounded-lg shadow-lg mb-6 w-full max-w-xs sm:max-w-sm mx-auto"
      />
      <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
    </div>
  );
};

export default Pending;
