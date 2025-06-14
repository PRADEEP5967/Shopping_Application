
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

// Import route modules
import { MainRoutes } from './MainRoutes';
import { AdminRoutes } from './AdminRoutes';
import { CategoryRoutes } from './CategoryRoutes';
import { PendingRoutes } from './PendingRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Application Routes */}
      <MainRoutes />
      
      {/* Admin Routes */}
      <AdminRoutes />
      
      {/* Category Routes */}
      <CategoryRoutes />
      
      {/* Pending Routes */}
      <PendingRoutes />
      
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
