import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Info, Users, History, Award, Globe, Zap, Shield, Heart } from 'lucide-react';

const githubImgUrl = "/lovable-uploads/0fe50496-21b2-45c7-a290-b3539fc12445.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Established 2010</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Revolutionizing Commerce
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  One Product at a Time
                </span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                We're passionate about connecting people with products that enhance their lives, 
                backed by technology that makes shopping effortless and enjoyable.
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '500K+', label: 'Happy Customers', icon: Users },
                { number: '50+', label: 'Countries Served', icon: Globe },
                { number: '99.9%', label: 'Uptime', icon: Zap },
                { number: '4.9★', label: 'Average Rating', icon: Award }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center space-x-2 text-blue-600 mb-4">
                  <History className="h-5 w-5" />
                  <span className="font-medium">Our Journey</span>
                </div>
                <h2 className="text-4xl font-bold mb-8 text-gray-900">
                  From Vision to Reality
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Founded in 2010, our company began with a revolutionary idea: create an e-commerce 
                    platform that puts customer experience at the center of everything we do.
                  </p>
                  <p>
                    What started as a small team of tech enthusiasts has grown into a global marketplace 
                    serving over 500,000 customers across 50+ countries, powered by cutting-edge technology 
                    and an unwavering commitment to quality.
                  </p>
                  <p>
                    Today, we continue to innovate, ensuring that every interaction with our platform 
                    is seamless, secure, and delightful. We believe technology should enhance human 
                    connection, not replace it.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                    alt="Modern office workspace"
                    className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Core Values</h2>
              <p className="text-xl text-gray-600">The principles that guide every decision we make</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Quality Excellence',
                  description: 'We meticulously curate every product, ensuring exceptional quality and performance that exceeds expectations.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Heart,
                  title: 'Customer Obsession',
                  description: 'Your satisfaction drives everything we do. We listen, adapt, and continuously improve to serve you better.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Shield,
                  title: 'Trust & Security',
                  description: 'We protect your data and privacy with enterprise-grade security, ensuring every transaction is safe and secure.',
                  color: 'from-green-500 to-emerald-500'
                }
              ].map((value, index) => (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Meet Our Leadership</h2>
              <p className="text-xl text-gray-600">The visionaries behind our success</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "ER PRADEEP SAHANI",
                  role: "CEO & Founder",
                  image: githubImgUrl,
                  bio: "Visionary leader with 15+ years in e-commerce"
                },
                {
                  name: "ER PRADEEP SAHANI",
                  role: "Chief Technology Officer",
                  image: githubImgUrl,
                  bio: "Tech innovator specializing in scalable platforms"
                },
                {
                  name: "ER PRADEEP SAHANI",
                  role: "Head of Operations",
                  image: githubImgUrl,
                  bio: "Operations expert ensuring seamless experiences"
                },
                {
                  name: "ER PRADEEP SAHANI",
                  role: "Customer Experience Director",
                  image: githubImgUrl,
                  bio: "Customer advocate with a passion for excellence"
                }
              ].map((member, index) => (
                <div key={index} className="group text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="relative w-full aspect-square object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join over 500,000 satisfied customers who trust us for their shopping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center"
              >
                Start Shopping
              </a>
              <a 
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 inline-flex items-center justify-center"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
