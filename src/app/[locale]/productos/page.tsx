'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryFilter from '@/components/products/CategoryFilter';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { getLocalizedField } from '@/lib/utils';
import type { Locale } from '@/types';

export default function ProductsPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((product) => {
      const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        product.name_es.toLowerCase().includes(query) ||
        product.name_en.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch && product.active;
    });
  }, [selectedCategory, searchQuery]);

  const selectedCategoryData = selectedCategory
    ? demoCategories.find((c) => c.id === selectedCategory)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue uppercase tracking-widest mb-2">
          {t('catalog_label')}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy font-display">{t('title')}</h1>
        {selectedCategoryData && (
          <p className="text-gray-500 mt-2">
            {getLocalizedField(selectedCategoryData, 'description', locale)}
          </p>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue bg-gray-50/50 transition-colors text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter
          categories={demoCategories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {filteredProducts.length} {t('results_count')}
          {selectedCategoryData && (
            <span className="ml-1">
              {t('in_category')} <strong>{getLocalizedField(selectedCategoryData, 'name', locale)}</strong>
            </span>
          )}
        </p>
        {(selectedCategory || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="text-sm text-blue hover:text-navy transition-colors font-medium"
          >
            {t('clear_filters')}
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <SlidersHorizontal className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-2">{t('no_products')}</p>
          <p className="text-gray-400 text-sm">{t('no_products_hint')}</p>
        </div>
      )}
    </div>
  );
}
