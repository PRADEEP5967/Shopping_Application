
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdvancedSearch from '@/components/AdvancedSearch';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isSearchOpen, toggleSearch }) => {
  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSearch}
          />
          
          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-4 z-50"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Search Products
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <AdvancedSearch onClose={toggleSearch} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
