
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Heart } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in a real app, this would come from an API or CMS
  const blogPost = {
    id: 1,
    title: 'The Complete Guide to Choosing the Perfect Smartphone in 2024',
    slug: 'complete-guide-choosing-perfect-smartphone-2024',
    content: `
      <p>Choosing the right smartphone can be overwhelming with so many options available. This comprehensive guide will help you make an informed decision based on your needs and budget.</p>
      
      <h2>Key Factors to Consider</h2>
      
      <h3>1. Operating System</h3>
      <p>The choice between iOS and Android is fundamental. iOS offers a more streamlined experience with regular updates, while Android provides more customization options and variety in hardware.</p>
      
      <h3>2. Camera Quality</h3>
      <p>Modern smartphones have made significant strides in camera technology. Look for features like multiple lenses, night mode, and computational photography capabilities.</p>
      
      <h3>3. Battery Life</h3>
      <p>Battery capacity, measured in mAh, is crucial for all-day usage. Consider your usage patterns and look for phones with at least 4000mAh for heavy users.</p>
      
      <h3>4. Performance</h3>
      <p>The processor (chipset) determines how smoothly your phone runs. For 2024, look for the latest Snapdragon 8 Gen 3, Apple A17 Pro, or Google Tensor G3 chips.</p>
      
      <h2>Budget Considerations</h2>
      <p>Smartphones range from $200 to $1500+. Determine your budget first, then find the best phone within that range.</p>
      
      <h2>Top Recommendations for 2024</h2>
      <ul>
        <li><strong>Premium:</strong> iPhone 15 Pro, Samsung Galaxy S24 Ultra</li>
        <li><strong>Mid-range:</strong> Google Pixel 8a, OnePlus 12R</li>
        <li><strong>Budget:</strong> Samsung Galaxy A35, Nothing Phone 2a</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The perfect smartphone is one that fits your lifestyle, needs, and budget. Consider these factors carefully, and don't be swayed by marketing hype alone.</p>
    `,
    excerpt: 'A comprehensive guide to help you choose the perfect smartphone based on your needs, budget, and preferences in 2024.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '12 min read',
    category: 'Buying Guides',
    tags: ['Smartphones', 'Technology', 'Buying Guide', '2024'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop',
    relatedProducts: ['smartphone-1', 'smartphone-2', 'smartphone-3']
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <article className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge className="mb-4">{blogPost.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {blogPost.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{blogPost.excerpt}</p>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blogPost.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Author Bio */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {blogPost.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{blogPost.author}</h3>
                  <p className="text-gray-600 mb-3">
                    Senior Technology Writer with over 8 years of experience in consumer electronics and mobile technology.
                  </p>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">Technology</Badge>
                    <h3 className="font-semibold mb-2">Related Article Title {i}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Brief excerpt of the related article content...
                    </p>
                    <div className="text-xs text-gray-500">5 min read</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
