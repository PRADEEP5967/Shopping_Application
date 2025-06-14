import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FeatureCard } from '@/components/modern/FeatureCard';
import { StatsSection } from '@/components/modern/StatsSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star, Zap, Shield, Headphones } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store setup with modern features, payment integration, and mobile optimization.',
      image: '/placeholder.svg',
      features: ['Custom Design', 'Payment Gateway', 'Mobile Responsive', 'SEO Optimized'],
      price: 'From $2,999',
      rating: 4.9
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive sales.',
      image: '/placeholder.svg',
      features: ['Social Media Marketing', 'Google Ads', 'Content Strategy', 'Analytics'],
      price: 'From $1,499',
      rating: 4.8
    },
    {
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technology and best practices.',
      image: '/placeholder.svg',
      features: ['React/Next.js', 'API Integration', 'Database Design', 'Cloud Hosting'],
      price: 'From $3,999',
      rating: 5.0
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance across all devices.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support whenever you need help.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Professional Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Transform Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive solutions designed to accelerate your growth and maximize your potential in the digital landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional services designed to meet your specific business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FeatureCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                features={service.features}
                price={service.price}
                rating={service.rating}
                onExplore={() => console.log(`Exploring ${service.title}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional results through innovation, expertise, and dedication to your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your project and create something amazing together.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
            Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
