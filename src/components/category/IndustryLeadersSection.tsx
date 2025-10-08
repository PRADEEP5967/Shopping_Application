import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Award, Target, Zap, BarChart3, Rocket } from 'lucide-react';

const IndustryLeadersSection = () => {
  const results = [
    {
      icon: TrendingUp,
      metric: '300%',
      label: 'Revenue Growth',
      description: 'Average increase in first year',
      color: 'from-primary to-accent'
    },
    {
      icon: Target,
      metric: '45%',
      label: 'Cost Reduction',
      description: 'On procurement expenses',
      color: 'from-secondary to-primary'
    },
    {
      icon: Zap,
      metric: '10x',
      label: 'Faster Delivery',
      description: 'Compared to competitors',
      color: 'from-accent to-secondary'
    }
  ];

  const leaders = [
    {
      icon: Rocket,
      company: 'TechStartup Inc',
      industry: 'Technology',
      result: 'Scaled from 10 to 500 employees using our platform',
      improvement: '+2000% growth'
    },
    {
      icon: BarChart3,
      company: 'RetailChain Co',
      industry: 'Retail',
      result: 'Reduced supply chain costs by 40% in 6 months',
      improvement: '40% savings'
    },
    {
      icon: Award,
      company: 'Healthcare Plus',
      industry: 'Healthcare',
      result: 'Improved equipment procurement efficiency by 85%',
      improvement: '85% faster'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 glass-effect border-primary/30 shadow-glow">
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            See How Businesses Like Yours
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Are achieving remarkable results with our platform
          </p>
        </div>

        {/* Key Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <Card
                key={index}
                className="card-modern hover-lift hover-glow border-primary/20 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${result.color} rounded-2xl mb-4 shadow-glow`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                    {result.metric}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {result.label}
                  </h3>
                  <p className="text-muted-foreground">
                    {result.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader, index) => {
            const Icon = leader.icon;
            return (
              <Card
                key={index}
                className="card-modern hover-lift hover-glow border-primary/20"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl mb-4 shadow-glow">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {leader.company}
                  </h3>
                  <Badge variant="outline" className="mb-4 border-primary/30">
                    {leader.industry}
                  </Badge>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {leader.result}
                  </p>
                  <div className="pt-4 border-t border-primary/20">
                    <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {leader.improvement}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryLeadersSection;
