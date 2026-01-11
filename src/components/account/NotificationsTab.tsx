import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, Mail, MessageSquare, Smartphone, ShoppingBag, 
  Tag, Megaphone, Shield, Save, Check
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const NotificationsTab: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'orders',
      label: 'Order Updates',
      description: 'Notifications about your order status, shipping, and delivery',
      icon: ShoppingBag,
      enabled: true,
      channels: { email: true, push: true, sms: true }
    },
    {
      id: 'deals',
      label: 'Deals & Promotions',
      description: 'Special offers, flash sales, and exclusive discounts',
      icon: Tag,
      enabled: true,
      channels: { email: true, push: false, sms: false }
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      description: 'Weekly digest of new products and featured content',
      icon: Mail,
      enabled: false,
      channels: { email: true, push: false, sms: false }
    },
    {
      id: 'announcements',
      label: 'Product Announcements',
      description: 'New product launches and important updates',
      icon: Megaphone,
      enabled: true,
      channels: { email: true, push: true, sms: false }
    },
    {
      id: 'security',
      label: 'Security Alerts',
      description: 'Login attempts, password changes, and account security',
      icon: Shield,
      enabled: true,
      channels: { email: true, push: true, sms: true }
    }
  ]);

  const [saving, setSaving] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const toggleChannel = (id: string, channel: 'email' | 'push' | 'sms') => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { 
        ...s, 
        channels: { ...s.channels, [channel]: !s.channels[channel] }
      } : s
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success('Notification preferences saved successfully');
  };

  const enabledCount = settings.filter(s => s.enabled).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Control what notifications you receive and how</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {enabledCount} of {settings.length} enabled
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Channel Legend */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <span className="text-sm font-medium text-muted-foreground">Delivery channels:</span>
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Email</span>
          </div>
          <div className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="text-sm">Push</span>
          </div>
          <div className="flex items-center gap-1">
            <Smartphone className="h-4 w-4" />
            <span className="text-sm">SMS</span>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border transition-colors ${
                  setting.enabled 
                    ? 'bg-card border-primary/20' 
                    : 'bg-muted/30 border-muted'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      setting.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-base font-medium">{setting.label}</Label>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {setting.description}
                      </p>
                      
                      {/* Channel Toggles */}
                      {setting.enabled && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-4 mt-3"
                        >
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`${setting.id}-email`}
                              checked={setting.channels.email}
                              onCheckedChange={() => toggleChannel(setting.id, 'email')}
                              className="scale-75"
                            />
                            <Label htmlFor={`${setting.id}-email`} className="text-xs flex items-center gap-1">
                              <Mail className="h-3 w-3" /> Email
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`${setting.id}-push`}
                              checked={setting.channels.push}
                              onCheckedChange={() => toggleChannel(setting.id, 'push')}
                              className="scale-75"
                            />
                            <Label htmlFor={`${setting.id}-push`} className="text-xs flex items-center gap-1">
                              <Bell className="h-3 w-3" /> Push
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`${setting.id}-sms`}
                              checked={setting.channels.sms}
                              onCheckedChange={() => toggleChannel(setting.id, 'sms')}
                              className="scale-75"
                            />
                            <Label htmlFor={`${setting.id}-sms`} className="text-xs flex items-center gap-1">
                              <Smartphone className="h-3 w-3" /> SMS
                            </Label>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <Separator />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="min-w-32">
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Save className="h-4 w-4" />
                </motion.div>
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
