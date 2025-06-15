
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Clock, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerBehavior } from '@/hooks/useCustomerBehavior';
import { toast } from 'sonner';

interface PersonalizedOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
  category?: string;
  expiresAt: Date;
  targetAudience: string[];
  priority: 'high' | 'medium' | 'low';
}

const PersonalizedOffers: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { getPersonalizationData, trackEvent } = useCustomerBehavior();
  const [offers, setOffers] = useState<PersonalizedOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePersonalizedOffers();
  }, [isAuthenticated]);

  const generatePersonalizedOffers = async () => {
    setLoading(true);
    
    // Simulate AI-powered offer generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const personalizationData = getPersonalizationData();
    const generatedOffers: PersonalizedOffer[] = [];

    // Generate offers based on user behavior
    if (personalizationData.engagementLevel === 'high') {
      generatedOffers.push({
        id: '1',
        title: 'VIP Early Access',
        description: 'Get 20% off new arrivals before anyone else',
        discount: 20,
        type: 'percentage',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        targetAudience: ['high_engagement'],
        priority: 'high'
      });
    }

    if (personalizationData.purchaseBehavior === 'browser') {
      generatedOffers.push({
        id: '2',
        title: 'First Purchase Bonus',
        description: 'Get 15% off your first order + free shipping',
        discount: 15,
        type: 'percentage',
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        targetAudience: ['new_customers'],
        priority: 'high'
      });
    }

    if (personalizationData.preferredCategories.includes('electronics')) {
      generatedOffers.push({
        id: '3',
        title: 'Tech Enthusiast Deal',
        description: 'Special pricing on electronics category',
        discount: 12,
        type: 'percentage',
        category: 'electronics',
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        targetAudience: ['electronics_lovers'],
        priority: 'medium'
      });
    }

    // Add seasonal/universal offers
    generatedOffers.push({
      id: '4',
      title: 'Free Shipping Weekend',
      description: 'No minimum order required',
      discount: 0,
      type: 'free_shipping',
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      targetAudience: ['all'],
      priority: 'low'
    });

    setOffers(generatedOffers);
    setLoading(false);
  };

  const handleOfferClick = (offer: PersonalizedOffer) => {
    trackEvent('offer_clicked', {
      offerId: offer.id,
      offerType: offer.type,
      discount: offer.discount
    });

    toast.success(`Offer activated: ${offer.title}`);
    
    // Apply offer to user's session
    localStorage.setItem('activeOffer', JSON.stringify(offer));
  };

  const getOfferIcon = (type: string) => {
    switch (type) {
      case 'percentage':
      case 'fixed':
        return <Gift className="w-4 h-4" />;
      case 'free_shipping':
        return <Star className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Personalized Offers</h3>
          <p className="text-gray-600 mb-4">
            Sign in to see offers tailored just for you
          </p>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Personalized Offers</h2>
        <Button variant="outline" size="sm" onClick={generatePersonalizedOffers}>
          Refresh Offers
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="relative hover:shadow-lg transition-shadow">
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getPriorityColor(offer.priority)}`}></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getOfferIcon(offer.type)}
                  {offer.title}
                  {offer.discount > 0 && (
                    <Badge variant="secondary">
                      {offer.type === 'percentage' ? `${offer.discount}% OFF` : `$${offer.discount} OFF`}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    Expires in {formatTimeRemaining(offer.expiresAt)}
                  </div>
                  {offer.category && (
                    <Badge variant="outline">{offer.category}</Badge>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handleOfferClick(offer)}
                >
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizedOffers;
