
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Products from '@/pages/Products';
import CategoryProductsPage from '@/pages/CategoryProductsPage';
import CategoriesPage from '@/pages/CategoriesPage';
import ProductDetail from '@/pages/ProductDetail';
import MyAccount from '@/pages/MyAccount';
import WishlistPage from '@/pages/WishlistPage';
import Orders from '@/pages/Orders';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import Portfolio from '@/pages/Portfolio';
import Team from '@/pages/Team';
import Blog from '@/pages/Blog';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import FAQ from '@/pages/FAQ';
import ReturnPolicy from '@/pages/ReturnPolicy';
import ShoppingPolicy from '@/pages/ShoppingPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NewArrivals from '@/pages/NewArrivals';
import OrderHistory from '@/pages/OrderHistory';
import OrderDetail from '@/pages/OrderDetail';
import DealsDiscounts from '@/pages/DealsDiscounts';
import ReturnsExchanges from '@/pages/ReturnsExchanges';
import SearchPage from '@/pages/SearchPage';
import Careers from '@/pages/Careers';
import WearablesPage from '@/pages/WearablesPage';
import SmartHomePage from '@/pages/SmartHomePage';
import ComputersPage from '@/pages/ComputersPage';
import SpecialOffers from '@/pages/SpecialOffers';

// Feature Pages
import Performance from '@/pages/Performance';
import Efficiency from '@/pages/Efficiency';
import Quality from '@/pages/Quality';

export const MainRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/products" element={<Products />} />
    <Route path="/categories" element={<CategoriesPage />} />
    <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
    
    {/* Feature Pages */}
    <Route path="/performance" element={<Performance />} />
    <Route path="/efficiency" element={<Efficiency />} />
    <Route path="/quality" element={<Quality />} />
    <Route path="/deals-discounts" element={<DealsDiscounts />} />
    <Route path="/returns-exchanges" element={<ReturnsExchanges />} />
    
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/my-account" element={<MyAccount />} />
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
    <Route path="/order-history" element={<OrderHistory />} />
    <Route path="/order-detail/:orderId" element={<OrderDetail />} />
    <Route path="/new-arrivals" element={<NewArrivals />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/return-policy" element={<ReturnPolicy />} />
    <Route path="/shipping-policy" element={<ShoppingPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/about-us" element={<About />} />
    <Route path="/contact-us" element={<Contact />} />
    <Route path="/services" element={<Services />} />
    <Route path="/portfolio" element={<Portfolio />} />
    <Route path="/team" element={<Team />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/wearables" element={<WearablesPage />} />
    <Route path="/smart-home" element={<SmartHomePage />} />
    <Route path="/computers" element={<ComputersPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/special-offers" element={<SpecialOffers />} />
  </>
);
