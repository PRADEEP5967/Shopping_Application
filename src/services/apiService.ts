
// Core API service for managing different e-commerce data sources
export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  brand?: string;
  stock?: number;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  skip?: number;
  limit?: number;
}

export class ECommerceAPIService {
  private baseUrls = {
    fakeStore: 'https://fakestoreapi.com',
    dummyJson: 'https://dummyjson.com',
    openFood: 'https://world.openfoodfacts.org/api/v0'
  };

  private async fetchWithTimeout(url: string, timeout: number = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Fake Store API methods
  async getFakeStoreProducts(): Promise<ApiProduct[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrls.fakeStore}/products`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const products = await response.json();
      
      return products.map((product: any) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        rating: product.rating,
        stock: Math.floor(Math.random() * 100) + 10
      }));
    } catch (error) {
      console.error('Error fetching FakeStore products:', error);
      return [];
    }
  }

  async getFakeStoreCategories(): Promise<string[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrls.fakeStore}/products/categories`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching FakeStore categories:', error);
      return [];
    }
  }

  async getFakeStoreProductsByCategory(category: string): Promise<ApiProduct[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrls.fakeStore}/products/category/${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const products = await response.json();
      
      return products.map((product: any) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        rating: product.rating,
        stock: Math.floor(Math.random() * 100) + 10
      }));
    } catch (error) {
      console.error('Error fetching FakeStore category products:', error);
      return [];
    }
  }

  // DummyJSON API methods
  async getDummyJsonProducts(limit: number = 30, skip: number = 0): Promise<ApiResponse<ApiProduct[]>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrls.dummyJson}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      const products = data.products.map((product: any) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
        rating: {
          rate: product.rating,
          count: Math.floor(Math.random() * 1000) + 50
        },
        brand: product.brand,
        stock: product.stock
      }));

      return {
        data: products,
        total: data.total,
        skip: data.skip,
        limit: data.limit
      };
    } catch (error) {
      console.error('Error fetching DummyJSON products:', error);
      return { data: [] };
    }
  }

  async getDummyJsonCategories(): Promise<string[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrls.dummyJson}/products/categories`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching DummyJSON categories:', error);
      return [];
    }
  }

  async searchDummyJsonProducts(query: string): Promise<ApiProduct[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrls.dummyJson}/products/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      return data.products.map((product: any) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
        rating: {
          rate: product.rating,
          count: Math.floor(Math.random() * 1000) + 50
        },
        brand: product.brand,
        stock: product.stock
      }));
    } catch (error) {
      console.error('Error searching DummyJSON products:', error);
      return [];
    }
  }

  // Open Food Facts API methods
  async getOpenFoodProducts(page: number = 1): Promise<ApiProduct[]> {
    try {
      const response = await this.fetchWithTimeout(
        `${this.baseUrls.openFood}/search.json?page=${page}&page_size=20&sort_by=popularity`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      return data.products
        .filter((product: any) => product.product_name && product.image_url)
        .map((product: any) => ({
          id: product.code || product._id,
          title: product.product_name,
          description: product.generic_name || product.product_name,
          price: Math.floor(Math.random() * 50) + 5, // Open Food Facts doesn't have prices
          category: 'Food & Beverages',
          image: product.image_url,
          rating: {
            rate: Math.random() * 2 + 3, // Generate rating between 3-5
            count: Math.floor(Math.random() * 500) + 50
          },
          brand: product.brands?.split(',')[0] || 'Unknown',
          stock: Math.floor(Math.random() * 100) + 10
        }));
    } catch (error) {
      console.error('Error fetching Open Food products:', error);
      return [];
    }
  }

  // Combined method to get products from all sources
  async getAllProducts(): Promise<ApiProduct[]> {
    try {
      const [fakeStoreProducts, dummyJsonResponse, openFoodProducts] = await Promise.allSettled([
        this.getFakeStoreProducts(),
        this.getDummyJsonProducts(20),
        this.getOpenFoodProducts()
      ]);

      const allProducts: ApiProduct[] = [];

      if (fakeStoreProducts.status === 'fulfilled') {
        allProducts.push(...fakeStoreProducts.value);
      }

      if (dummyJsonResponse.status === 'fulfilled') {
        allProducts.push(...dummyJsonResponse.value.data);
      }

      if (openFoodProducts.status === 'fulfilled') {
        allProducts.push(...openFoodProducts.value.slice(0, 10)); // Limit food products
      }

      return allProducts;
    } catch (error) {
      console.error('Error fetching all products:', error);
      return [];
    }
  }
}

export const apiService = new ECommerceAPIService();
