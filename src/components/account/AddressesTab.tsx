
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AddressesTabProps {
  user: {
    firstName: string;
    lastName: string;
    address: string;
  };
}

const AddressesTab: React.FC<AddressesTabProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Addresses</CardTitle>
        <CardDescription>Manage your shipping addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Default Address</h3>
                <p className="text-sm text-gray-600 mt-1">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-600">{user.address}</p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
              </div>
            </div>
          </div>
          
          <Button>Add New Address</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressesTab;
