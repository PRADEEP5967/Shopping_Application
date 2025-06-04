
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const SecurityTab: React.FC = () => {
  const { toast } = useToast();

  const handlePasswordUpdate = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Update your password and security preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <Input
              id="current-password"
              type="password"
            />
          </div>
          
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              id="new-password"
              type="password"
            />
          </div>
          
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <Input
              id="confirm-password"
              type="password"
            />
          </div>
          
          <div>
            <Button onClick={handlePasswordUpdate}>
              Update Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
