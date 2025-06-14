import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, Search, ChevronDown, LayoutGrid } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from "@/components/ui/button"
import ThemeToggle from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/contexts/AuthContext';
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const ALL_PAGES = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Cart", to: "/cart" },
  { label: "My Account", to: "/my-account" },
  { label: "Orders", to: "/orders" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "About", to: "/about-us" },
  { label: "Contact", to: "/contact-us" },
  { label: "Deals & Discounts", to: "/deals-discounts" },
  { label: "Returns & Exchanges", to: "/returns-exchanges" },
  { label: "FAQ", to: "/faq" },
  { label: "Team", to: "/team" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Special Offers", to: "/special-offers" },
];

const CATEGORIES = [
  { label: "Smartphones", to: "/category/smartphone" },
  { label: "Monitors", to: "/category/monitor" },
  { label: "Shirts", to: "/category/shirt" },
  { label: "Dresses", to: "/category/dress" },
  { label: "Babies", to: "/category/baby" },
  { label: "Sofas", to: "/category/sofa" },
  { label: "Dumbbells", to: "/category/dumbbell" },
  { label: "Personal Care", to: "/category/heart" },
  { label: "Headphones", to: "/category/headphones" },
  { label: "TVs", to: "/category/tv" },
  { label: "Computers", to: "/category/computers" },
  { label: "Wearables", to: "/category/wearables" },
  // Add more categories as needed
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-40 dark:bg-gray-800 border-b dark:border-gray-700">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-xl text-gray-800 dark:text-white">
            E-Shop
          </Link>
        </div>
        <ul className="flex gap-3 items-center">
          {/* Nav links */}
          <li>
            <Link
              to="/"
              className={`font-medium transition text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 px-2 py-1 rounded ${
                pathname === '/' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`font-medium transition text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 px-2 py-1 rounded ${
                pathname === '/products' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className={`font-medium transition text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 px-2 py-1 rounded ${
                pathname === '/about-us' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className={`font-medium transition text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 px-2 py-1 rounded ${
                pathname === '/contact-us' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={
                    "flex items-center gap-1 px-2" +
                    (pathname.startsWith('/category') ? " bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "")
                  }
                >
                  <LayoutGrid className="h-4 w-4" />
                  Category
                  <ChevronDown className="ml-0.5 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                {CATEGORIES.map((cat) => (
                  <DropdownMenuItem key={cat.to} asChild>
                    <Link to={cat.to} className="w-full">
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <Link
              to="/category/smartphone"
              className={`font-medium transition text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 px-2 py-1 rounded ${
                pathname === '/category/smartphone' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''
              }`}
            >
              Smartphone
            </Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 px-2">
                  All Pages <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {ALL_PAGES.map((page) => (
                  <DropdownMenuItem key={page.to} asChild>
                    <Link to={page.to} className="w-full">
                      {page.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          {/* Search Input (Hidden on small screens) */}
          <div className="hidden md:flex items-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1">
            <Input type="search" placeholder="Search products..." className="border-none shadow-none focus-visible:ring-0 dark:bg-gray-900 text-sm" />
            <Search className="text-gray-500 dark:text-gray-400 w-4 h-4" />
          </div>

          {/* Actions: Theme Toggle, Cart, Auth */}
          <ThemeToggle />
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon" className="mr-2">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {user.firstName ? user.firstName.charAt(0).toUpperCase() : "?"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/my-account')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore our site and discover new products.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {ALL_PAGES.map((page) => (
                  <Link key={page.to} to={page.to} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 block">
                    {page.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link to="/my-account" className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 block">My Account</Link>
                    <Button variant="destructive" size="sm" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <Link to="/login" className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 block">Login</Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
