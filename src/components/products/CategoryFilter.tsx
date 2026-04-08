'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn, getLocalizedField } from '@/lib/utils';
import { buildCategoryTree } from '@/lib/category-utils';
import type { Category, Locale } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelect: (categoryId: string | null, subcategoryId?: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  selectedSubcategory,
  onSelect,
}: CategoryFilterProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');

  const { topLevel, childrenMap } = useMemo(
    () => buildCategoryTree(categories),
    [categories]
  );

  // Get children of selected parent
  const subcategories = selectedCategory
    ? childrenMap.get(selectedCategory) || []
    : [];

  return (
    <div className="space-y-3">
      {/* Top-level categories */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => onSelect(null)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
              selectedCategory === null
                ? 'bg-navy text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {t('all_categories')}
          </button>
          {topLevel.map((category) => {
            const isSelected = selectedCategory === category.id;
            const categoryColor = category.color || '#0B1D4F';

            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id, null)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border',
                  isSelected
                    ? 'text-white shadow-md border-transparent'
                    : 'bg-white text-gray-700 hover:shadow-sm border-gray-200'
                )}
                style={
                  isSelected
                    ? { backgroundColor: categoryColor, borderColor: categoryColor }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = categoryColor;
                    (e.currentTarget as HTMLButtonElement).style.color = categoryColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '';
                    (e.currentTarget as HTMLButtonElement).style.color = '';
                  }
                }}
              >
                <span
                  className={cn(
                    'inline-block w-2 h-2 rounded-full mr-2',
                    isSelected ? 'bg-white/60' : ''
                  )}
                  style={!isSelected ? { backgroundColor: categoryColor } : undefined}
                />
                {getLocalizedField(category, 'name', locale)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategories row (only shown when parent with children is selected) */}
      {subcategories.length > 0 && (
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 animate-fade-in-up">
          <div className="flex gap-2 min-w-max pl-2">
            <button
              onClick={() => onSelect(selectedCategory, null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border',
                selectedSubcategory === null
                  ? 'bg-navy/10 text-navy border-navy/20 font-semibold'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border-gray-200'
              )}
            >
              {t('all_subcategories') || 'Todas'}
            </button>
            {subcategories.map((sub) => {
              const isSubSelected = selectedSubcategory === sub.id;
              const parentColor =
                topLevel.find((c) => c.id === selectedCategory)?.color || '#0B1D4F';

              return (
                <button
                  key={sub.id}
                  onClick={() => onSelect(selectedCategory, sub.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border',
                    isSubSelected
                      ? 'text-white shadow-sm border-transparent'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                  )}
                  style={
                    isSubSelected
                      ? { backgroundColor: parentColor, borderColor: parentColor }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (!isSubSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = parentColor;
                      (e.currentTarget as HTMLButtonElement).style.color = parentColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubSelected) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '';
                      (e.currentTarget as HTMLButtonElement).style.color = '';
                    }
                  }}
                >
                  {getLocalizedField(sub, 'name', locale)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
