
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
  BarChart3, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export const ModernFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-second load times',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      benefits: ['99.9% uptime', 'CDN powered', 'Optimized images']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with advanced encryption',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      benefits: ['SSL encryption', 'PCI compliance', '2FA support']
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Responsive design that works on all devices',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      benefits: ['PWA support', 'Touch optimized', 'Offline mode']
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Multi-language and multi-currency support',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      benefits: ['120+ countries', '50+ languages', 'Local payments']
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights and performance tracking',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      benefits: ['Real-time data', 'Custom reports', 'AI insights']
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock expert assistance',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      benefits: ['Live chat', 'Phone support', 'Video calls']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Platform Features
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with modern technologies and best practices to deliver exceptional 
            performance and user experience at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all">
            View All Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
