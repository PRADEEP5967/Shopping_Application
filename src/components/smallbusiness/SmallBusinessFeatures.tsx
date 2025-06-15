
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Laptop, 
  Shield, 
  Clock, 
  DollarSign, 
  HeadphonesIcon, 
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';

const SmallBusinessFeatures = () => {
  const features = [
    {
      icon: Laptop,
      title: 'Digital Tools',
      description: 'Modern software and applications to streamline your business operations.',
      badge: 'Essential',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security to protect your business data and customer information.',
      badge: 'Protected',
      color: 'bg-green-500'
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Efficient scheduling and time tracking tools to maximize productivity.',
      badge: 'Efficient',
      color: 'bg-purple-500'
    },
    {
      icon: DollarSign,
      title: 'Cost Effective',
      description: 'Affordable solutions that deliver maximum value for your investment.',
      badge: 'Value',
      color: 'bg-orange-500'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you whenever you need it.',
      badge: 'Always Here',
      color: 'bg-red-500'
    },
    {
      icon: Zap,
      title: 'Quick Setup',
      description: 'Get up and running in minutes with our streamlined onboarding process.',
      badge: 'Fast',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything Your Business Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions designed specifically for small businesses to thrive in today's competitive market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 animate-fade-in border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-xl`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Included in all plans</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-50 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              Trusted by 10,000+ small businesses worldwide
            </span>
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallBusinessFeatures;
