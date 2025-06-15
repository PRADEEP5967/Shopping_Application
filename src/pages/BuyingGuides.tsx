
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Star, TrendingUp, Clock, ArrowRight } from 'lucide-react';

const BuyingGuides = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const buyingGuides = [
    {
      id: 1,
      title: 'Complete Smartphone Buying Guide 2024',
      category: 'Electronics',
      description: 'Everything you need to know before buying your next smartphone.',
      readTime: '15 min read',
      difficulty: 'Beginner',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400',
      slug: 'smartphone-buying-guide-2024',
      featured: true,
      tags: ['Smartphones', 'Mobile', 'Technology']
    },
    {
      id: 2,
      title: 'Gaming Laptop Buyer\'s Guide',
      category: 'Gaming',
      description: 'Find the perfect gaming laptop for your budget and performance needs.',
      readTime: '12 min read',
      difficulty: 'Intermediate',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=400',
      slug: 'gaming-laptop-buyers-guide',
      featured: false,
      tags: ['Gaming', 'Laptops', 'Performance']
    },
    {
      id: 3,
      title: 'Smart Home Security Camera Guide',
      category: 'Smart Home',
      description: 'Comprehensive guide to choosing the right security cameras for your home.',
      readTime: '10 min read',
      difficulty: 'Beginner',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400',
      slug: 'smart-home-security-camera-guide',
      featured: true,
      tags: ['Security', 'Smart Home', 'Cameras']
    },
    {
      id: 4,
      title: 'Professional Camera Equipment Guide',
      category: 'Photography',
      description: 'Essential guide for photographers choosing professional camera gear.',
      readTime: '18 min read',
      difficulty: 'Advanced',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=400',
      slug: 'professional-camera-equipment-guide',
      featured: false,
      tags: ['Photography', 'Cameras', 'Professional']
    },
    {
      id: 5,
      title: 'Wireless Headphones Buying Guide',
      category: 'Electronics',
      description: 'Find the perfect wireless headphones for music, work, and travel.',
      readTime: '8 min read',
      difficulty: 'Beginner',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400',
      slug: 'wireless-headphones-buying-guide',
      featured: false,
      tags: ['Audio', 'Headphones', 'Wireless']
    },
    {
      id: 6,
      title: 'Home Office Setup Guide',
      category: 'Furniture',
      description: 'Create the perfect productive home office workspace.',
      readTime: '14 min read',
      difficulty: 'Intermediate',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400',
      slug: 'home-office-setup-guide',
      featured: true,
      tags: ['Office', 'Furniture', 'Productivity']
    }
  ];

  const categories = ['All', 'Electronics', 'Gaming', 'Smart Home', 'Photography', 'Furniture'];
  const [activeCategory, setActiveCategory] = useState(category || 'All');

  const filteredGuides = buyingGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGuides = filteredGuides.filter(guide => guide.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Buying Guides
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Expert advice and comprehensive guides to help you make informed purchasing decisions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search buying guides..."
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
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      {featuredGuides.length > 0 && activeCategory === 'All' && !searchTerm && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold">Featured Guides</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredGuides.slice(0, 2).map((guide) => (
                <Card key={guide.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <CardContent className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge>{guide.category}</Badge>
                          <Badge className={getDifficultyColor(guide.difficulty)}>
                            {guide.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{guide.title}</h3>
                        <p className="text-gray-600 mb-4">{guide.description}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {guide.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {guide.rating}
                          </div>
                        </div>
                        <Link to={`/blog/${guide.slug}`}>
                          <Button className="w-full">
                            Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">All Buying Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={guide.image} 
                    alt={guide.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 text-gray-700">
                      {guide.category}
                    </Badge>
                    <Badge className={getDifficultyColor(guide.difficulty)}>
                      {guide.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {guide.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {guide.rating}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {guide.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link to={`/blog/${guide.slug}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                      Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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

export default BuyingGuides;
