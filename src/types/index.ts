
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features?: string[];
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
};

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
};

export type Address = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  orders: Order[];
  wishlists: Product[];
  addresses: Address[];
};
