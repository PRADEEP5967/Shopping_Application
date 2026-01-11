import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Lock, RefreshCw, Calendar, CheckCircle2, AlertTriangle, Globe, Server } from "lucide-react";
import { motion } from "framer-motion";

const SSLEncryption: React.FC = () => {
  const [isRenewing, setIsRenewing] = useState(false);

  const certificateInfo = {
    issuer: "Let's Encrypt Authority X3",
    validFrom: "2024-01-15",
    validUntil: "2025-01-15",
    daysRemaining: 245,
    algorithm: "RSA 2048-bit",
    protocol: "TLS 1.3",
    status: "active" as const
  };

  const securityFeatures = [
    { name: "HTTPS Everywhere", enabled: true, description: "Force all connections over HTTPS" },
    { name: "HSTS Enabled", enabled: true, description: "HTTP Strict Transport Security" },
    { name: "Perfect Forward Secrecy", enabled: true, description: "Unique session keys" },
    { name: "OCSP Stapling", enabled: true, description: "Certificate validation caching" }
  ];

  const handleRenew = async () => {
    setIsRenewing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRenewing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SSL Status</p>
                  <p className="text-xl font-bold text-green-500">Active & Secure</p>
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
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Encryption</p>
                  <p className="text-xl font-bold">256-bit AES</p>
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
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Until Expiry</p>
                  <p className="text-xl font-bold">{certificateInfo.daysRemaining} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Certificate Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                SSL Certificate Details
              </CardTitle>
              <CardDescription>Your site's security certificate information</CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={handleRenew}
              disabled={isRenewing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRenewing ? 'animate-spin' : ''}`} />
              {isRenewing ? 'Renewing...' : 'Renew Certificate'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Issuer</span>
                <span className="font-medium">{certificateInfo.issuer}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Valid From</span>
                <span className="font-medium">{certificateInfo.validFrom}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Valid Until</span>
                <span className="font-medium">{certificateInfo.validUntil}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Algorithm</span>
                <span className="font-medium">{certificateInfo.algorithm}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Protocol</span>
                <Badge variant="secondary">{certificateInfo.protocol}</Badge>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Certificate Validity</span>
              <span className="text-sm font-medium">{Math.round((certificateInfo.daysRemaining / 365) * 100)}%</span>
            </div>
            <Progress value={(certificateInfo.daysRemaining / 365) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Security Features
          </CardTitle>
          <CardDescription>Advanced security configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{feature.name}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Enabled
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SSLEncryption;
