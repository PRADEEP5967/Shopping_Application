
import { Product } from '@/types';

export const electronicsProducts: Product[] = [
  {
    id: '7',
    name: 'Noise-Cancelling Headphones',
    description: 'Professional-grade wireless headphones with active noise cancellation and studio-quality sound.',
    price: 199.00,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.8,
    reviewCount: 376,
    inStock: true,
    features: ['Active noise cancellation', '30-hour battery', 'Hi-Res audio', 'Quick charge'],
  },
  {
    id: '13',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact wireless speaker with 360-degree sound and waterproof design for outdoor adventures.',
    price: 89.00,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.6,
    reviewCount: 421,
    inStock: true,
    features: ['360-degree sound', 'IPX7 waterproof', '12-hour battery', 'Voice assistant'],
  },
  {
    id: '15',
    name: 'True Wireless Earbuds',
    description: 'Premium wireless earbuds with active noise cancellation and wireless charging case.',
    price: 149.00,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.8,
    reviewCount: 567,
    inStock: true,
    features: ['Active noise cancellation', 'Wireless charging', '6+18 hours battery', 'Touch controls'],
  },
];
