
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Gauge, 
  Workflow, 
  Timer, 
  Cpu, 
  RefreshCw, 
  Settings,
  ArrowRight,
  CheckCircle,
  BarChart3
} from 'lucide-react';

const Efficiency = () => {
  const efficiencyMetrics = [
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Process Speed",
      value: "+400%",
      description: "Faster processing compared to manual methods",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Automation",
      value: "95%",
      description: "Tasks automated for maximum efficiency",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Timer className="h-8 w-8" />,
      title: "Time Saved",
      value: "80%",
      description: "Reduction in operational time",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Resource Usage",
      value: "-60%",
      description: "Lower resource consumption",
      color: "from-orange-500 to-red-500"
    }
  ];

  const efficiencyFeatures = [
    "Intelligent workflow automation",
    "Smart resource allocation",
    "Real-time efficiency monitoring",
    "Predictive optimization",
    "Streamlined operations",
    "Continuous improvement systems"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-green-100 text-green-700 border-green-200">
                <Workflow className="w-4 h-4 mr-2" />
                Maximum Efficiency
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Streamlined Efficiency
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Optimize your operations with intelligent automation, smart workflows, and cutting-edge efficiency solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-green-600 hover:bg-green-700">
                  <Gauge className="mr-2 w-5 h-5" />
                  Explore Efficiency Tools
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Efficiency Metrics */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Efficiency Achievements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover how our efficiency solutions deliver measurable improvements across all business operations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {efficiencyMetrics.map((metric, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${metric.color} flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      {metric.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{metric.title}</h3>
                    <div className="text-4xl font-bold text-primary mb-4">{metric.value}</div>
                    <p className="text-gray-600">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Visualization */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Efficiency Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our streamlined approach to maximizing efficiency across all touchpoints.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">1. Analysis</h3>
                <p className="text-gray-600">Comprehensive analysis of current processes to identify improvement opportunities.</p>
              </Card>
              
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RefreshCw className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">2. Optimization</h3>
                <p className="text-gray-600">Implementation of smart automation and workflow optimization strategies.</p>
              </Card>
              
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">3. Monitoring</h3>
                <p className="text-gray-600">Continuous monitoring and adjustment to maintain peak efficiency levels.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop"
                    alt="Efficiency Dashboard"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Efficiency Features</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Transform your business operations with our comprehensive efficiency solutions designed for modern enterprises.
                </p>
                
                <div className="space-y-4">
                  {efficiencyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-8" size="lg">
                  Start Optimizing
                </Button>
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

export default Efficiency;
