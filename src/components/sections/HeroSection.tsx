
import React from 'react';
import { ModernHero } from '@/components/modern/ModernHero';
import ModernCategoryNav from '@/components/ModernCategoryNav';

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Modern Hero Section */}
      <ModernHero />
      
      <ModernCategoryNav />
    </>
  );
};
