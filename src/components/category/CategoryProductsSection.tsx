import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ModernProductGrid from "@/components/ModernProductGrid";
import ModernCategoryFilters from '@/components/category/ModernCategoryFilters';
import ProductsHeader from '@/components/category/ProductsHeader';
import QuickFiltersBar from '@/components/category/QuickFiltersBar';
import NoProductsFound from '@/components/category/NoProductsFound';
import { useProductFilters } from '@/hooks/useProductFilters';
import { Product } from '@/types';
import { LucideIcon } from 'lucide-react';

interface CategoryProductsSectionProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  emptyIcon?: LucideIcon;
  emptyMessage?: string;
}

const CategoryProductsSection: React.FC<CategoryProductsSectionProps> = ({
  products,
  title = 'All Products',
  subtitle = 'Browse our complete collection.',
  icon: Icon,
  emptyIcon: EmptyIcon,
  emptyMessage = 'No products available yet. Check back soon!'
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickFilters, setQuickFilters] = useState({
    inStock: false,
    onSale: false,
    highRated: false,
  });

  // Extract unique brands from products
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  const filteredProducts = useProductFilters({
    products,
    priceRange,
    selectedBrands,
    minRating,
    quickFilters,
    sortOption
  });

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleQuickFilter = (filterType: 'inStock' | 'onSale' | 'highRated') => {
    setQuickFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSortOption('featured');
    setMinRating(0);
    setQuickFilters({
      inStock: false,
      onSale: false,
      highRated: false,
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (minRating > 0) count++;
    if (Object.values(quickFilters).some(Boolean)) count++;
    return count;
  }, [selectedBrands, priceRange, minRating, quickFilters]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Quick Filters Bar */}
        <QuickFiltersBar
          quickFilters={quickFilters}
          handleQuickFilter={handleQuickFilter}
          activeFiltersCount={activeFiltersCount}
          clearFilters={clearFilters}
        />

        <div className="flex items-start gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ModernCategoryFilters
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              brands={brands}
              selectedBrands={selectedBrands}
              onBrandToggle={handleBrandToggle}
              selectedRating={minRating}
              onRatingChange={setMinRating}
              activeFiltersCount={activeFiltersCount}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Area */}
          <div className="flex-1">
            <ProductsHeader
              filteredProductsCount={filteredProducts.length}
              totalProductsCount={products.length}
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              priceRange={priceRange}
              handlePriceChange={setPriceRange}
              brands={brands}
              selectedBrands={selectedBrands}
              handleBrandToggle={handleBrandToggle}
              selectedRating={minRating}
              handleRatingChange={setMinRating}
            />

            {filteredProducts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }}
              >
                <ModernProductGrid products={filteredProducts} viewMode={viewMode} />
              </motion.div>
            ) : products.length > 0 ? (
              <NoProductsFound onClearFilters={clearFilters} />
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                {EmptyIcon && <EmptyIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />}
                <p className="text-muted-foreground">{emptyMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsSection;
