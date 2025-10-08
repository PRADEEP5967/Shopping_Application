import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Building2, Award, TrendingUp, Users } from 'lucide-react';

const TrustedBySection = () => {
  const companies = [
    { name: 'TechCorp', logo: Building2, industry: 'Technology' },
    { name: 'RetailPro', logo: Award, industry: 'Retail' },
    { name: 'LogiTech', logo: TrendingUp, industry: 'Logistics' },
    { name: 'HealthCare+', logo: Users, industry: 'Healthcare' },
    { name: 'EduSmart', logo: Building2, industry: 'Education' },
    { name: 'FinServe', logo: Award, industry: 'Finance' },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 glass-effect border-primary/30 shadow-glow">
            As Seen On
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join leading businesses and thousands of satisfied customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {companies.map((company, index) => {
            const Logo = company.logo;
            return (
              <div
                key={index}
                className="card-modern hover-lift hover-glow p-6 text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-3 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Logo className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{company.name}</h3>
                <p className="text-xs text-muted-foreground">{company.industry}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
