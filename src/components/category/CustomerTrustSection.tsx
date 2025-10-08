import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Star, TrendingUp, Award, Heart } from 'lucide-react';

const CustomerTrustSection = () => {
  const trustMetrics = [
    {
      icon: Users,
      value: '50K+',
      label: 'Happy Customers',
      description: 'Worldwide',
      color: 'from-primary to-accent'
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Rating',
      description: 'From 10K+ reviews',
      color: 'from-secondary to-primary'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Satisfaction Rate',
      description: 'Customer approval',
      color: 'from-accent to-secondary'
    },
    {
      icon: Award,
      value: '25+',
      label: 'Awards Won',
      description: 'Industry recognition',
      color: 'from-primary to-secondary'
    }
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your data is protected with enterprise-grade encryption'
    },
    {
      icon: Heart,
      title: 'Quality Guarantee',
      description: 'Every product is carefully vetted for quality and authenticity'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Our dedicated team is always here to help you'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 glass-effect border-primary/30 shadow-glow">
            Why Customers Trust Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Join Thousands of Satisfied Customers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Who trust us for quality products and exceptional service
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card
                key={index}
                className="card-modern hover-lift hover-glow border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${metric.color} rounded-2xl mb-4 shadow-glow`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {metric.label}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-8 glass-effect rounded-2xl border border-primary/20 hover-lift hover-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4 shadow-glow">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomerTrustSection;
