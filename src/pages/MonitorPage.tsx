
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import CategoryHeader from '@/components/category/CategoryHeader';

const MonitorPage = () => {
  const products = getAllProducts().filter(p => p.category.toLowerCase() === "monitor" || p.category.toLowerCase() === "monitors");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CategoryHeader categoryName="Monitor" />
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  );
};

export default MonitorPage;
