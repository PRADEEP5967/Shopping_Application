
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Percent, Clock, Star, Sparkles } from 'lucide-react'; // FIXED: Added Sparkles here

const DealsSection = () => {
  // Simulating different deal types
  const deals = [
    {
      title: "Flash Sale",
      description: "Up to 60% off",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop",
      link: "/deals",
      color: "from-red-500 to-orange-500",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Special Offers",
      description: "Modern curated deals",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      link: "/special-offers",
      color: "from-pink-500 to-primary",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: "New Arrivals",
      description: "Latest Products",
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2187&auto=format&fit=crop",
      link: "/new-arrivals",
      color: "from-blue-500 to-indigo-500",
      icon: <Star className="h-5 w-5" />
    },
    {
      title: "Best Sellers",
      description: "Most Popular Items",
      image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2187&auto=format&fit=crop",
      link: "/products",
      color: "from-green-500 to-teal-500",
      icon: <Percent className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-8 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        Special Offers
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded-full">HOT</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((deal, index) => (
          <Link to={deal.link} key={index} className="group">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className={`h-32 relative bg-gradient-to-r ${deal.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="z-10 text-center text-white">
                  <div className="flex items-center justify-center mb-2">
                    <div className="bg-white/20 p-2 rounded-full">
                      {deal.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{deal.title}</h3>
                  <p>{deal.description}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Limited time offer</span>
                  <span className="text-sm font-semibold text-primary flex items-center group-hover:translate-x-1 transition-transform">
                    Shop Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DealsSection;

