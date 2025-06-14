
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const SSLEncryption: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 animate-fade-in">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          SSL Encryption
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          All data exchanged with our platform is protected by industry-standard SSL encryption.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-semibold text-primary">256-bit encryption</span> secures all traffic.
          </li>
          <li>
            Real-time certificate monitoring and automatic renewal.
          </li>
          <li>
            Data is always private—even over public networks.
          </li>
        </ul>
        <div className="mt-6 text-sm text-muted-foreground">
          <span className="font-semibold">Status:</span> <span className="text-green-600 font-medium">Active</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SSLEncryption;
