import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Truck,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Badges */}
      <div className="container mx-auto py-8 px-4 border-b border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <CreditCard className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-gray-400">All major cards accepted</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Fast Shipping</h3>
              <p className="text-sm text-gray-400">Free on orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <RefreshCw className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-gray-400">30-day money back guarantee</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Secure Shopping</h3>
              <p className="text-sm text-gray-400">Your data is protected</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About & Contact */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Pradeep Sahani Mart</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Experience premium online shopping with Pradeep Sahani Mart - your one-stop solution for high-quality products and exceptional service.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>pradeepsahani8130s@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 8130885013</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Commerce St, Tech City, Noida</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/deals-discounts" className="text-gray-400 hover:text-primary transition-colors">
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link to="/performance" className="text-gray-400 hover:text-primary transition-colors">
                  Performance
                </Link>
              </li>
              <li>
                <Link to="/efficiency" className="text-gray-400 hover:text-primary transition-colors">
                  Efficiency
                </Link>
              </li>
              <li>
                <Link to="/quality" className="text-gray-400 hover:text-primary transition-colors">
                  Quality
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/my-account" className="text-gray-400 hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/order-history" className="text-gray-400 hover:text-primary transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-primary transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-400 hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button>Subscribe</Button>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2026 ER PRADEEP Pro. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-primary">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-primary">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
