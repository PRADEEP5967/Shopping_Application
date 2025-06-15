
import React, { useState, useEffect, useMemo } from 'react';
import { Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import ModernProductCard from '@/components/ModernProductCard';
import QuickViewModal from './QuickViewModal';

interface EnhancedProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  itemsPerPage?: number;
}

const EnhancedProductGrid: React.FC<EnhancedProductGridProps> = ({ 
  products, 
  viewMode = 'grid',
  itemsPerPage = 20
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Lazy loading logic
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setDisplayedProducts(products.slice(startIndex, endIndex));
  }, [products, currentPage, itemsPerPage]);

  const hasMoreProducts = useMemo(() => {
    return currentPage * itemsPerPage < products.length;
  }, [currentPage, itemsPerPage, products.length]);

  const loadMore = () => {
    if (hasMoreProducts && !loading) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoading(false);
      }, 500); // Simulate loading delay
    }
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
          Try adjusting your filters or search criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
        : "space-y-3 sm:space-y-4"
      }>
        {displayedProducts.map((product, index) => (
          <div key={product.id} className="group relative">
            <ModernProductCard 
              product={product} 
              className="animate-fade-in" 
            />
            
            {/* Quick View Button Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-auto">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleQuickView(product);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="text-center mt-8 sm:mt-12">
          <Button 
            onClick={loadMore} 
            disabled={loading}
            size="lg"
            variant="outline"
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Showing {displayedProducts.length} of {products.length} products
          </p>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </>
  );
};

export default EnhancedProductGrid;
