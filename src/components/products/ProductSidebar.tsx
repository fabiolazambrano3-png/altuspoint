'use client';

import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, X } from 'lucide-react';
import { cn, getLocalizedField } from '@/lib/utils';
import { BRAND, PRODUCT_LINE_COLORS } from '@/lib/constants';
import type { Category, Locale } from '@/types';

interface ProductSidebarProps {
  categories: Category[];
  selectedCategories: Set<string>;
  onToggleCategory: (categoryId: string) => void;
  onClearFilters: () => void;
  productCounts: Record<string, number>;
  totalProducts: number;
}

export default function ProductSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearFilters,
  productCounts,
  totalProducts,
}: ProductSidebarProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');

  // Only top-level categories (no parent)
  const topLevel = categories.filter((c) => !c.parent_id);

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(
    locale === 'es'
      ? 'Hola, me gustaría recibir asesoría sobre sus productos médicos.'
      : 'Hello, I would like to receive advice about your medical products.'
  )}`;

  return (
    <aside className="space-y-6">
      {/* Category Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">
            {t('product_line') || 'Línea de Producto'}
          </h3>
          {selectedCategories.size > 0 && (
            <button
              onClick={onClearFilters}
              className="text-xs text-blue hover:text-navy transition-colors font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              {t('clear') || 'Limpiar'}
            </button>
          )}
        </div>

        <div className="space-y-1">
          {topLevel.map((category) => {
            const isSelected = selectedCategories.has(category.id);
            const colorKey = category.slug || '';
            const dotColor = PRODUCT_LINE_COLORS[colorKey] || category.color || '#0B1D4F';
            const count = productCounts[category.id] || 0;

            return (
              <label
                key={category.id}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group',
                  isSelected
                    ? 'bg-gray-50 shadow-sm'
                    : 'hover:bg-gray-50/70'
                )}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleCategory(category.id)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      'w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center',
                      isSelected
                        ? 'border-transparent'
                        : 'border-gray-300 group-hover:border-gray-400'
                    )}
                    style={isSelected ? { backgroundColor: dotColor, borderColor: dotColor } : undefined}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>

                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dotColor }}
                />

                <span className={cn(
                  'text-sm flex-1 transition-colors',
                  isSelected ? 'text-navy font-medium' : 'text-gray-700'
                )}>
                  {getLocalizedField(category, 'name', locale)}
                </span>

                <span className={cn(
                  'text-xs tabular-nums',
                  isSelected ? 'text-navy/60 font-medium' : 'text-gray-400'
                )}>
                  ({count})
                </span>
              </label>
            );
          })}
        </div>

        {/* Show totals */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            {totalProducts} {t('results_count') || 'productos'}
          </p>
        </div>
      </div>

      {/* WhatsApp Advisory Card */}
      <div className="bg-gradient-to-br from-navy to-[#1a3a7a] rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wide">
            {locale === 'es' ? 'Asesoría Especializada' : 'Expert Advice'}
          </h3>
        </div>
        <p className="text-sm text-white/80 mb-1 font-medium">
          {locale === 'es' ? 'Consulta técnica gratuita' : 'Free technical consultation'}
        </p>
        <p className="text-xs text-white/60 mb-4">
          {locale === 'es'
            ? 'Más de 30 años de experiencia en el sector médico'
            : 'Over 30 years of experience in the medical sector'}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp 24/7
        </a>
      </div>
    </aside>
  );
}
