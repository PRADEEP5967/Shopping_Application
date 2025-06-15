
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/portfolio/ProjectCard';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import { Badge } from '@/components/ui/badge';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [projectLikes, setProjectLikes] = useState<Record<string, number>>({});

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'web',
      image: '/placeholder.svg',
      description: 'Modern e-commerce solution with React and Stripe integration.',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      likes: projectLikes['E-Commerce Platform'] || 15,
      views: 234
    },
    {
      title: 'Mobile Banking App',
      category: 'mobile',
      image: '/placeholder.svg',
      description: 'Secure mobile banking application with biometric authentication.',
      technologies: ['React Native', 'Firebase', 'Face ID', 'Plaid'],
      liveUrl: '#',
      githubUrl: '#',
      likes: projectLikes['Mobile Banking App'] || 8,
      views: 189
    },
    {
      title: 'SaaS Dashboard',
      category: 'web',
      image: '/placeholder.svg',
      description: 'Analytics dashboard for SaaS companies with real-time data.',
      technologies: ['Next.js', 'Chart.js', 'PostgreSQL', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      likes: projectLikes['SaaS Dashboard'] || 23,
      views: 456
    },
    {
      title: 'Social Media App',
      category: 'mobile',
      image: '/placeholder.svg',
      description: 'Social networking app with real-time messaging and media sharing.',
      technologies: ['Flutter', 'GraphQL', 'AWS', 'WebRTC'],
      liveUrl: '#',
      githubUrl: '#',
      likes: projectLikes['Social Media App'] || 12,
      views: 298
    },
    {
      title: 'Brand Identity Design',
      category: 'design',
      image: '/placeholder.svg',
      description: 'Complete brand identity package for a tech startup.',
      technologies: ['Figma', 'Illustrator', 'Photoshop', 'Sketch'],
      liveUrl: '#',
      githubUrl: '#',
      likes: projectLikes['Brand Identity Design'] || 18,
      views: 167
    },
    {
      title: 'AI Chatbot Platform',
      category: 'ai',
      image: '/placeholder.svg',
      description: 'Intelligent chatbot platform with natural language processing.',
      technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
      liveUrl: '#',
      githubUrl: '#',
      popular: true,
      likes: projectLikes['AI Chatbot Platform'] || 31,
      views: 578
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'Design' },
    { id: 'ai', label: 'AI/ML' }
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.likes || 0) - (a.likes || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'oldest':
          return 0; // Would use actual dates in real implementation
        case 'newest':
        default:
          return 0; // Would use actual dates in real implementation
      }
    });

    return filtered;
  }, [activeFilter, searchTerm, sortBy, projectLikes]);

  const handleLike = (projectTitle: string) => {
    setProjectLikes(prev => ({
      ...prev,
      [projectTitle]: (prev[projectTitle] || 0) + 1
    }));
  };

  const handleView = (projectTitle: string) => {
    console.log(`Viewing project: ${projectTitle}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Our Work
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Showcasing our latest projects and creative solutions that have helped businesses thrive in the digital world.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{projects.length}</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {projects.reduce((sum, p) => sum + (p.likes || 0), 0)}
              </div>
              <div className="text-gray-600">Total Likes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {projects.reduce((sum, p) => sum + (p.views || 0), 0)}
              </div>
              <div className="text-gray-600">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <PortfolioFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filters={filters}
      />

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredAndSortedProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {filteredAndSortedProjects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  onLike={handleLike}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
