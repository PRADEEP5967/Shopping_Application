
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const DealsSection = () => {
  // Simulating different deal types
  const deals = [
    {
      title: "Flash Sale",
      description: "Up to 60% off",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop",
      link: "/products",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "New Arrivals",
      description: "Latest Products",
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2187&auto=format&fit=crop",
      link: "/products",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Best Sellers",
      description: "Most Popular Items",
      image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2187&auto=format&fit=crop",
      link: "/products",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-8 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deals.map((deal, index) => (
          <Link to={deal.link} key={index}>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`h-32 relative bg-gradient-to-r ${deal.color} flex items-center justify-center`}>
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <img 
                    src={deal.image} 
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="z-10 text-center text-white">
                  <h3 className="text-xl font-bold mb-1">{deal.title}</h3>
                  <p>{deal.description}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Limited time offer</span>
                  <span className="text-sm font-semibold text-primary">Shop Now →</span>
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
