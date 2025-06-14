
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

// Import route modules
import { MainRoutes } from './MainRoutes';
import { AdminRoutes } from './AdminRoutes';
import { PendingRoutes } from './PendingRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Application Routes */}
      {MainRoutes}
      
      {/* Admin Routes */}
      {AdminRoutes}
      
      {/* Pending Routes */}
      {PendingRoutes}
      
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
