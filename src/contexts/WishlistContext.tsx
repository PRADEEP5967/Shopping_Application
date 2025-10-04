
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type WishlistContextType = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          setItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Failed to parse wishlist from localStorage', error);
        }
      }
    }
  }, [isAuthenticated]);

  const loadWishlist = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          try {
            setItems(JSON.parse(savedWishlist));
          } catch (error) {
            console.error('Failed to parse wishlist from localStorage', error);
          }
        }
        return;
      }

      const { data: wishlistItems, error } = await supabase
        .from('wishlist_items')
        .select('product_id')
        .eq('user_id', session.session.user.id);

      if (error) throw error;

      if (wishlistItems && wishlistItems.length > 0) {
        const productIds = wishlistItems.map(item => item.product_id);
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productsError) throw productsError;

        if (products) {
          const formattedProducts: Product[] = products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: p.price,
            category: p.category,
            image: p.image || '',
            images: (p.images as string[]) || [],
            rating: p.rating,
            stock: p.stock,
            brand: p.brand || '',
            features: (p.features as string[]) || [],
          }));
          setItems(formattedProducts);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          setItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Failed to parse wishlist from localStorage', error);
        }
      }
    }
  };

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const addItem = async (product: Product) => {
    if (!isInWishlist(product.id)) {
      try {
        const { data: session } = await supabase.auth.getSession();

        if (session.session && isAuthenticated) {
          const { error } = await supabase
            .from('wishlist_items')
            .insert({
              user_id: session.session.user.id,
              product_id: product.id,
            });

          if (error) throw error;
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }

      setItems(prevItems => [...prevItems, product]);
      localStorage.setItem('wishlist', JSON.stringify([...items, product]));
      toast.success(`Added ${product.name} to wishlist`);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session && isAuthenticated) {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', session.session.user.id)
          .eq('product_id', productId);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }

    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedItems));
      toast.info('Item removed from wishlist');
      return updatedItems;
    });
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const clearWishlist = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session && isAuthenticated) {
        await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', session.session.user.id);
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }

    setItems([]);
    localStorage.setItem('wishlist', '[]');
    toast.info('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
