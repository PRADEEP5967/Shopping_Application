
import { Product } from '@/types';
import { products } from './productsData';

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(limit = 8): Product[] {
  // Return a subset of products as featured
  return products.slice(0, limit);
}

export function getProductCategories(): string[] {
  // Extract unique categories from products
  const categories = products.map(product => product.category);
  return Array.from(new Set(categories));
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(id: string, limit = 4): Product[] {
  // Get the product to find related items
  const product = getProductById(id);
  
  if (!product) return [];
  
  // Find products in the same category, excluding the current product
  const related = products
    .filter(p => p.category === product.category && p.id !== id)
    .slice(0, limit);
    
  // If we don't have enough related products, add some random ones
  if (related.length < limit) {
    const randomProducts = products
      .filter(p => p.id !== id && !related.some(r => r.id === p.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, limit - related.length);
      
    return [...related, ...randomProducts];
  }
  
  return related;
}
