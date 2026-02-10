'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cn, getLocalizedField } from '@/lib/utils';
import type { Category, Locale } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');

  return (
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
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const categoryColor = category.color || '#0B1D4F';

          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
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
  );
}
