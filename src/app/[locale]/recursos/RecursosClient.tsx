'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Download, FileText, Loader2, FolderOpen } from 'lucide-react';
import { PRODUCT_LINE_COLORS } from '@/lib/constants';
import type { LineBrochure } from '@/types';

export default function RecursosClient() {
  const t = useTranslations('resources');
  const locale = useLocale();
  const [brochures, setBrochures] = useState<LineBrochure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const res = await fetch('/api/resources');
        const data = await res.json();
        setBrochures(data.brochures || []);
      } catch {
        setBrochures([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBrochures();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-light-blue to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <FolderOpen className="w-3.5 h-3.5" />
            {t('label')}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy">
            {t('title')}
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Brochures Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue" />
          </div>
        ) : brochures.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500">{t('no_resources')}</h3>
            <p className="text-sm text-gray-400 mt-1">{t('no_resources_hint')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brochures.map((brochure) => {
              const name = locale === 'en' ? (brochure.name_en || brochure.name_es) : brochure.name_es;
              const description = locale === 'en'
                ? (brochure.description_en || brochure.description_es)
                : brochure.description_es;
              const lineColor = PRODUCT_LINE_COLORS[brochure.category_slug] || '#6B8EC2';

              return (
                <div
                  key={brochure.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Card image or color header */}
                  {brochure.image_url ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={brochure.image_url}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div
                        className="absolute top-4 left-4 w-3 h-3 rounded-full"
                        style={{ backgroundColor: lineColor }}
                      />
                    </div>
                  ) : (
                    <div
                      className="h-32 flex items-center justify-center relative"
                      style={{ background: `linear-gradient(135deg, ${lineColor}20, ${lineColor}40)` }}
                    >
                      <FileText className="w-12 h-12" style={{ color: lineColor }} />
                      <div
                        className="absolute top-4 left-4 w-3 h-3 rounded-full"
                        style={{ backgroundColor: lineColor }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-navy text-lg mb-2 group-hover:text-blue transition-colors">
                      {name}
                    </h3>
                    {description && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {description}
                      </p>
                    )}
                    <a
                      href={brochure.brochure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-navy/90 transition-colors w-full justify-center"
                    >
                      <Download className="w-4 h-4" />
                      {t('download')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
