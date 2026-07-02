import React from 'react';
import { Link } from 'react-router-dom';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop',
    title: 'Audio Sale',
    subtitle: 'Up to 70% Off',
    link: '/category/audio',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop',
    title: 'Footwear Fest',
    subtitle: 'Min 40% Off',
    link: '/category/shoes',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=200&fit=crop',
    title: 'Wearables',
    subtitle: 'Starting ₹999',
    link: '/category/wearables',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=200&fit=crop',
    title: 'Home Decor',
    subtitle: 'Flat 50% Off',
    link: '/category/furniture',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const FlipkartBannerStrip: React.FC = () => {
  return (
    <section className="py-10 border-y border-border/40">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="relative rounded-md overflow-hidden group h-32 sm:h-44 md:h-56 border border-border hover:border-primary/60 transition-all"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end items-start text-left p-4 sm:p-6">
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-primary/90 mb-2">Featured</span>
                <h3 className="font-display text-foreground font-extrabold text-base sm:text-xl md:text-2xl uppercase tracking-tight leading-tight">
                  {banner.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                  {banner.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipkartBannerStrip;
