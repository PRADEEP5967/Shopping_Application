
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    price: 299.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 456,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Voice assistant compatible"
    ],
    variants: [
      {
        id: "1-1",
        name: "Matte Black",
        price: 299.99,
        inStock: true
      },
      {
        id: "1-2",
        name: "Pearl White",
        price: 309.99,
        inStock: true
      },
      {
        id: "1-3",
        name: "Navy Blue",
        price: 309.99,
        inStock: false
      }
    ]
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with our advanced smart fitness tracker. Monitor heart rate, sleep patterns, and activity levels with precision.",
    price: 129.99,
    category: "Wearables",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594619272803-932ee1b5a0d9?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 283,
    inStock: true,
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "10-day battery life",
      "Water resistant (50m)"
    ],
    variants: [
      {
        id: "2-1",
        name: "Black",
        price: 129.99,
        inStock: true
      },
      {
        id: "2-2",
        name: "Teal",
        price: 129.99,
        inStock: true
      }
    ]
  },
  {
    id: "3",
    name: "Ultra-Thin Laptop",
    description: "Powerful computing in an ultra-thin design. Perfect for professionals on the go with long battery life and stunning display.",
    price: 1299.99,
    category: "Computers",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    features: [
      "Intel Core i7 processor",
      "16GB RAM",
      "512GB SSD",
      "14-inch 4K display"
    ]
  },
  {
    id: "4",
    name: "Smart Home Speaker",
    description: "Transform your home with our intelligent speaker system. Voice control your music, get answers to questions, control smart home devices, and more.",
    price: 199.99,
    category: "Smart Home",
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=1931&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 324,
    inStock: true,
    features: [
      "360° sound output",
      "Voice control",
      "Smart home integration",
      "Multi-room audio"
    ]
  },
  {
    id: "5",
    name: "Professional Camera",
    description: "Capture stunning photos and videos with our professional-grade camera. Features high resolution sensor and advanced autofocus.",
    price: 2499.99,
    category: "Photography",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    features: [
      "45MP full-frame sensor",
      "8K video recording",
      "Advanced autofocus",
      "5-axis stabilization"
    ]
  },
  {
    id: "6",
    name: "Ergonomic Office Chair",
    description: "Enhance your work-from-home setup with our ergonomic office chair. Designed for comfort during long working hours.",
    price: 349.99,
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2062&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1987&auto=format&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 215,
    inStock: true,
    features: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "Adjustable armrests",
      "360° swivel"
    ]
  },
  {
    id: "7",
    name: "Gaming Console",
    description: "Enter new worlds with our next-generation gaming console. Experience lightning-fast loading times and stunning graphics.",
    price: 499.99,
    category: "Gaming",
    images: [
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=2019&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2072&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 412,
    inStock: false,
    features: [
      "8K gaming support",
      "1TB SSD",
      "Ray tracing technology",
      "Backward compatibility"
    ]
  },
  {
    id: "8",
    name: "Smart Watch",
    description: "Stay connected and monitor your health with our feature-packed smart watch. Track fitness, receive notifications, and more.",
    price: 249.99,
    category: "Wearables",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 356,
    inStock: true,
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant (100m)",
      "5-day battery life"
    ],
    variants: [
      {
        id: "8-1",
        name: "44mm Silver",
        price: 249.99,
        inStock: true
      },
      {
        id: "8-2",
        name: "40mm Silver",
        price: 229.99,
        inStock: true
      },
      {
        id: "8-3",
        name: "44mm Space Gray",
        price: 249.99,
        inStock: true
      }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};

export const getFeaturedProducts = (count: number = 4): Product[] => {
  // In a real app, you might have a "featured" flag or use some other logic
  return products
    .filter(product => product.inStock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};

export const getRelatedProducts = (productId: string, count: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, count);
};
