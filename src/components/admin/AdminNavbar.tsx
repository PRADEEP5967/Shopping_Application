import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Settings, 
  LogOut, 
  Home, 
  ShoppingCart, 
  Search,
  Sparkles,
  ChevronDown,
  Zap,
  Command
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

// Modern navbar button component
const NavButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  badge?: number;
  gradient?: boolean;
}> = ({ children, className, onClick, badge, gradient }) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "relative flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-300",
      gradient 
        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
        : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900",
      className
    )}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
    {badge !== undefined && badge > 0 && (
      <motion.span 
        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {badge}
      </motion.span>
    )}
  </motion.button>
);

export const AdminNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <img
                  src="/lovable-uploads/ed6f414d-1f2f-430f-93d3-758d4fd9738f.png"
                  alt="Pradeep Sahani Logo"
                  className="relative h-10 w-10 rounded-xl object-cover shadow-lg ring-2 ring-white"
                />
              </motion.div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  PRADEEP SAHANI
                </span>
                <span className="text-xs font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  MART
                </span>
              </div>
            </Link>
            
            <Badge className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-lg shadow-violet-500/25 px-3 py-1">
              <Zap className="h-3 w-3" />
              Admin Panel
            </Badge>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <motion.div 
              className={cn(
                "relative w-full transition-all duration-300",
                searchFocused && "scale-105"
              )}
            >
              <div className={cn(
                "absolute inset-0 rounded-xl transition-all duration-300",
                searchFocused 
                  ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl" 
                  : "bg-transparent"
              )} />
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products, orders, customers..."
                  className={cn(
                    "pl-10 pr-20 h-11 rounded-xl border-gray-200/80 bg-gray-50/80 focus:bg-white transition-all duration-300",
                    searchFocused && "ring-2 ring-violet-500/30 border-violet-300"
                  )}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <div className="absolute right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-xs text-gray-500">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/">
                <NavButton>
                  <Home className="h-4 w-4" />
                </NavButton>
              </Link>
              
              <Link to="/admin/add-product">
                <NavButton gradient>
                  <ShoppingCart className="h-4 w-4" />
                </NavButton>
              </Link>
            </div>

            {/* Notifications */}
            <NavButton badge={3}>
              <Bell className="h-4 w-4" />
            </NavButton>

            {/* Settings */}
            <NavButton>
              <Settings className="h-4 w-4" />
            </NavButton>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-1" />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/80 hover:from-gray-100 hover:to-gray-200/80 transition-all duration-300 border border-gray-200/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8 ring-2 ring-violet-500/30">
                      <AvatarImage 
                        src="https://avatars.githubusercontent.com/u/your-github-username" 
                        alt="Pradeep Sahani" 
                      />
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-bold">
                        PS
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-700">Pradeep</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      Super Admin
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 p-2 bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-xl"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                        PS
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">Pradeep Sahani</p>
                      <p className="text-xs text-gray-500">admin@pradeepsahani.com</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="h-8 w-8 rounded-lg bg-violet-100 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-violet-600" />
                  </div>
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Notifications</span>
                  <Badge className="ml-auto bg-rose-500 text-white">3</Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  <div className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center">
                    <LogOut className="h-4 w-4 text-rose-600" />
                  </div>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
