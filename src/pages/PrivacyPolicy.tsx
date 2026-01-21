import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Bell, Users, Globe, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number, etc.)',
        'Billing and shipping addresses',
        'Payment information (processed securely through our payment partners)',
        'Order history and preferences',
        'Device and browser information for analytics',
        'Cookies and usage data to improve your experience'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Send order confirmations and shipping updates',
        'Provide customer support and respond to inquiries',
        'Personalize your shopping experience',
        'Send promotional communications (with your consent)',
        'Improve our website and services',
        'Prevent fraud and ensure security'
      ]
    },
    {
      icon: Shield,
      title: 'Data Protection',
      content: [
        'SSL encryption for all data transmission',
        'Secure payment processing through PCI-compliant partners',
        'Regular security audits and updates',
        'Limited employee access to personal data',
        'Secure data storage with industry-standard protections',
        'Two-factor authentication options for accounts'
      ]
    },
    {
      icon: Users,
      title: 'Sharing Your Information',
      content: [
        'We do not sell your personal information to third parties',
        'Shipping carriers to deliver your orders',
        'Payment processors to handle transactions securely',
        'Analytics providers to improve our services',
        'Legal authorities when required by law',
        'Service providers who assist our operations under strict confidentiality'
      ]
    },
    {
      icon: Bell,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time through your account',
        'Request correction of inaccurate information',
        'Request deletion of your account and data',
        'Opt-out of marketing communications',
        'Export your data in a portable format',
        'Lodge a complaint with a data protection authority'
      ]
    },
    {
      icon: Globe,
      title: 'Cookies & Tracking',
      content: [
        'Essential cookies for site functionality',
        'Analytics cookies to understand usage patterns',
        'Marketing cookies for personalized ads (with consent)',
        'You can control cookie preferences in your browser',
        'Third-party cookies from trusted partners only',
        'Cookie preferences can be updated at any time'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              We are committed to protecting your privacy and ensuring the security of your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            <Separator className="my-12" />

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Questions About Privacy?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
                  </p>
                  <p className="text-primary font-medium">pradeepsahani8130s@gmail.com</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
