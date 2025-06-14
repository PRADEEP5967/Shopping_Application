
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KeySquare } from "lucide-react";

const TwoFASupport: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 animate-fade-in">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeySquare className="w-5 h-5 text-primary" />
          Two-Factor Authentication (2FA) Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Protect your account with enhanced security through two-factor authentication.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-semibold text-primary">TOTP apps</span> (like Google Authenticator &amp; Authy) support.
          </li>
          <li>
            SMS-based verification for quick access.
          </li>
          <li>
            Recovery codes to never lose access to your account.
          </li>
        </ul>
        <div className="mt-6 text-sm text-muted-foreground">
          <span className="font-semibold">Recommended:</span> Enable 2FA for all administrator accounts for maximum security.
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TwoFASupport;
