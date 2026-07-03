import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { getProductById } from '@/data/products';
import FlipkartDealCarousel from './FlipkartDealCarousel';

const RecentlyViewedSection: React.FC = () => {
  const { ids } = useRecentlyViewed();

  const deals = useMemo(() => {
    return ids
      .map((id) => getProductById(id))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images[0],
        price: p.price,
        originalPrice: p.originalPrice || Math.round(p.price * 1.4),
        discount: p.originalPrice
          ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
          : 25,
        rating: p.rating,
      }));
  }, [ids]);

  if (deals.length === 0) return null;

  return (
    <FlipkartDealCarousel
      title="Recently Viewed"
      icon={<Clock className="w-5 h-5 text-primary" />}
      bgColor="bg-gradient-to-r from-indigo-700 to-violet-700"
      deals={deals}
    />
  );
};

export default RecentlyViewedSection;