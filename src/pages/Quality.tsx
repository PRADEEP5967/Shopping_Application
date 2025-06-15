import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Award, 
  Shield, 
  CheckCircle2, 
  Star, 
  Diamond, 
  Trophy,
  ArrowRight,
  CheckCircle,
  Target
} from 'lucide-react';

const Quality = () => {
  const qualityMetrics = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Score",
      value: "99.8%",
      description: "Customer satisfaction with product quality",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliability",
      value: "99.9%",
      description: "Product reliability and durability rating",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Customer Rating",
      value: "4.9/5",
      description: "Average customer rating across all products",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Awards Won",
      value: "25+",
      description: "Industry awards for quality excellence",
      color: "from-green-500 to-teal-500"
    }
  ];

  const qualityStandards = [
    "ISO 9001:2015 Quality Management",
    "Six Sigma quality methodology",
    "Continuous quality improvement",
    "Rigorous testing protocols",
    "Quality assurance at every step",
    "Customer feedback integration"
  ];

  const certifications = [
    { name: "ISO 9001", description: "Quality Management Systems" },
    { name: "ISO 14001", description: "Environmental Management" },
    { name: "OHSAS 18001", description: "Occupational Health & Safety" },
    { name: "CE Marking", description: "European Conformity" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-purple-50 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-yellow-100 text-yellow-700 border-yellow-200">
                <Diamond className="w-4 h-4 mr-2" />
                Premium Quality
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
                Uncompromising Quality
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Experience excellence with our commitment to the highest quality standards, rigorous testing, and continuous improvement.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-yellow-600 hover:bg-yellow-700">
                  <Award className="mr-2 w-5 h-5" />
                  Discover Quality Standards
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Quality Certifications
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Metrics */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Quality Excellence</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our commitment to quality is reflected in every metric, from customer satisfaction to industry recognition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualityMetrics.map((metric, index) => (
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

        {/* Quality Process */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Quality Assurance Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our comprehensive quality assurance process ensures excellence at every stage.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Planning</h3>
                <p className="text-gray-600 text-sm">Quality planning and requirement analysis</p>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Testing</h3>
                <p className="text-gray-600 text-sm">Rigorous testing and validation procedures</p>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Verification</h3>
                <p className="text-gray-600 text-sm">Quality verification and compliance checks</p>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Delivery</h3>
                <p className="text-gray-600 text-sm">Quality-assured product delivery</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications & Standards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Quality Standards & Certifications</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  We maintain the highest industry standards and hold multiple certifications that validate our commitment to quality.
                </p>
                
                <div className="space-y-4 mb-8">
                  {qualityStandards.map((standard, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{standard}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-8" size="lg">
                  View All Certifications
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </Card>
                ))}
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

export default Quality;
