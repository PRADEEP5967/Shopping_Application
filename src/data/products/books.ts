import { Product } from '@/types';

export const booksProducts: Product[] = [
  {
    id: 'book-1',
    name: 'Atomic Habits',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear.',
    price: 16.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop'],
    rating: 4.9,
    reviewCount: 89234,
    inStock: true,
    brand: 'Avery',
    features: ['Bestseller', 'Self-Help', 'Hardcover', '320 Pages', 'Practical Guide']
  },
  {
    id: 'book-2',
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.',
    price: 14.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop'],
    rating: 4.8,
    reviewCount: 45678,
    inStock: true,
    brand: 'Harriman House',
    features: ['Finance', 'Bestseller', 'Paperback', '256 Pages', 'Behavioral Finance']
  },
  {
    id: 'book-3',
    name: 'Project Hail Mary',
    description: 'A sci-fi adventure novel by Andy Weir, author of The Martian.',
    price: 18.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop'],
    rating: 4.9,
    reviewCount: 34567,
    inStock: true,
    brand: 'Ballantine Books',
    features: ['Science Fiction', 'Hardcover', '496 Pages', 'Award Winner', 'Space Adventure']
  },
  {
    id: 'book-4',
    name: 'Thinking, Fast and Slow',
    description: 'Nobel laureate Daniel Kahneman explores the two systems that drive the way we think.',
    price: 15.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop'],
    rating: 4.7,
    reviewCount: 56789,
    inStock: true,
    brand: 'Farrar Straus Giroux',
    features: ['Psychology', 'Paperback', '499 Pages', 'Nobel Author', 'Decision Making']
  },
  {
    id: 'book-5',
    name: 'Sapiens: A Brief History',
    description: 'A Brief History of Humankind by Yuval Noah Harari.',
    price: 17.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop'],
    rating: 4.8,
    reviewCount: 78901,
    inStock: true,
    brand: 'Harper Perennial',
    features: ['History', 'Paperback', '464 Pages', 'International Bestseller', 'Anthropology']
  },
  {
    id: 'book-6',
    name: 'The Alchemist',
    description: 'A magical fable about following your dreams by Paulo Coelho.',
    price: 12.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop'],
    rating: 4.7,
    reviewCount: 123456,
    inStock: true,
    brand: 'HarperOne',
    features: ['Fiction', 'Paperback', '208 Pages', 'Classic', 'Inspirational']
  },
  {
    id: 'book-7',
    name: 'Deep Work',
    description: 'Rules for Focused Success in a Distracted World by Cal Newport.',
    price: 14.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop'],
    rating: 4.6,
    reviewCount: 23456,
    inStock: true,
    brand: 'Grand Central',
    features: ['Productivity', 'Paperback', '304 Pages', 'Self-Help', 'Focus Strategies']
  },
  {
    id: 'book-8',
    name: 'Clean Code',
    description: 'A Handbook of Agile Software Craftsmanship by Robert C. Martin.',
    price: 44.99,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop'],
    rating: 4.8,
    reviewCount: 12345,
    inStock: true,
    brand: 'Pearson',
    features: ['Programming', 'Paperback', '464 Pages', 'Technical', 'Best Practices']
  }
];
