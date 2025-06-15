
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/services/ServiceCard';
import ServicesHero from '@/components/services/ServicesHero';
import { StatsSection } from '@/components/modern/StatsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Star, Zap, Shield, Headphones, Users, Award, Clock } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store setup with modern features, payment integration, and mobile optimization.',
      image: '/placeholder.svg',
      features: ['Custom Design', 'Payment Gateway', 'Mobile Responsive', 'SEO Optimized', 'Analytics Dashboard'],
      price: 'From $2,999',
      rating: 4.9,
      duration: '4-6 weeks',
      teamSize: '3-5 experts',
      popular: true
    },
    {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive sales.',
      image: '/placeholder.svg',
      features: ['Social Media Marketing', 'Google Ads', 'Content Strategy', 'Analytics', 'ROI Tracking'],
      price: 'From $1,499',
      rating: 4.8,
      duration: '2-3 weeks',
      teamSize: '2-3 experts'
    },
    {
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technology and best practices.',
      image: '/placeholder.svg',
      features: ['React/Next.js', 'API Integration', 'Database Design', 'Cloud Hosting', 'Performance Optimization'],
      price: 'From $3,999',
      rating: 5.0,
      duration: '6-8 weeks',
      teamSize: '4-6 experts'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      image: '/placeholder.svg',
      features: ['iOS & Android', 'Cross-Platform', 'App Store Publishing', 'Push Notifications', 'Offline Support'],
      price: 'From $4,999',
      rating: 4.9,
      duration: '8-12 weeks',
      teamSize: '3-5 experts'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and functional designs that enhance user experience and drive conversions.',
      image: '/placeholder.svg',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing'],
      price: 'From $1,999',
      rating: 4.8,
      duration: '3-4 weeks',
      teamSize: '2-3 experts'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      image: '/placeholder.svg',
      features: ['Custom AI Models', 'Data Analysis', 'Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
      price: 'From $5,999',
      rating: 5.0,
      duration: '10-16 weeks',
      teamSize: '4-7 experts',
      popular: true
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance across all devices.',
      stats: '99.9% Uptime'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with industry best practices.',
      stats: 'SSL Encrypted'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support whenever you need help.',
      stats: '<2hr Response'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Dedicated professionals with years of industry experience.',
      stats: '50+ Specialists'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Rigorous testing and quality assurance processes.',
      stats: '99% Satisfaction'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'We deliver projects on schedule, every time.',
      stats: '95% On-Time'
    }
  ];

  const handleExploreService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    console.log(`Exploring service: ${serviceTitle}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <ServicesHero />

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional services designed to meet your specific business needs and drive growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onExplore={() => handleExploreService(service.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional results through innovation, expertise, and dedication to your success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <div className="text-sm font-bold text-primary">{feature.stats}</div>
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

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
              { step: '02', title: 'Planning', description: 'Strategic planning and roadmap creation' },
              { step: '03', title: 'Development', description: 'Agile development with regular updates' },
              { step: '04', title: 'Launch', description: 'Deployment and ongoing support' }
            ].map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="text-xl font-bold">{phase.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{phase.title}</h3>
                <p className="text-gray-600 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Enhanced CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
