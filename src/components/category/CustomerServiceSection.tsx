import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, MessageCircle, Clock, Shield, Phone, Mail, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerServiceSection = () => {
  const supportChannels = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      description: 'Talk to our experts anytime',
      action: 'Call Now',
      availability: 'Available 24/7',
      color: 'from-primary to-accent'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant answers',
      action: 'Start Chat',
      availability: 'Online now',
      color: 'from-secondary to-primary'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed assistance via email',
      action: 'Send Email',
      availability: 'Reply within 2 hours',
      color: 'from-accent to-secondary'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Self-service knowledge base',
      action: 'Browse FAQs',
      availability: '1000+ articles',
      color: 'from-primary to-secondary'
    }
  ];

  const serviceFeatures = [
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Average response time under 2 minutes'
    },
    {
      icon: Shield,
      title: 'Expert Team',
      description: 'Trained professionals ready to help'
    },
    {
      icon: Headphones,
      title: 'Multilingual',
      description: 'Support in 12+ languages'
    },
    {
      icon: MapPin,
      title: 'Global Coverage',
      description: 'Local support teams worldwide'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/5 to-primary/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 glass-effect border-primary/30 shadow-glow">
            Customer Service
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            We're Here to Help
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our dedicated support team is available 24/7 to assist you
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card
                key={index}
                className="card-modern hover-lift hover-glow border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl mb-4 shadow-glow`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {channel.description}
                  </p>
                  <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
                    {channel.availability}
                  </Badge>
                  <Button 
                    variant="outline" 
                    className="w-full glass-effect border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <Link to="/contact">
                      {channel.action}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 glass-effect rounded-2xl border border-primary/20 hover-lift"
                style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-4 shadow-glow">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="glow"
            className="px-8 py-6 text-lg"
            asChild
          >
            <Link to="/contact">
              Contact Support Team
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerServiceSection;
