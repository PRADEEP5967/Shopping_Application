
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Package, Heart, Star } from 'lucide-react';

const DashboardTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Your account overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Package className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-sm text-gray-500">Orders</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-sm text-gray-500">Wishlist Items</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Star className="h-8 w-8 text-yellow-500 mb-2" />
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
            <p className="text-gray-500 text-sm">No recent activity yet.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Profile Completion</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Basic Info</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Add a profile picture</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Email verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Add payment method</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardTab;
