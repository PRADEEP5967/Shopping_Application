
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Info, Users, History, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">About Our Company</h1>
              <p className="text-lg md:text-xl">We're on a mission to make technology accessible to everyone with high-quality products and exceptional service.</p>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <History className="mr-3 text-primary" />
                  Our Story
                </h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2010, our company began with a simple idea: create a one-stop shop for quality electronics at fair prices. What started as a small online store has grown into a trusted retailer serving customers nationwide.
                </p>
                <p className="text-gray-700 mb-4">
                  Our team of passionate tech enthusiasts works tirelessly to curate the best selection of products, ranging from everyday essentials to cutting-edge innovations.
                </p>
                <p className="text-gray-700">
                  Throughout our journey, we've remained committed to our core values: quality, affordability, and exceptional customer service. We believe technology should enhance your life, not complicate it.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop"
                    alt="Our team"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-700">The principles that guide everything we do</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Quality First</h3>
                <p className="text-gray-600 text-center">
                  We carefully select each product in our inventory, ensuring it meets our high standards for performance and durability.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Customer Focus</h3>
                <p className="text-gray-600 text-center">
                  Your satisfaction is our priority. We're committed to providing exceptional service from browsing to delivery and beyond.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Sustainability</h3>
                <p className="text-gray-600 text-center">
                  We're committed to reducing our environmental impact through responsible packaging and energy-efficient operations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
              <p className="text-gray-700">The experts behind our success</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Morgan",
                  role: "CEO & Founder",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                },
                {
                  name: "Sarah Chen",
                  role: "CTO",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                },
                {
                  name: "Marcus Johnson",
                  role: "Head of Operations",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
                },
                {
                  name: "Jessica Williams",
                  role: "Customer Experience",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
                }
              ].map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
