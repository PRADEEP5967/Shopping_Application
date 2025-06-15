
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
import Categories from '@/pages/Categories';
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

export const MainRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
    
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
  </>
);
