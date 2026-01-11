import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  KeySquare, Smartphone, Mail, Shield, QrCode, 
  Copy, Download, CheckCircle2, AlertTriangle, Users
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TwoFASupport: React.FC = () => {
  const [settings, setSettings] = useState({
    requireForAdmins: true,
    requireForModerators: true,
    requireForUsers: false,
    allowTOTP: true,
    allowSMS: true,
    allowEmail: true,
    rememberDevice: true,
    trustPeriod: 30
  });

  const [showQR, setShowQR] = useState(false);

  const stats = {
    totalUsers: 1247,
    enabledUsers: 892,
    adminsWith2FA: 15,
    totalAdmins: 15
  };

  const recoveryCodes = [
    "ABCD-1234-EFGH",
    "IJKL-5678-MNOP",
    "QRST-9012-UVWX",
    "YZAB-3456-CDEF",
    "GHIJ-7890-KLMN",
    "OPQR-1234-STUV",
    "WXYZ-5678-ABCD",
    "EFGH-9012-IJKL"
  ];

  const handleCopyCodes = () => {
    navigator.clipboard.writeText(recoveryCodes.join('\n'));
    toast.success("Recovery codes copied to clipboard");
  };

  const handleDownloadCodes = () => {
    const blob = new Blob([recoveryCodes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recovery-codes.txt';
    a.click();
    toast.success("Recovery codes downloaded");
  };

  const percentage = Math.round((stats.enabledUsers / stats.totalUsers) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Admin 2FA</p>
                  <p className="text-xl font-bold text-green-500">100%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Users with 2FA</p>
                  <p className="text-xl font-bold">{stats.enabledUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Smartphone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adoption Rate</p>
                  <p className="text-xl font-bold">{percentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <KeySquare className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Methods</p>
                  <p className="text-xl font-bold">3 Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Requirements Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            2FA Requirements
          </CardTitle>
          <CardDescription>Configure which user roles require two-factor authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-lg border ${settings.requireForAdmins ? 'border-green-500/30 bg-green-500/5' : 'bg-muted/30'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Label className="font-medium">Administrators</Label>
                <Switch
                  checked={settings.requireForAdmins}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, requireForAdmins: checked }))}
                />
              </div>
              <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
              {settings.requireForAdmins && (
                <Badge className="mt-2 bg-green-500/10 text-green-500">Required</Badge>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-lg border ${settings.requireForModerators ? 'border-green-500/30 bg-green-500/5' : 'bg-muted/30'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Label className="font-medium">Moderators</Label>
                <Switch
                  checked={settings.requireForModerators}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, requireForModerators: checked }))}
                />
              </div>
              <p className="text-sm text-muted-foreground">Require 2FA for moderator accounts</p>
              {settings.requireForModerators && (
                <Badge className="mt-2 bg-green-500/10 text-green-500">Required</Badge>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`p-4 rounded-lg border ${settings.requireForUsers ? 'border-green-500/30 bg-green-500/5' : 'bg-muted/30'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Label className="font-medium">Regular Users</Label>
                <Switch
                  checked={settings.requireForUsers}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, requireForUsers: checked }))}
                />
              </div>
              <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
              {settings.requireForUsers && (
                <Badge className="mt-2 bg-green-500/10 text-green-500">Required</Badge>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Authentication Methods
          </CardTitle>
          <CardDescription>Enable or disable 2FA verification methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${settings.allowTOTP ? 'border-primary/30 bg-primary/5' : 'bg-muted/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <Label className="font-medium">Authenticator App</Label>
                </div>
                <Switch
                  checked={settings.allowTOTP}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, allowTOTP: checked }))}
                />
              </div>
              <p className="text-sm text-muted-foreground">Google Authenticator, Authy, etc.</p>
              <Badge variant="secondary" className="mt-2">Recommended</Badge>
            </div>

            <div className={`p-4 rounded-lg border ${settings.allowSMS ? 'border-primary/30 bg-primary/5' : 'bg-muted/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-500" />
                  <Label className="font-medium">SMS Verification</Label>
                </div>
                <Switch
                  checked={settings.allowSMS}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, allowSMS: checked }))}
                />
              </div>
              <p className="text-sm text-muted-foreground">Receive codes via text message</p>
            </div>

            <div className={`p-4 rounded-lg border ${settings.allowEmail ? 'border-primary/30 bg-primary/5' : 'bg-muted/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-500" />
                  <Label className="font-medium">Email Verification</Label>
                </div>
                <Switch
                  checked={settings.allowEmail}
                  onCheckedChange={(checked) => setSettings(s => ({ ...s, allowEmail: checked }))}
                />
              </div>
              <p className="text-sm text-muted-foreground">Receive codes via email</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Codes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeySquare className="h-5 w-5 text-primary" />
            Recovery Codes
          </CardTitle>
          <CardDescription>Backup codes for account recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-muted/30 border">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium">Keep these codes safe</p>
                <p className="text-sm text-muted-foreground">
                  Store these recovery codes in a secure location. Each code can only be used once.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {recoveryCodes.map((code, index) => (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="font-mono text-sm p-2 rounded bg-background border text-center"
                >
                  {code}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopyCodes}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Codes
              </Button>
              <Button variant="outline" onClick={handleDownloadCodes}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Trust */}
      <Card>
        <CardHeader>
          <CardTitle>Device Trust Settings</CardTitle>
          <CardDescription>Configure how long trusted devices remain authenticated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.rememberDevice}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, rememberDevice: checked }))}
              />
              <Label>Remember trusted devices</Label>
            </div>
            {settings.rememberDevice && (
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground">Trust period:</Label>
                <Input
                  type="number"
                  value={settings.trustPeriod}
                  onChange={(e) => setSettings(s => ({ ...s, trustPeriod: parseInt(e.target.value) || 30 }))}
                  className="w-20"
                />
                <span className="text-muted-foreground">days</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFASupport;
