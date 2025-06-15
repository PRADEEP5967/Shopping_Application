
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import RelatedCategoriesGrid from './RelatedCategoriesGrid';

interface CategoryNotFoundProps {
  categorySlug: string;
}

const CategoryNotFound: React.FC<CategoryNotFoundProps> = ({ categorySlug }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">
          Category not found: {categorySlug && categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
        </h1>
        <p>Please check the URL or go back to the categories page.</p>
        {/* Show related categories to help user discover other pages */}
        <div className="mt-12">
          <RelatedCategoriesGrid currentCategorySlug={categorySlug || ""} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryNotFound;
