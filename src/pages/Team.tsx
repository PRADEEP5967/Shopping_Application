import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TeamSection } from '@/components/modern/TeamSection';
import { StatsSection } from '@/components/modern/StatsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, Target, Lightbulb } from 'lucide-react';

const Team = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every project we deliver.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Together we achieve more than we ever could alone.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every detail of our work.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Our Amazing Team
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            The People Behind the Magic
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Meet the passionate individuals who bring creativity, expertise, and dedication to every project we undertake.
          </p>
        </div>
      </section>

      <TeamSection />

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the culture of our organization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Join Team CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              View Open Positions
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Send Your Resume
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
