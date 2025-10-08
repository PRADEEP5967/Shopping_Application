import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Core Pages
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';

// E-commerce Flow
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
import OrderTracking from '@/pages/OrderTracking';
import OrderDetail from '@/pages/OrderDetail';
import OrderHistory from '@/pages/OrderHistory';
import OrderConfirmation from '@/pages/OrderConfirmation';
import WishlistPage from '@/pages/WishlistPage';

// Category Pages
import CategoriesPage from '@/pages/CategoriesPage';
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

// Search & Discovery
import SearchPage from '@/pages/SearchPage';
import VisualSearchPage from '@/pages/VisualSearchPage';
import ProductComparison from '@/pages/ProductComparison';

// Content Pages
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import BuyingGuides from '@/pages/BuyingGuides';

// Deals & Offers
import DealsDiscounts from '@/pages/DealsDiscounts';
import SpecialOffers from '@/pages/SpecialOffers';
import NewArrivals from '@/pages/NewArrivals';
import PersonalizedOffersPage from '@/pages/PersonalizedOffersPage';

// Account & Auth
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MyAccount from '@/pages/MyAccount';

// Business Pages
import About from '@/pages/About';
import Services from '@/pages/Services';
import Team from '@/pages/Team';
import Careers from '@/pages/Careers';
import Portfolio from '@/pages/Portfolio';
import SmallBusinessPage from '@/pages/SmallBusinessPage';

// Information Pages
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import TermsOfService from '@/pages/TermsOfService';
import ReturnPolicy from '@/pages/ReturnPolicy';
import ShoppingPolicy from '@/pages/ShoppingPolicy';
import ReturnsExchanges from '@/pages/ReturnsExchanges';

// Feature Pages
import Efficiency from '@/pages/Efficiency';
import Performance from '@/pages/Performance';
import Quality from '@/pages/Quality';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import ApiShowcase from '@/pages/ApiShowcase';

const MainRoutes = () => {
  return (
    <Routes>
      {/* Core Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      
      {/* E-commerce Flow */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
      <Route path="/order-detail/:orderId" element={<OrderDetail />} />
      <Route path="/order-history" element={<OrderHistory />} />
      
      {/* Categories */}
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
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
      
      {/* Search & Discovery */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/visual-search" element={<VisualSearchPage />} />
      <Route path="/product-comparison" element={<ProductComparison />} />
      
      {/* Content & Blog */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/buying-guides" element={<BuyingGuides />} />
      <Route path="/buying-guides/:category" element={<BuyingGuides />} />
      
      {/* Deals & Offers */}
      <Route path="/deals" element={<DealsDiscounts />} />
      <Route path="/special-offers" element={<SpecialOffers />} />
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/offers" element={<PersonalizedOffersPage />} />
      
      {/* Auth & Account */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-account" element={<MyAccount />} />
      
      {/* Business Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/team" element={<Team />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/small-business" element={<SmallBusinessPage />} />
      
      {/* Information & Policies */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/shopping-policy" element={<ShoppingPolicy />} />
      <Route path="/returns" element={<ReturnsExchanges />} />
      
      {/* Feature Pages */}
      <Route path="/efficiency" element={<Efficiency />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/quality" element={<Quality />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/api-showcase" element={<ApiShowcase />} />
    </Routes>
  );
};

export default MainRoutes;
