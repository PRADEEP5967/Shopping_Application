
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'web',
      image: '/placeholder.svg',
      description: 'Modern e-commerce solution with React and Stripe integration.',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Mobile Banking App',
      category: 'mobile',
      image: '/placeholder.svg',
      description: 'Secure mobile banking application with biometric authentication.',
      technologies: ['React Native', 'Firebase', 'Face ID', 'Plaid'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'SaaS Dashboard',
      category: 'web',
      image: '/placeholder.svg',
      description: 'Analytics dashboard for SaaS companies with real-time data.',
      technologies: ['Next.js', 'Chart.js', 'PostgreSQL', 'Redis'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Social Media App',
      category: 'mobile',
      image: '/placeholder.svg',
      description: 'Social networking app with real-time messaging and media sharing.',
      technologies: ['Flutter', 'GraphQL', 'AWS', 'WebRTC'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Brand Identity Design',
      category: 'design',
      image: '/placeholder.svg',
      description: 'Complete brand identity package for a tech startup.',
      technologies: ['Figma', 'Illustrator', 'Photoshop', 'Sketch'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'AI Chatbot Platform',
      category: 'ai',
      image: '/placeholder.svg',
      description: 'Intelligent chatbot platform with natural language processing.',
      technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'Design' },
    { id: 'ai', label: 'AI/ML' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Showcasing our latest projects and creative solutions that have helped businesses thrive in the digital world.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
