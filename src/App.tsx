import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAccount from "./pages/MyAccount";
import OrderHistory from "./pages/OrderHistory";
import WishlistPage from "./pages/WishlistPage";
import ShoppingPolicy from "./pages/ShoppingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import FAQ from "./pages/FAQ";
import NewArrivals from "./pages/NewArrivals";
import DealsDiscounts from "./pages/DealsDiscounts";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductAdd from "./pages/AdminProductAdd";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Create and configure the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetail />} />
                  <Route path="/category/:categoryName" element={<CategoryPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/my-account" element={<MyAccount />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/shopping-policy" element={<ShoppingPolicy />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/deals" element={<DealsDiscounts />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/add-product" element={<AdminProductAdd />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
