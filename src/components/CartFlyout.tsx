
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, LogIn, Lock, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';

const CartFlyout = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity, 
    subtotal,
    totalItems,
    clearCart
  } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleLogin = () => {
    toggleCart();
    navigate('/login', { state: { from: location.pathname } });
  };

  const accessDenied = !isAuthenticated;
  
  return (
    <motion.div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col`}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      {/* Cart Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Your Cart ({totalItems})
        </h2>
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-auto p-4">
        {accessDenied ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Access Restricted</h3>
            <p className="text-gray-500 mt-2 mb-6">You need to be logged in to view your cart.</p>
            <Button onClick={handleLogin} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Login to Continue
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="text-gray-500 mt-1">Looks like you haven't added any products yet.</p>
            <Button 
              className="mt-6" 
              onClick={toggleCart}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((item) => {
              const price = item.variant ? item.variant.price : item.product.price;
              const variantName = item.variant ? item.variant.name : '';
              
              return (
                <li key={`${item.product.id}-${item.variant?.id || 'default'}`} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      {variantName && (
                        <p className="text-xs text-gray-500">{variantName}</p>
                      )}
                      <div className="mt-1 flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Cart Footer */}
      {isAuthenticated && items.length > 0 && (
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{formatCurrency(subtotal)}</p>
          </div>
          <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          
          {isAdmin && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start mb-2">
              <ShieldCheck className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">Admin mode: You can view and manage this cart for testing purposes.</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Link to="/checkout" onClick={toggleCart} className="w-full">
              <Button className="w-full flex items-center gap-2">
                Checkout Now
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full" onClick={toggleCart}>
                Continue Shopping
              </Button>
              <Button 
                variant="outline"
                className="w-full text-red-500 border-red-200 hover:bg-red-50"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartFlyout;
