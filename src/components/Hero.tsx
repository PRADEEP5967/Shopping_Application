
import React from 'react';
import AdvancedHeroSection from './modern/AdvancedHeroSection';
import ModernCarousel from './ModernCarousel';

const Hero = () => {
  return (
    <div className="relative">
      {/* Advanced Hero Section */}
      <AdvancedHeroSection />
      
      {/* Traditional Carousel Section (can be toggled) */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <ModernCarousel />
        </div>
      </div>
    </div>
  );
};

export default Hero;
