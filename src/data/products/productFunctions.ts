import { Product, Order } from '@/types';
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

// Sample orders data - in a real application, this would come from your backend
const sampleOrders: Order[] = [
  {
    id: "ord-001",
    items: [
      {
        product: products[0],
        quantity: 2
      },
      {
        product: products[1],
        quantity: 1
      }
    ],
    totalAmount: products[0].price * 2 + products[1].price,
    status: "delivered",
    shippingAddress: {
      fullName: "John Doe",
      addressLine1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      country: "USA"
    },
    createdAt: "2023-05-10T10:00:00Z"
  },
  {
    id: "ord-002",
    items: [
      {
        product: products[2],
        quantity: 1,
        variant: products[2].variants ? products[2].variants[0] : undefined
      }
    ],
    totalAmount: products[2].variants ? products[2].variants[0].price : products[2].price,
    status: "shipped",
    shippingAddress: {
      fullName: "Jane Smith",
      addressLine1: "456 Market St",
      addressLine2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "USA"
    },
    createdAt: "2023-06-15T14:30:00Z"
  }
];

/**
 * Get an order by ID
 * @param id Order ID
 * @returns The order if found, otherwise undefined
 */
export function getOrderById(id: string): Order | undefined {
  return sampleOrders.find(order => order.id === id);
}

/**
 * Get all orders
 * @returns Array of all orders
 */
export function getAllOrders(): Order[] {
  return sampleOrders;
}
