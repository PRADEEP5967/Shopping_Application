
import { useMemo } from 'react';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';

const normalize = (str: string) => str.toLowerCase();

export const useCategoryProducts = (categoryName: string) => {
  const allProducts = getAllProducts();
  const allCategories = Array.from(new Set(allProducts.map(p => p.category)));

  // Try to match by case-insensitive
  const matchedCategory = allCategories.find(
    (cat) => normalize(cat) === normalize(categoryName)
  );

  const realCategoryName = matchedCategory || categoryName;

  // Only use products whose category matches the case-insensitive (realCategoryName)
  const categoryProducts = useMemo(() => {
    return getAllProducts().filter(
      p => normalize(p.category) === normalize(realCategoryName)
    );
  }, [realCategoryName]);

  const brands = useMemo(() => {
    const brandSet = new Set(categoryProducts.map(p => p.brand).filter(Boolean) as string[]);
    return Array.from(brandSet);
  }, [categoryProducts]);

  return {
    categoryProducts,
    brands,
    realCategoryName,
    matchedCategory
  };
};
