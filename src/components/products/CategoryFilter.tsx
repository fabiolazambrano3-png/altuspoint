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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          selectedCategory === null
            ? 'bg-navy text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        {t('all_categories')}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category.id
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {getLocalizedField(category, 'name', locale)}
        </button>
      ))}
    </div>
  );
}
