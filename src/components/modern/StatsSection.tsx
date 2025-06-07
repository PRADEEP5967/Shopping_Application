
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Award, Globe } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '50K+',
      label: 'Active Users',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Customer Satisfaction',
      color: 'text-green-600'
    },
    {
      icon: Award,
      value: '25+',
      label: 'Industry Awards',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      value: '120+',
      label: 'Countries Served',
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform has helped thousands of businesses achieve their goals with cutting-edge technology and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
