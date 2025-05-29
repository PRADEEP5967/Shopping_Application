import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Admin settings and configuration coming soon.</p>
      </div>
    </div>
  );
};

export default AdminSettings;