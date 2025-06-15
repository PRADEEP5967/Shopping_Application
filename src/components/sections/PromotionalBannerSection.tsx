
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Percent, Star, ArrowRight } from 'lucide-react';

export const PromotionalBannerSection: React.FC = () => {
  const promotions = [
    {
      id: 1,
      title: "Flash Sale Weekend",
      subtitle: "Up to 70% OFF",
      description: "Limited time offer on electronics, fashion & more",
      cta: "Shop Now",
      link: "/deals",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop",
      gradient: "from-red-500 to-orange-500",
      icon: <Clock className="h-5 w-5" />,
      badge: "Ends Soon",
      timeLeft: "2 Days Left"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh Collection",
      description: "Discover the latest trends and innovations",
      cta: "Explore",
      link: "/new-arrivals",
      image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2187&auto=format&fit=crop",
      gradient: "from-blue-500 to-purple-500",
      icon: <Star className="h-5 w-5" />,
      badge: "New",
      timeLeft: null
    }
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {promotions.map((promo) => (
            <div key={promo.id} className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={promo.image} 
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient} opacity-80`} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 text-white min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-2 rounded-full">
                      {promo.icon}
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {promo.badge}
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    {promo.title}
                  </h2>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 opacity-90">
                    {promo.subtitle}
                  </p>
                  <p className="text-base sm:text-lg opacity-90 mb-6">
                    {promo.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    {promo.timeLeft && (
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">{promo.timeLeft}</span>
                      </div>
                    )}
                    <Link to={promo.link}>
                      <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold group">
                        {promo.cta}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
