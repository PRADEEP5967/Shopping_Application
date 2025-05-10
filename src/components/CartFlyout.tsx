
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const CartFlyout = () => {
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeItem, 
    updateQuantity, 
    subtotal,
    totalItems
  } = useCart();

  return (
    <div className={`cart-flyout ${isCartOpen ? 'cart-visible' : 'cart-hidden'}`}>
      {/* Cart Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart ({totalItems})</h2>
        <Button variant="ghost" size="icon" onClick={toggleCart}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-auto p-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
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
      {items.length > 0 && (
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{formatCurrency(subtotal)}</p>
          </div>
          <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="space-y-2">
            <Link to="/checkout" onClick={toggleCart} className="w-full">
              <Button className="w-full">
                Checkout
              </Button>
            </Link>
            <Button variant="outline" className="w-full" onClick={toggleCart}>
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartFlyout;
