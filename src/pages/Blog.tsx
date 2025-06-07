
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of E-Commerce: Trends to Watch in 2024',
      excerpt: 'Discover the latest trends shaping the e-commerce landscape and how businesses can adapt to stay competitive.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'E-Commerce',
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications with React',
      excerpt: 'Learn best practices for creating maintainable and performant React applications that can grow with your business.',
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'Development',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 3,
      title: 'UI/UX Design Principles That Drive Conversions',
      excerpt: 'Explore design strategies that not only look great but also convert visitors into customers.',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Design',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 4,
      title: 'The Rise of AI in Web Development',
      excerpt: 'How artificial intelligence is transforming the way we build and optimize web applications.',
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'AI & Technology',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 5,
      title: 'Mobile-First Design: Why It Matters More Than Ever',
      excerpt: 'Understanding the importance of mobile-first approach in modern web design and development.',
      author: 'Sarah Johnson',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Design',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 6,
      title: 'Optimizing Website Performance for Better SEO',
      excerpt: 'Practical tips to improve your website\'s loading speed and search engine rankings.',
      author: 'Michael Chen',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'SEO',
      image: '/placeholder.svg',
      featured: false
    }
  ];

  const categories = ['All', 'E-Commerce', 'Development', 'Design', 'AI & Technology', 'SEO'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Insights, tutorials, and industry news to help you stay ahead in the digital world.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === 'All' && !searchTerm && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <CardContent className="p-8 flex flex-col justify-between">
                  <div>
                    <Badge className="mb-4">{featuredPost.category}</Badge>
                    <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    
                    <Button>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-primary">
                    {post.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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

export default Blog;
