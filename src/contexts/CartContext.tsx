
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

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
      loadCartItems();
    } else {
      setItems([]);
      setIsCartOpen(false);
    }
  }, [isAuthenticated]);

  const loadCartItems = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (error) {
            console.error('Failed to parse cart from localStorage', error);
          }
        }
        return;
      }

      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', session.session.user.id);

      if (error) throw error;

      if (cartItems && cartItems.length > 0) {
        const loadedItems: CartItem[] = [];

        for (const item of cartItems) {
          const { data: productData } = await supabase
            .from('products')
            .select('*')
            .eq('id', item.product_id)
            .maybeSingle();

          if (productData) {
            loadedItems.push({
              product: {
                id: productData.id,
                name: productData.name,
                description: productData.description || '',
                price: productData.price,
                category: productData.category,
                image: productData.image || '',
                images: (productData.images as string[]) || [],
                rating: productData.rating,
                stock: productData.stock,
                brand: productData.brand || '',
                features: (productData.features as string[]) || [],
              },
              quantity: item.quantity,
              variant: item.variant_id ? undefined : undefined,
            });
          }
        }

        setItems(loadedItems);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart from localStorage', error);
        }
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && items.length > 0) {
      syncCartToSupabase();
    }
    if (isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const syncCartToSupabase = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      for (const item of items) {
        await supabase
          .from('cart_items')
          .upsert({
            user_id: session.session.user.id,
            product_id: item.product.id,
            quantity: item.quantity,
            variant_id: item.variant?.id || null,
          }, {
            onConflict: 'user_id,product_id,variant_id'
          });
      }
    } catch (error) {
      console.error('Error syncing cart to Supabase:', error);
    }
  };

  const addItem = async (product: Product, quantity: number, variant?: ProductVariant) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session) {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: session.session.user.id,
            product_id: product.id,
            quantity: quantity,
            variant_id: variant?.id || null,
          }, {
            onConflict: 'user_id,product_id,variant_id'
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
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

  const removeItem = async (productId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage cart');
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', session.session.user.id)
          .eq('product_id', productId);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }

    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      toast.info('Item removed from cart');
      return updatedItems;
    });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to manage cart');
      return;
    }

    if (quantity < 1) {
      await removeItem(productId);
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session) {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', session.session.user.id)
          .eq('product_id', productId);
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage cart');
      return;
    }

    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', session.session.user.id);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
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
