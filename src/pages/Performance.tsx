
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Clock, 
  Award,
  ArrowRight,
  CheckCircle,
  Gauge,
  Rocket,
  Activity
} from 'lucide-react';

const Performance = () => {
  const performanceMetrics = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      value: "99.9%",
      description: "Uptime guaranteed with optimized performance",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Rate",
      value: "+300%",
      description: "Average business growth with our platform",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Accuracy",
      value: "99.7%",
      description: "Precision in order processing and delivery",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance",
      value: "5x",
      description: "Faster than traditional e-commerce platforms",
      color: "from-orange-500 to-red-500"
    }
  ];

  const features = [
    "Real-time performance monitoring",
    "Advanced analytics and reporting",
    "Automated optimization systems",
    "Scalable infrastructure",
    "24/7 performance support",
    "Custom performance metrics"
  ];

  const performanceHighlights = [
    {
      icon: <Gauge className="h-6 w-6" />,
      title: "Speed Optimization",
      description: "Sub-second load times across all pages"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Scalability",
      description: "Handle millions of concurrent users"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Real-time Monitoring",
      description: "Continuous performance tracking and alerts"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-25"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 animate-fade-in">
                <Award className="w-4 h-4 mr-2" />
                Performance Excellence
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                Unmatched Performance
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
                Experience lightning-fast speeds, reliable uptime, and exceptional performance metrics that drive your business forward with cutting-edge optimization.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 hover-scale">
                  <Zap className="mr-2 w-5 h-5" />
                  View Performance Metrics
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="hover-scale">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Performance Metrics</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real-time data showcasing our platform's exceptional performance across all key metrics and benchmarks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {performanceMetrics.map((metric, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden hover-scale">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${metric.color} flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {metric.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{metric.title}</h3>
                    <div className="text-4xl font-bold text-primary mb-4 group-hover:scale-105 transition-transform">
                      {metric.value}
                    </div>
                    <p className="text-gray-600">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Highlights */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Performance Highlights</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover what makes our platform the fastest and most reliable choice for your business needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {performanceHighlights.map((highlight, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover-scale">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      {highlight.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                    <p className="text-gray-600">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Choose Our Performance?</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Our platform is built with performance at its core, delivering exceptional speed, reliability, and scalability for businesses of all sizes.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-8 hover-scale" size="lg">
                  Get Started Today
                </Button>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-6 text-center shadow-lg hover-scale">
                      <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">0.5s</div>
                      <div className="text-sm text-gray-600">Load Time</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 text-center shadow-lg hover-scale">
                      <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 text-center shadow-lg hover-scale">
                      <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">5x</div>
                      <div className="text-sm text-gray-600">Faster</div>
                    </div>
                    <div className="bg-white rounded-lg p-6 text-center shadow-lg hover-scale">
                      <Award className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-900">A+</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSlider />
      </main>
      
      <Footer />
    </div>
  );
};

export default Performance;
