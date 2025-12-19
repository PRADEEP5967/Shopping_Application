import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageWrapper } from '@/components/PageWrapper';

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
      <Route path="/" element={<PageWrapper pageName="Home"><Index /></PageWrapper>} />
      <Route path="/products" element={<PageWrapper pageName="Products"><Products /></PageWrapper>} />
      <Route path="/product/:productId" element={<PageWrapper pageName="Product Details"><ProductDetail /></PageWrapper>} />
      
      {/* E-commerce Flow */}
      <Route path="/cart" element={<PageWrapper pageName="Shopping Cart"><Cart /></PageWrapper>} />
      <Route path="/wishlist" element={<PageWrapper pageName="Wishlist"><WishlistPage /></PageWrapper>} />
      <Route path="/checkout" element={<PageWrapper pageName="Checkout"><Checkout /></PageWrapper>} />
      <Route path="/order-confirmation" element={<PageWrapper pageName="Order Confirmation"><OrderConfirmation /></PageWrapper>} />
      <Route path="/orders" element={<PageWrapper pageName="Orders"><Orders /></PageWrapper>} />
      <Route path="/order-tracking" element={<PageWrapper pageName="Order Tracking"><OrderTracking /></PageWrapper>} />
      <Route path="/order-tracking/:orderId" element={<PageWrapper pageName="Order Tracking"><OrderTracking /></PageWrapper>} />
      <Route path="/order-detail/:orderId" element={<PageWrapper pageName="Order Details"><OrderDetail /></PageWrapper>} />
      <Route path="/order-history" element={<PageWrapper pageName="Order History"><OrderHistory /></PageWrapper>} />
      
      {/* Categories */}
      <Route path="/categories" element={<PageWrapper pageName="Categories"><CategoriesPage /></PageWrapper>} />
      <Route path="/category/:categoryName" element={<PageWrapper pageName="Category"><CategoryProductsPage /></PageWrapper>} />
      <Route path="/category/clothing" element={<PageWrapper pageName="Clothing"><ClothingPage /></PageWrapper>} />
      <Route path="/category/electronics" element={<PageWrapper pageName="Electronics"><ElectronicsPage /></PageWrapper>} />
      <Route path="/category/accessories" element={<PageWrapper pageName="Accessories"><AccessoriesPage /></PageWrapper>} />
      <Route path="/category/baby" element={<PageWrapper pageName="Baby Products"><BabyPage /></PageWrapper>} />
      <Route path="/category/heart" element={<PageWrapper pageName="Health"><HeartPage /></PageWrapper>} />
      <Route path="/category/tv" element={<PageWrapper pageName="TV & Entertainment"><TvPage /></PageWrapper>} />
      <Route path="/category/sofa" element={<PageWrapper pageName="Furniture"><SofaPage /></PageWrapper>} />
      <Route path="/category/dumbbell" element={<PageWrapper pageName="Fitness"><DumbbellPage /></PageWrapper>} />
      <Route path="/category/smart-home" element={<PageWrapper pageName="Smart Home"><SmartHomePage /></PageWrapper>} />
      <Route path="/category/gaming" element={<PageWrapper pageName="Gaming"><GamingPage /></PageWrapper>} />
      <Route path="/category/photography" element={<PageWrapper pageName="Photography"><PhotographyPage /></PageWrapper>} />
      
      {/* Search & Discovery */}
      <Route path="/search" element={<PageWrapper pageName="Search"><SearchPage /></PageWrapper>} />
      <Route path="/visual-search" element={<PageWrapper pageName="Visual Search"><VisualSearchPage /></PageWrapper>} />
      <Route path="/product-comparison" element={<PageWrapper pageName="Product Comparison"><ProductComparison /></PageWrapper>} />
      
      {/* Content & Blog */}
      <Route path="/blog" element={<PageWrapper pageName="Blog"><Blog /></PageWrapper>} />
      <Route path="/blog/:slug" element={<PageWrapper pageName="Blog Post"><BlogPost /></PageWrapper>} />
      <Route path="/buying-guides" element={<PageWrapper pageName="Buying Guides"><BuyingGuides /></PageWrapper>} />
      <Route path="/buying-guides/:category" element={<PageWrapper pageName="Buying Guides"><BuyingGuides /></PageWrapper>} />
      
      {/* Deals & Offers */}
      <Route path="/deals" element={<PageWrapper pageName="Deals"><DealsDiscounts /></PageWrapper>} />
      <Route path="/deals-discounts" element={<PageWrapper pageName="Deals & Discounts"><DealsDiscounts /></PageWrapper>} />
      <Route path="/special-offers" element={<PageWrapper pageName="Special Offers"><SpecialOffers /></PageWrapper>} />
      <Route path="/new-arrivals" element={<PageWrapper pageName="New Arrivals"><NewArrivals /></PageWrapper>} />
      <Route path="/offers" element={<PageWrapper pageName="Personalized Offers"><PersonalizedOffersPage /></PageWrapper>} />
      
      {/* Auth & Account */}
      <Route path="/login" element={<PageWrapper pageName="Login"><Login /></PageWrapper>} />
      <Route path="/register" element={<PageWrapper pageName="Register"><Register /></PageWrapper>} />
      <Route path="/my-account" element={<PageWrapper pageName="My Account"><MyAccount /></PageWrapper>} />
      
      {/* Business Pages */}
      <Route path="/about" element={<PageWrapper pageName="About Us"><About /></PageWrapper>} />
      <Route path="/services" element={<PageWrapper pageName="Services"><Services /></PageWrapper>} />
      <Route path="/team" element={<PageWrapper pageName="Our Team"><Team /></PageWrapper>} />
      <Route path="/careers" element={<PageWrapper pageName="Careers"><Careers /></PageWrapper>} />
      <Route path="/portfolio" element={<PageWrapper pageName="Portfolio"><Portfolio /></PageWrapper>} />
      <Route path="/small-business" element={<PageWrapper pageName="Small Business"><SmallBusinessPage /></PageWrapper>} />
      
      {/* Information & Policies */}
      <Route path="/contact" element={<PageWrapper pageName="Contact Us"><Contact /></PageWrapper>} />
      <Route path="/faq" element={<PageWrapper pageName="FAQ"><FAQ /></PageWrapper>} />
      <Route path="/terms" element={<PageWrapper pageName="Terms of Service"><TermsOfService /></PageWrapper>} />
      <Route path="/return-policy" element={<PageWrapper pageName="Return Policy"><ReturnPolicy /></PageWrapper>} />
      <Route path="/shopping-policy" element={<PageWrapper pageName="Shopping Policy"><ShoppingPolicy /></PageWrapper>} />
      <Route path="/returns" element={<PageWrapper pageName="Returns & Exchanges"><ReturnsExchanges /></PageWrapper>} />
      
      {/* Feature Pages */}
      <Route path="/efficiency" element={<PageWrapper pageName="Efficiency"><Efficiency /></PageWrapper>} />
      <Route path="/performance" element={<PageWrapper pageName="Performance"><Performance /></PageWrapper>} />
      <Route path="/quality" element={<PageWrapper pageName="Quality"><Quality /></PageWrapper>} />
      <Route path="/subscriptions" element={<PageWrapper pageName="Subscriptions"><SubscriptionsPage /></PageWrapper>} />
      <Route path="/api-showcase" element={<PageWrapper pageName="API Showcase"><ApiShowcase /></PageWrapper>} />
    </Routes>
  );
};

export default MainRoutes;
