import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const CustomerStoriesSection = () => {
  const stories = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      initials: 'SJ',
      rating: 5,
      story: 'Absolutely transformed my business! The quality of products and customer service is unmatched. I\'ve been a loyal customer for over 2 years.',
      verified: true,
      orderCount: '50+ orders'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      initials: 'MC',
      rating: 5,
      story: 'Best electronics marketplace I\'ve ever used. Fast shipping, genuine products, and amazing deals. The customer support team is incredibly helpful!',
      verified: true,
      orderCount: '30+ orders'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fashion Designer',
      initials: 'ER',
      rating: 5,
      story: 'The clothing collection is fantastic! Great quality fabrics and the latest trends. Returns are hassle-free and the prices are unbeatable.',
      verified: true,
      orderCount: '75+ orders'
    },
    {
      name: 'David Thompson',
      role: 'Home Office Manager',
      initials: 'DT',
      rating: 5,
      story: 'Set up my entire home office through this platform. The computer accessories are top-notch and delivery was lightning fast. Highly recommend!',
      verified: true,
      orderCount: '20+ orders'
    },
    {
      name: 'Lisa Anderson',
      role: 'Fitness Coach',
      initials: 'LA',
      rating: 5,
      story: 'Love the sports and fitness equipment! Everything arrived in perfect condition. The quality check is impressive and prices are competitive.',
      verified: true,
      orderCount: '40+ orders'
    },
    {
      name: 'James Wilson',
      role: 'Photographer',
      initials: 'JW',
      rating: 5,
      story: 'Amazing photography equipment selection. Got my professional camera setup here and saved thousands. The warranty coverage gives me peace of mind.',
      verified: true,
      orderCount: '15+ orders'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 glass-effect border-primary/30 shadow-glow">
            Customer Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real experiences from real customers who trust us every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <Card
              key={index}
              className="card-modern hover-lift hover-glow border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary/40" />
                  <div className="flex gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{story.story}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-primary/20">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-secondary">
                    <AvatarFallback className="text-white font-semibold">
                      {story.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{story.name}</h4>
                      {story.verified && (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                    <Badge variant="outline" className="mt-1 text-xs border-primary/30">
                      {story.orderCount}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStoriesSection;
