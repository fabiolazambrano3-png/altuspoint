'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import ProductSidebar from './ProductSidebar';
import type { Category } from '@/types';

interface MobileFilterDrawerProps {
  categories: Category[];
  selectedCategories: Set<string>;
  onToggleCategory: (categoryId: string) => void;
  onClearFilters: () => void;
  productCounts: Record<string, number>;
  totalProducts: number;
  filteredCount: number;
}

export default function MobileFilterDrawer({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearFilters,
  productCounts,
  totalProducts,
  filteredCount,
}: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('products');

  return (
    <>
      {/* Trigger button - visible on mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {t('filters') || 'Filtros'}
        {selectedCategories.size > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-navy rounded-full">
            {selectedCategories.size}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-navy">
              {t('filters') || 'Filtros'}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-5 py-4">
            <ProductSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={onToggleCategory}
              onClearFilters={onClearFilters}
              productCounts={productCounts}
              totalProducts={totalProducts}
            />
          </div>

          {/* Footer with action button */}
          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy/90 transition-colors"
            >
              {locale === 'es' ? `Ver ${filteredCount} productos` : `View ${filteredCount} products`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
