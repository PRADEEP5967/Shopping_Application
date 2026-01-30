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
    <section className="bg-gray-100 py-4">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to={banner.link}
              className="relative rounded-lg overflow-hidden group h-24 sm:h-32 md:h-40"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-70`} />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2">
                <h3 className="text-white font-bold text-sm sm:text-lg md:text-xl drop-shadow-lg">
                  {banner.title}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm md:text-base drop-shadow-md">
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
