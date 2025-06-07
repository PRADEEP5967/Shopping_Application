
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ReviewsProvider } from '@/contexts/ReviewsContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Products from '@/pages/Products';
import CategoryPage from '@/pages/CategoryPage';
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
import NotFound from '@/pages/NotFound';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminProductAdd from '@/pages/AdminProductAdd';
import AdminProducts from '@/pages/admin/Products';
import AdminOrders from '@/pages/admin/Orders';
import AdminCustomers from '@/pages/admin/Customers';
import AdminCategories from '@/pages/admin/Categories';
import AdminDiscounts from '@/pages/admin/Discounts';
import AdminInventory from '@/pages/admin/Inventory';
import AdminAnalytics from '@/pages/admin/Analytics';
import AdminActivity from '@/pages/admin/Activity';
import AdminABTesting from '@/pages/admin/ABTesting';
import AdminSettings from '@/pages/admin/Settings';
import AdminNotifications from '@/pages/admin/Notifications';
import AdminHelp from '@/pages/admin/Help';
import AdminPages from '@/pages/admin/Pages';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ReviewsProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<CategoryPage />} />
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
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={
                      <AdminDashboardLayout title="Dashboard">
                        <AdminDashboard />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/add-product" element={
                      <AdminDashboardLayout title="Add Product">
                        <AdminProductAdd />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/products" element={
                      <AdminDashboardLayout title="Product Management">
                        <AdminProducts />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/orders" element={
                      <AdminDashboardLayout title="Order Management">
                        <AdminOrders />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/customers" element={
                      <AdminDashboardLayout title="Customer Management">
                        <AdminCustomers />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/categories" element={
                      <AdminDashboardLayout title="Category Management">
                        <AdminCategories />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/discounts" element={
                      <AdminDashboardLayout title="Discount Management">
                        <AdminDiscounts />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/inventory" element={
                      <AdminDashboardLayout title="Inventory Management">
                        <AdminInventory />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/analytics" element={
                      <AdminDashboardLayout title="Analytics Dashboard">
                        <AdminAnalytics />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/activity" element={
                      <AdminDashboardLayout title="Activity Log">
                        <AdminActivity />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/ab-testing" element={
                      <AdminDashboardLayout title="A/B Testing">
                        <AdminABTesting />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/settings" element={
                      <AdminDashboardLayout title="Settings">
                        <AdminSettings />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/notifications" element={
                      <AdminDashboardLayout title="Notifications">
                        <AdminNotifications />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/help" element={
                      <AdminDashboardLayout title="Help & Documentation">
                        <AdminHelp />
                      </AdminDashboardLayout>
                    } />
                    <Route path="/admin/pages" element={
                      <AdminDashboardLayout title="Page Management">
                        <AdminPages />
                      </AdminDashboardLayout>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </div>
              </Router>
            </ReviewsProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
