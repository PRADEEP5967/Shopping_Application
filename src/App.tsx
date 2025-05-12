
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Orders />} />
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
