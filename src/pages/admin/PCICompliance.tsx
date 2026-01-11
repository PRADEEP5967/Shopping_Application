import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, CreditCard, FileCheck, AlertCircle, CheckCircle2, 
  XCircle, RefreshCw, Download, Clock, Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const PCICompliance: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const complianceStatus = {
    level: "Level 1",
    lastAudit: "2024-01-10",
    nextAudit: "2025-01-10",
    score: 98,
    status: "compliant" as const
  };

  const requirements = [
    { 
      id: 1, 
      name: "Install and maintain a firewall",
      category: "Network Security",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 2, 
      name: "Change vendor-supplied defaults",
      category: "Security Configuration",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 3, 
      name: "Protect stored cardholder data",
      category: "Data Protection",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 4, 
      name: "Encrypt transmission of cardholder data",
      category: "Encryption",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 5, 
      name: "Use and update anti-virus software",
      category: "Vulnerability Management",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 6, 
      name: "Develop and maintain secure systems",
      category: "Secure Development",
      status: "warning",
      lastChecked: "5 hours ago"
    },
    { 
      id: 7, 
      name: "Restrict access to cardholder data",
      category: "Access Control",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 8, 
      name: "Assign unique IDs to each person",
      category: "Identity Management",
      status: "compliant",
      lastChecked: "2 hours ago"
    },
    { 
      id: 9, 
      name: "Restrict physical access to data",
      category: "Physical Security",
      status: "compliant",
      lastChecked: "1 day ago"
    },
    { 
      id: 10, 
      name: "Track and monitor network access",
      category: "Monitoring",
      status: "compliant",
      lastChecked: "Real-time"
    },
    { 
      id: 11, 
      name: "Regularly test security systems",
      category: "Testing",
      status: "compliant",
      lastChecked: "6 hours ago"
    },
    { 
      id: 12, 
      name: "Maintain information security policy",
      category: "Policy",
      status: "compliant",
      lastChecked: "1 week ago"
    }
  ];

  const handleScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setScanProgress(i);
    }
    
    setIsScanning(false);
    toast.success("Compliance scan completed successfully");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Compliant</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Review Needed</Badge>;
      default:
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Non-Compliant</Badge>;
    }
  };

  const compliantCount = requirements.filter(r => r.status === 'compliant').length;

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
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-xl font-bold text-green-500">Compliant</p>
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
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">PCI Level</p>
                  <p className="text-xl font-bold">{complianceStatus.level}</p>
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
                  <FileCheck className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                  <p className="text-xl font-bold">{complianceStatus.score}%</p>
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
                  <Clock className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Audit</p>
                  <p className="text-xl font-bold">{complianceStatus.nextAudit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Scan Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Compliance Scanner
              </CardTitle>
              <CardDescription>Run automated compliance checks</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={handleScan} disabled={isScanning}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? 'Scanning...' : 'Run Scan'}
              </Button>
            </div>
          </div>
        </CardHeader>
        {isScanning && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scanning PCI requirements...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Requirements Checklist */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PCI DSS Requirements</CardTitle>
              <CardDescription>12 requirements for payment card security</CardDescription>
            </div>
            <Badge variant="outline">
              {compliantCount}/{requirements.length} Compliant
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requirements.map((req, index) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  req.status === 'compliant' 
                    ? 'bg-green-500/5 border-green-500/20' 
                    : req.status === 'warning'
                    ? 'bg-yellow-500/5 border-yellow-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(req.status)}
                  <div>
                    <p className="font-medium">
                      <span className="text-muted-foreground mr-2">#{req.id}</span>
                      {req.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{req.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{req.lastChecked}</span>
                  {getStatusBadge(req.status)}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PCICompliance;
