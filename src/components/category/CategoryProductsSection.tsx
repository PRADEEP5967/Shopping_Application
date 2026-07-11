import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ModernProductGrid from "@/components/ModernProductGrid";
import ModernCategoryFilters from '@/components/category/ModernCategoryFilters';
import ProductsHeader from '@/components/category/ProductsHeader';
import QuickFiltersBar from '@/components/category/QuickFiltersBar';
import NoProductsFound from '@/components/category/NoProductsFound';
import ActiveFilterChips from '@/components/category/ActiveFilterChips';
import ProductGridSkeleton from '@/components/category/ProductGridSkeleton';
import CategoryPagination from '@/components/category/CategoryPagination';
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
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const storageKey = `plp:${pathname}`;
  const PAGE_SIZE = 20;

  type PersistedState = {
    priceRange: number[];
    selectedBrands: string[];
    sortOption: string;
    minRating: number;
    viewMode: 'grid' | 'list';
    quickFilters: { inStock: boolean; onSale: boolean; highRated: boolean };
    currentPage: number;
  };

  const defaults: PersistedState = {
    priceRange: [0, 1000],
    selectedBrands: [],
    sortOption: 'featured',
    minRating: 0,
    viewMode: 'grid',
    quickFilters: { inStock: false, onSale: false, highRated: false },
    currentPage: 1,
  };

  // Initial state: URL > localStorage > defaults
  const initial = useMemo<PersistedState>(() => {
    const fromUrl = (): Partial<PersistedState> => {
      const p: Partial<PersistedState> = {};
      const min = searchParams.get('minPrice');
      const max = searchParams.get('maxPrice');
      if (min !== null || max !== null) {
        p.priceRange = [Number(min ?? 0), Number(max ?? 1000)];
      }
      const brands = searchParams.get('brands');
      if (brands) p.selectedBrands = brands.split(',').filter(Boolean);
      const sort = searchParams.get('sort');
      if (sort) p.sortOption = sort;
      const rating = searchParams.get('rating');
      if (rating) p.minRating = Number(rating);
      const view = searchParams.get('view');
      if (view === 'grid' || view === 'list') p.viewMode = view;
      const quick = searchParams.get('quick');
      if (quick) {
        const parts = new Set(quick.split(','));
        p.quickFilters = {
          inStock: parts.has('inStock'),
          onSale: parts.has('onSale'),
          highRated: parts.has('highRated'),
        };
      }
      const page = searchParams.get('page');
      if (page) p.currentPage = Math.max(1, Number(page));
      return p;
    };

    const fromStorage = (): Partial<PersistedState> => {
      if (typeof window === 'undefined') return {};
      try {
        const raw = window.localStorage.getItem(storageKey);
        return raw ? (JSON.parse(raw) as Partial<PersistedState>) : {};
      } catch {
        return {};
      }
    };

    return { ...defaults, ...fromStorage(), ...fromUrl() };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [priceRange, setPriceRange] = useState<number[]>(initial.priceRange);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initial.selectedBrands);
  const [sortOption, setSortOption] = useState(initial.sortOption);
  const [minRating, setMinRating] = useState<number>(initial.minRating);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initial.viewMode);
  const [quickFilters, setQuickFilters] = useState(initial.quickFilters);
  const [currentPage, setCurrentPage] = useState(initial.currentPage);
  const [isLoading, setIsLoading] = useState(false);

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

  // Reset to first page whenever filter inputs change (skip on very first render
  // so we can honor a `page` restored from URL/localStorage). Show a brief skeleton.
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
  }, [priceRange, selectedBrands, minRating, quickFilters, sortOption, products]);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(t);
  }, [priceRange, selectedBrands, minRating, quickFilters, sortOption, products]);

  // Sync state -> URL + localStorage (shareable + refresh-restorable)
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const setOrDelete = (key: string, value: string | null) => {
      if (value === null || value === '') params.delete(key);
      else params.set(key, value);
    };

    setOrDelete('minPrice', priceRange[0] !== 0 ? String(priceRange[0]) : null);
    setOrDelete('maxPrice', priceRange[1] !== 1000 ? String(priceRange[1]) : null);
    setOrDelete('brands', selectedBrands.length ? selectedBrands.join(',') : null);
    setOrDelete('sort', sortOption !== 'featured' ? sortOption : null);
    setOrDelete('rating', minRating > 0 ? String(minRating) : null);
    setOrDelete('view', viewMode !== 'grid' ? viewMode : null);
    const quickList = Object.entries(quickFilters)
      .filter(([, v]) => v)
      .map(([k]) => k);
    setOrDelete('quick', quickList.length ? quickList.join(',') : null);
    setOrDelete('page', currentPage > 1 ? String(currentPage) : null);

    setSearchParams(params, { replace: true });

    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({
            priceRange,
            selectedBrands,
            sortOption,
            minRating,
            viewMode,
            quickFilters,
            currentPage,
          } satisfies PersistedState),
        );
      }
    } catch {
      // ignore quota/serialization errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    priceRange,
    selectedBrands,
    sortOption,
    minRating,
    viewMode,
    quickFilters,
    currentPage,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
    setCurrentPage(1);
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

        {activeFiltersCount > 0 && (
          <div className="flex justify-end mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear all filters ({activeFiltersCount})
            </Button>
          </div>
        )}

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
              brands={brands}
              selectedBrands={selectedBrands}
              selectedRating={minRating}
              activeFiltersCount={activeFiltersCount}
              onApplyMobileFilters={({ priceRange: pr, selectedBrands: sb, selectedRating: sr }) => {
                setPriceRange(pr);
                setSelectedBrands(sb);
                setMinRating(sr);
              }}
              onResetMobileFilters={clearFilters}
            />

            <ActiveFilterChips
              priceRange={priceRange}
              selectedBrands={selectedBrands}
              minRating={minRating}
              quickFilters={quickFilters}
              onRemoveBrand={handleBrandToggle}
              onResetPrice={() => setPriceRange([0, 1000])}
              onResetRating={() => setMinRating(0)}
              onToggleQuick={handleQuickFilter}
              onClearAll={clearFilters}
            />

            {isLoading ? (
              <ProductGridSkeleton count={10} viewMode={viewMode} />
            ) : filteredProducts.length > 0 ? (
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ModernProductGrid products={paginatedProducts} viewMode={viewMode} />
                <CategoryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredProducts.length}
                  pageSize={PAGE_SIZE}
                />
              </motion.div>
            ) : products.length > 0 ? (
              <NoProductsFound
                onClearFilters={clearFilters}
                onResetSort={() => setSortOption('featured')}
                onBroadenPrice={() => setPriceRange([0, 1000])}
              />
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
