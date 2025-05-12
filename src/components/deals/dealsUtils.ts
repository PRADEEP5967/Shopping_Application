
import { Product } from '@/types';

export const getTimeRemaining = () => {
  const hours = 5;
  const minutes = 42;
  const seconds = 18;
  
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  };
};

export const createDealProducts = (products: Product[], quantity: number, discount: number): Product[] => {
  return products
    .slice(0, quantity)
    .map(product => ({
      ...product,
      originalPrice: product.price,
      price: Number((product.price * (1 - discount / 100)).toFixed(2)),
      salePercentage: discount
    }));
};
