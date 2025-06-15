
import React from 'react';
import { Route } from 'react-router-dom';
import WishlistPage from '@/pages/WishlistPage';
import NewArrivals from '@/pages/NewArrivals';
import MyAccount from '@/pages/MyAccount';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import OrderConfirmation from '@/pages/OrderConfirmation';

export const PendingRoutes = (
  <>
    <Route path="/wishlist" element={<WishlistPage />} />
    <Route path="/new-arrivals" element={<NewArrivals />} />
    <Route path="/my-account" element={<MyAccount />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/order-confirmation" element={<OrderConfirmation />} />
  </>
);
