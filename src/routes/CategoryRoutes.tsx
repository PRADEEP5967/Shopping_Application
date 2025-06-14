
import React from 'react';
import { Route } from 'react-router-dom';
import SmartphonePage from '@/pages/SmartphonePage';
import MonitorPage from '@/pages/MonitorPage';
import ShirtPage from '@/pages/ShirtPage';
import DressPage from '@/pages/DressPage';
import BabyToyPage from '@/pages/BabyToyPage';
import SofaPage from '@/pages/SofaPage';

export const CategoryRoutes = () => (
  <>
    <Route path="/category/smartphone" element={<SmartphonePage />} />
    <Route path="/category/monitor" element={<MonitorPage />} />
    <Route path="/category/shirt" element={<ShirtPage />} />
    <Route path="/category/dress" element={<DressPage />} />
    <Route path="/category/baby-toy" element={<BabyToyPage />} />
    <Route path="/category/sofa" element={<SofaPage />} />
  </>
);
