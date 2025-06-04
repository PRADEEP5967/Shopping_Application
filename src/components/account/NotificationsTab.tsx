
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const NotificationsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Control what notifications you receive</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">Notification preferences coming soon.</p>
            </div>
            <div>
              <Bell className="h-8 w-8 text-gray-300" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
