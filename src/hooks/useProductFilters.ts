
import { useMemo } from 'react';
import { Product } from '@/types';

interface UseProductFiltersProps {
  products: Product[];
  priceRange: number[];
  selectedBrands: string[];
  minRating: number;
  quickFilters: {
    inStock: boolean;
    onSale: boolean;
    highRated: boolean;
  };
  sortOption: string;
}

export const useProductFilters = ({
  products,
  priceRange,
  selectedBrands,
  minRating,
  quickFilters,
  sortOption
}: UseProductFiltersProps) => {
  const filteredProducts = useMemo(() => {
    let filteredProducts = [...products];

    // Filter by price
    filteredProducts = filteredProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by brand
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(p => p.brand && selectedBrands.includes(p.brand));
    }

    // Filter by rating
    if (minRating > 0) {
      filteredProducts = filteredProducts.filter(p => p.rating >= minRating);
    }

    // Apply quick filters
    if (quickFilters.inStock) {
      filteredProducts = filteredProducts.filter(p => p.inStock);
    }
    if (quickFilters.onSale) {
      filteredProducts = filteredProducts.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    if (quickFilters.highRated) {
      filteredProducts = filteredProducts.filter(p => p.rating >= 4);
    }

    // Sort products
    switch (sortOption) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        // Sort by id descending (newer products have higher ids typically)
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'popular':
        filteredProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'featured':
      default:
        // Default sorting - keep original order
        break;
    }

    return filteredProducts;
  }, [products, priceRange, selectedBrands, sortOption, minRating, quickFilters]);

  return filteredProducts;
};
