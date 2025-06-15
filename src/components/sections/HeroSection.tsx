
import React from 'react';
import { ModernHero } from '@/components/modern/ModernHero';
import ModernCategoryNav from '@/components/ModernCategoryNav';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full">
      {/* Modern Hero Section - fully responsive */}
      <div className="w-full">
        <ModernHero />
      </div>
      
      {/* Category Navigation - responsive layout */}
      <div className="w-full">
        <ModernCategoryNav />
      </div>
    </div>
  );
};
