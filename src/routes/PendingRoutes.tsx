
import React from 'react';
import { Route } from 'react-router-dom';
import Pending from '@/pages/Pending';
import OrderProcessingPending from '@/pages/OrderProcessingPending';
import PaymentPending from '@/pages/PaymentPending';
import AccountVerificationPending from '@/pages/AccountVerificationPending';

export const PendingRoutes = () => (
  <>
    <Route path="/pending" element={<Pending />} />
    <Route path="/pending/order-processing" element={<OrderProcessingPending />} />
    <Route path="/pending/payment" element={<PaymentPending />} />
    <Route path="/pending/account-verification" element={<AccountVerificationPending />} />
  </>
);
