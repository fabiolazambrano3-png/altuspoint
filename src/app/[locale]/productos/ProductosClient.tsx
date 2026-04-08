'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Search, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';
import ProductSidebar from '@/components/products/ProductSidebar';
import MobileFilterDrawer from '@/components/products/MobileFilterDrawer';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { getLocalizedField } from '@/lib/utils';
import { buildCategoryTree, getDescendantIds } from '@/lib/category-utils';
import type { Product, Category, Locale } from '@/types';

export default function ProductosClient() {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [loading, setLoading] = useState(true);

  // Build category tree
  const { topLevel, childrenMap } = useMemo(
    () => buildCategoryTree(categories),
    [categories]
  );

  // Read category filter from URL query param (e.g. ?category=equipos-medicos)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.length > 0) {
      const cat = categories.find((c) => c.slug === categoryParam);
      if (cat) {
        const parentId = cat.parent_id || cat.id;
        setSelectedCategories(new Set([parentId]));
      }
    }
  }, [searchParams, categories]);

  // Fetch from Supabase, fallback to demo data
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        if (productsData.products?.length > 0) {
          setProducts(productsData.products);
        }
        if (categoriesData.categories?.length > 0) {
          setCategories(categoriesData.categories);
        }
      } catch {
        // Keep demo data as fallback
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Toggle a category in the multi-select set
  const handleToggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategories(new Set());
    setSearchQuery('');
  }, []);

  // Compute product counts per top-level category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const parent of topLevel) {
      const validIds = [parent.id, ...getDescendantIds(parent.id, childrenMap)];
      counts[parent.id] = products.filter(
        (p) => p.active && validIds.includes(p.category_id)
      ).length;
    }
    return counts;
  }, [topLevel, childrenMap, products]);

  // Filter products by selected categories + search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.active) return false;

      // Category filter (multi-select)
      let matchesCategory = true;
      if (selectedCategories.size > 0) {
        const allValidIds: string[] = [];
        for (const catId of selectedCategories) {
          allValidIds.push(catId, ...getDescendantIds(catId, childrenMap));
        }
        matchesCategory = allValidIds.includes(product.category_id);
      }

      // Search filter
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        product.name_es.toLowerCase().includes(query) ||
        product.name_en.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, searchQuery, products, childrenMap]);

  const activeProducts = useMemo(() => products.filter((p) => p.active), [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue uppercase tracking-widest mb-2">
          {t('catalog_label')}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy font-display">{t('title')}</h1>
      </div>

      {/* Search + Mobile filter button */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
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

        {/* Mobile filter drawer trigger */}
        <MobileFilterDrawer
          categories={categories}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          onClearFilters={handleClearFilters}
          productCounts={productCounts}
          totalProducts={activeProducts.length}
          filteredCount={filteredProducts.length}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('loading') || 'Cargando...'}
            </span>
          ) : (
            <>
              {filteredProducts.length} {t('results_count')}
            </>
          )}
        </p>
        {(selectedCategories.size > 0 || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue hover:text-navy transition-colors font-medium"
          >
            {t('clear_filters')}
          </button>
        )}
      </div>

      {/* Main layout: Sidebar + Grid */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ProductSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              onClearFilters={handleClearFilters}
              productCounts={productCounts}
              totalProducts={activeProducts.length}
            />
          </div>
        </div>

        {/* Products */}
        <div className="flex-1 min-w-0">
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
      </div>
    </div>
  );
}
