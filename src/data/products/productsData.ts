
import { Product } from '@/types';
import { accessoriesProducts } from './accessories';
import { clothingProducts } from './clothing';
import { computersProducts } from './computers';
import { electronicsProducts } from './electronics';
import { furnitureProducts } from './furniture';
import { gamingProducts } from './gaming';
import { photographyProducts } from './photography';
import { shoesProducts } from './shoes';
import { smartHomeProducts } from './smartHome';
import { wearablesProducts } from './wearables';

// Mock product data with modern, high-quality images
export const products: Product[] = [
  ...accessoriesProducts,
  ...clothingProducts,
  ...computersProducts,
  ...electronicsProducts,
  ...furnitureProducts,
  ...gamingProducts,
  ...photographyProducts,
  ...shoesProducts,
  ...smartHomeProducts,
  ...wearablesProducts,
];
