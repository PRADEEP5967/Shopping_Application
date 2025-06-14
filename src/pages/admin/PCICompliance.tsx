
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const PCICompliance: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 animate-fade-in">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          PCI Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We follow strict PCI DSS (Payment Card Industry Data Security Standard) guidelines to ensure all payment data is fully protected.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            All payment processing meets <span className="font-semibold text-primary">Level 1 PCI DSS</span> requirements.
          </li>
          <li>
            Sensitive card data is never stored on our servers.
          </li>
          <li>
            Regular third-party audits and vulnerability assessments.
          </li>
        </ul>
        <div className="mt-6 text-sm text-muted-foreground">
          <span className="font-semibold">Certification:</span> <span className="text-green-600 font-medium">Validated</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PCICompliance;
