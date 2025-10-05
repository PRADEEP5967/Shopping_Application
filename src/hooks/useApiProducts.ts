
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService, ApiProduct } from '@/services/apiService';
import { Product } from '@/types';

// Convert API product to our internal Product type
const convertApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  name: apiProduct.title,
  description: apiProduct.description,
  price: apiProduct.price,
  category: apiProduct.category,
  images: [apiProduct.image],
  rating: apiProduct.rating.rate,
  reviewCount: apiProduct.rating.count,
  inStock: (apiProduct.stock || 0) > 0,
  brand: apiProduct.brand,
  features: []
});

export const useApiProducts = () => {
  const {
    data: products = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['api-products'],
    queryFn: async () => {
      const apiProducts = await apiService.getAllProducts();
      return apiProducts.map(convertApiProductToProduct);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes (renamed from cacheTime)
  });

  return {
    products,
    isLoading,
    error,
    refetch
  };
};

export const useFakeStoreProducts = () => {
  const {
    data: products = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['fakestore-products'],
    queryFn: async () => {
      const apiProducts = await apiService.getFakeStoreProducts();
      return apiProducts.map(convertApiProductToProduct);
    },
    staleTime: 5 * 60 * 1000
  });

  return { products, isLoading, error };
};

export const useDummyJsonProducts = (limit: number = 30, skip: number = 0) => {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['dummyjson-products', limit, skip],
    queryFn: async () => {
      const response = await apiService.getDummyJsonProducts(limit, skip);
      return {
        products: response.data.map(convertApiProductToProduct),
        total: response.total || 0
      };
    },
    staleTime: 5 * 60 * 1000
  });

  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    error
  };
};

export const useProductSearch = (query: string) => {
  const {
    data: products = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['search-products', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const apiProducts = await apiService.searchDummyJsonProducts(query);
      return apiProducts.map(convertApiProductToProduct);
    },
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000
  });

  return { products, isLoading, error };
};

export const useApiCategories = () => {
  const {
    data: categories = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['api-categories'],
    queryFn: async () => {
      const [fakeStoreCategories, dummyJsonCategories] = await Promise.all([
        apiService.getFakeStoreCategories(),
        apiService.getDummyJsonCategories()
      ]);
      
      // Combine and deduplicate categories
      const allCategories = [...fakeStoreCategories, ...dummyJsonCategories, 'Food & Beverages'];
      return Array.from(new Set(allCategories));
    },
    staleTime: 10 * 60 * 1000
  });

  return { categories, isLoading, error };
};

export const useApiCategoryProducts = (category: string) => {
  const {
    data: products = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['api-category-products', category],
    queryFn: async () => {
      if (!category) return [];
      const apiProducts = await apiService.getProductsByCategory(category);
      return apiProducts.map(convertApiProductToProduct);
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000
  });

  return { products, isLoading, error, refetch };
};
