// Keeping existing imports/exports and adding getAllProducts function
import { Product } from '@/types';

// Mock product data
const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Backpack',
    description: 'A classic vintage backpack perfect for everyday use.',
    price: 49.99,
    category: 'Accessories',
    images: ['/images/products/backpack-vintage.jpg'],
    rating: 4.5,
    reviewCount: 62,
    inStock: true,
    features: ['Durable canvas material', 'Multiple compartments', 'Adjustable straps'],
  },
  {
    id: '2',
    name: 'Leather Wallet',
    description: 'A stylish and durable leather wallet for men.',
    price: 79.00,
    category: 'Accessories',
    images: ['/images/products/wallet-leather.jpg'],
    rating: 4.8,
    reviewCount: 120,
    inStock: true,
    features: ['Genuine leather', 'Slim design', 'RFID protection'],
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'High-performance running shoes for athletes.',
    price: 99.99,
    category: 'Shoes',
    images: ['/images/products/shoes-running.jpg'],
    rating: 4.2,
    reviewCount: 88,
    inStock: true,
    features: ['Breathable mesh', 'Cushioned sole', 'Lightweight design'],
  },
  {
    id: '4',
    name: 'Denim Jacket',
    description: 'A trendy denim jacket for a casual look.',
    price: 59.50,
    category: 'Clothing',
    images: ['/images/products/jacket-denim.jpg'],
    rating: 4.6,
    reviewCount: 95,
    inStock: true,
    features: ['Classic denim material', 'Button closure', 'Multiple pockets'],
  },
  {
    id: '5',
    name: 'Smart Watch',
    description: 'A feature-rich smart watch for tracking fitness and more.',
    price: 199.00,
    category: 'Electronics',
    images: ['/images/products/watch-smart.jpg'],
    rating: 4.9,
    reviewCount: 155,
    inStock: true,
    features: ['Heart rate monitor', 'GPS tracking', 'Waterproof design'],
  },
  {
    id: '6',
    name: 'Cotton T-Shirt',
    description: 'A comfortable cotton t-shirt for everyday wear.',
    price: 25.00,
    category: 'Clothing',
    images: ['/images/products/tshirt-cotton.jpg'],
    rating: 4.4,
    reviewCount: 75,
    inStock: true,
    features: ['Soft cotton material', 'Classic fit', 'Various colors'],
  },
  {
    id: '7',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones for immersive audio.',
    price: 149.00,
    category: 'Electronics',
    images: ['/images/products/headphones-wireless.jpg'],
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    features: ['Noise cancellation', 'Long battery life', 'Comfortable earcups'],
  },
  {
    id: '8',
    name: 'Ankle Boots',
    description: 'Stylish ankle boots for a fashionable look.',
    price: 89.99,
    category: 'Shoes',
    images: ['/images/products/boots-ankle.jpg'],
    rating: 4.3,
    reviewCount: 68,
    inStock: true,
    features: ['Durable construction', 'Comfortable fit', 'Various sizes'],
  },
  {
    id: '9',
    name: 'Leather Belt',
    description: 'A genuine leather belt to complement your style.',
    price: 39.00,
    category: 'Accessories',
    images: ['/images/products/belt-leather.jpg'],
    rating: 4.6,
    reviewCount: 80,
    inStock: true,
    features: ['High-quality leather', 'Adjustable buckle', 'Classic design'],
  },
  {
    id: '10',
    name: 'Wool Scarf',
    description: 'A warm and cozy wool scarf for winter.',
    price: 55.00,
    category: 'Accessories',
    images: ['/images/products/scarf-wool.jpg'],
    rating: 4.8,
    reviewCount: 105,
    inStock: true,
    features: ['Soft wool material', 'Various colors', 'Fringe detailing'],
  },
  {
    id: '11',
    name: 'Hiking Boots',
    description: 'Durable hiking boots for outdoor adventures.',
    price: 129.99,
    category: 'Shoes',
    images: ['/images/products/boots-hiking.jpg'],
    rating: 4.5,
    reviewCount: 72,
    inStock: true,
    features: ['Waterproof design', 'Ankle support', 'Rugged sole'],
  },
  {
    id: '12',
    name: 'Puffer Jacket',
    description: 'A warm and stylish puffer jacket for cold weather.',
    price: 79.50,
    category: 'Clothing',
    images: ['/images/products/jacket-puffer.jpg'],
    rating: 4.7,
    reviewCount: 90,
    inStock: true,
    features: ['Insulated filling', 'Water-resistant', 'Multiple pockets'],
  },
  {
    id: '13',
    name: 'Bluetooth Speaker',
    description: 'A portable Bluetooth speaker for music on the go.',
    price: 69.00,
    category: 'Electronics',
    images: ['/images/products/speaker-bluetooth.jpg'],
    rating: 4.6,
    reviewCount: 85,
    inStock: true,
    features: ['Wireless connectivity', 'Long battery life', 'Compact design'],
  },
  {
    id: '14',
    name: 'Graphic T-Shirt',
    description: 'A trendy graphic t-shirt for a unique look.',
    price: 28.00,
    category: 'Clothing',
    images: ['/images/products/tshirt-graphic.jpg'],
    rating: 4.3,
    reviewCount: 60,
    inStock: true,
    features: ['Soft cotton material', 'Unique graphic design', 'Comfortable fit'],
  },
  {
    id: '15',
    name: 'Noise Cancelling Earbuds',
    description: 'High-quality noise cancelling earbuds for immersive audio.',
    price: 179.00,
    category: 'Electronics',
    images: ['/images/products/earbuds-noise-cancelling.jpg'],
    rating: 4.9,
    reviewCount: 130,
    inStock: true,
    features: ['Active noise cancellation', 'Wireless connectivity', 'Compact charging case'],
  },
  {
    id: '16',
    name: 'Suede Loafers',
    description: 'Elegant suede loafers for a sophisticated style.',
    price: 99.99,
    category: 'Shoes',
    images: ['/images/products/loafers-suede.jpg'],
    rating: 4.4,
    reviewCount: 78,
    inStock: false,
    features: ['Soft suede material', 'Comfortable insole', 'Classic design'],
  },
];

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
