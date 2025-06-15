import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';

// Import refactored components
import DealsHero from '@/components/deals/DealsHero';
import FlashSale from '@/components/deals/FlashSale';
import WeeklyDealBanner from '@/components/deals/WeeklyDealBanner';
import PopularDeals from '@/components/deals/PopularDeals';
import DealCategories from '@/components/deals/DealCategories';
import Clearance from '@/components/deals/Clearance';
import DealsNewsletter from '@/components/deals/DealsNewsletter';
import { getTimeRemaining, createDealProducts } from '@/components/deals/dealsUtils';

const DealsDiscounts = () => {
  const allProducts = getAllProducts();
  
  // Create mock sale products with discounted prices
  const dealProducts: Product[] = createDealProducts(allProducts.slice(0, 12), 12, 20); // 20% discount
  
  // Flash sale products (higher discount)
  const flashSaleProducts = createDealProducts(allProducts.slice(0, 4), 4, 40); // 40% discount
  
  // Clearance products
  const clearanceProducts = createDealProducts(allProducts.slice(8, 12), 4, 50); // 50% discount
  
  // Get time remaining for flash sale
  const timeRemaining = getTimeRemaining();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mt-4" />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <DealsHero />
        
        {/* Flash Sale */}
        <FlashSale products={flashSaleProducts} timeRemaining={timeRemaining} />
        
        {/* Weekly Deals Banner */}
        <WeeklyDealBanner />
        
        {/* Popular Deals */}
        <PopularDeals products={dealProducts.slice(4, 8)} />
        
        {/* Deal Categories */}
        <DealCategories />
        
        {/* Clearance */}
        <Clearance products={clearanceProducts} />
        
        {/* Newsletter */}
        <DealsNewsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default DealsDiscounts;
