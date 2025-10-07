
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity: number, variant?: ProductVariant) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    const price = item.variant ? item.variant.price : item.product.price;
    return total + (price * item.quantity);
  }, 0);

  useEffect(() => {
    if (isAuthenticated) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart from localStorage', error);
        }
      }
    } else {
      setItems([]);
      setIsCartOpen(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addItem = (product: Product, quantity: number, variant?: ProductVariant) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item =>
        item.product.id === product.id &&
        (!variant || (item.variant?.id === variant.id))
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedItems;
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { product, quantity, variant }];
      }
    });
  };

  const removeItem = (productId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage cart');
      return;
    }

    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      toast.info('Item removed from cart');
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage cart');
      return;
    }

    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage cart');
      return;
    }

    setItems([]);
    toast.info('Cart cleared');
  };

  // Toggle cart open/closed
  const toggleCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to view cart');
      return;
    }
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
