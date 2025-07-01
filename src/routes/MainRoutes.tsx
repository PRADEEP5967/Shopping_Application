import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from '@/pages/ProductDetail';
import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
import Cart from '@/pages/Cart';
import CategoryProductsPage from '@/pages/CategoryProductsPage';
import ClothingPage from '@/pages/ClothingPage';
import ElectronicsPage from '@/pages/ElectronicsPage';
import AccessoriesPage from '@/pages/AccessoriesPage';
import BabyPage from '@/pages/BabyPage';
import HeartPage from '@/pages/HeartPage';
import TvPage from '@/pages/TvPage';
import SofaPage from '@/pages/SofaPage';
import DumbbellPage from '@/pages/DumbbellPage';
import SmartHomePage from '@/pages/SmartHomePage';
import GamingPage from '@/pages/GamingPage';
import PhotographyPage from '@/pages/PhotographyPage';
import Products from '@/pages/Products';
import Index from '@/pages/Index';
import CategoriesPage from '@/pages/CategoriesPage';
import SearchPage from '@/pages/SearchPage';
import VisualSearchPage from '@/pages/VisualSearchPage';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import OrderTracking from '@/pages/OrderTracking';
import OrderDetail from '@/pages/OrderDetail';
import OrderHistory from '@/pages/OrderHistory';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import BuyingGuides from '@/pages/BuyingGuides';
import ProductComparison from '@/pages/ProductComparison';
import PersonalizedOffersPage from '@/pages/PersonalizedOffersPage';
import ApiShowcase from '@/pages/ApiShowcase';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
      <Route path="/order-detail/:orderId" element={<OrderDetail />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
      
      {/* Blog and Content Routes */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/buying-guides" element={<BuyingGuides />} />
      <Route path="/buying-guides/:category" element={<BuyingGuides />} />
      <Route path="/product-comparison" element={<ProductComparison />} />
      
      {/* Specific Category Pages */}
      <Route path="/category/clothing" element={<ClothingPage />} />
      <Route path="/category/electronics" element={<ElectronicsPage />} />
      <Route path="/category/accessories" element={<AccessoriesPage />} />
      <Route path="/category/baby" element={<BabyPage />} />
      <Route path="/category/heart" element={<HeartPage />} />
      <Route path="/category/tv" element={<TvPage />} />
      <Route path="/category/sofa" element={<SofaPage />} />
      <Route path="/category/dumbbell" element={<DumbbellPage />} />
      <Route path="/category/smart-home" element={<SmartHomePage />} />
      <Route path="/category/gaming" element={<GamingPage />} />
      <Route path="/category/photography" element={<PhotographyPage />} />
      
      {/* Analytics and Personalization Routes */}
      <Route path="/offers" element={<PersonalizedOffersPage />} />
      <Route path="/visual-search" element={<VisualSearchPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/api-showcase" element={<ApiShowcase />} />
    </Routes>
  );
};

export default MainRoutes;
