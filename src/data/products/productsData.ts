
import { Product } from '@/types';
import { accessoriesProducts } from './accessories';
import { audioProducts } from './audio';
import { babyProducts } from './baby';
import { clothingProducts } from './clothing';
import { computersProducts } from './computers';
import { electronicsProducts } from './electronics';
import { fitnessProducts } from './fitness';
import { furnitureProducts } from './furniture';
import { gamingProducts } from './gaming';
import { healthProducts } from './health';
import { photographyProducts } from './photography';
import { shoesProducts } from './shoes';
import { smartHomeProducts } from './smartHome';
import { tvProducts } from './tv';
import { wearablesProducts } from './wearables';

// Mock product data with modern, high-quality images
export const products: Product[] = [
  ...accessoriesProducts,
  ...audioProducts,
  ...babyProducts,
  ...clothingProducts,
  ...computersProducts,
  ...electronicsProducts,
  ...fitnessProducts,
  ...furnitureProducts,
  ...gamingProducts,
  ...healthProducts,
  ...photographyProducts,
  ...shoesProducts,
  ...smartHomeProducts,
  ...tvProducts,
  ...wearablesProducts,
];
