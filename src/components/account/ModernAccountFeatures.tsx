
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Smartphone, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  Globe,
  Moon,
  Sun,
  Palette,
  Download
} from 'lucide-react';

export const ModernAccountFeatures = () => {
  const [showPersonalData, setShowPersonalData] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const securitySettings = [
    { 
      title: 'Two-Factor Authentication', 
      description: 'Add an extra layer of security to your account',
      icon: Smartphone,
      enabled: twoFactorEnabled,
      toggle: () => setTwoFactorEnabled(!twoFactorEnabled)
    },
    { 
      title: 'Biometric Login', 
      description: 'Use fingerprint or face recognition to sign in',
      icon: Fingerprint,
      enabled: biometricEnabled,
      toggle: () => setBiometricEnabled(!biometricEnabled)
    }
  ];

  const privacySettings = [
    { title: 'Profile Visibility', value: 'Friends Only', status: 'secure' },
    { title: 'Data Sharing', value: 'Minimal', status: 'secure' },
    { title: 'Marketing Emails', value: 'Disabled', status: 'secure' },
    { title: 'Analytics Tracking', value: 'Opt-out', status: 'secure' }
  ];

  const accountData = [
    { type: 'Personal Information', size: '2.4 MB', lastUpdated: '2 days ago' },
    { type: 'Order History', size: '1.8 MB', lastUpdated: '1 week ago' },
    { type: 'Preferences', size: '256 KB', lastUpdated: '3 days ago' },
    { type: 'Payment Methods', size: '128 KB', lastUpdated: '1 month ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Privacy Control Center */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {showPersonalData ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <div>
                  <p className="font-medium">Personal Data Visibility</p>
                  <p className="text-sm text-gray-500">Control who can see your information</p>
                </div>
              </div>
              <Switch 
                checked={showPersonalData} 
                onCheckedChange={setShowPersonalData}
              />
            </div>
            
            {privacySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{setting.title}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {setting.value}
                  </Badge>
                  <Shield className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5" />
            Enhanced Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securitySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <setting.icon className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{setting.title}</p>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={setting.enabled ? "default" : "secondary"}>
                    {setting.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <Switch 
                    checked={setting.enabled} 
                    onCheckedChange={setting.toggle}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Personalization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <div>
                  <p className="font-medium">Language & Region</p>
                  <p className="text-sm text-gray-500">English (US) - USD</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accountData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{data.type}</p>
                  <p className="text-sm text-gray-500">Size: {data.size} • Updated {data.lastUpdated}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            ))}
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">
                Download All Data
              </Button>
              <Button variant="destructive" className="flex-1">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
