'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Package } from 'lucide-react';

export default function AdminOrdersPage() {
  const t = useTranslations('admin');
  const tc = useTranslations('common');

  // TODO: Fetch real orders from Supabase
  const orders: [] = [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {tc('back')}
      </Link>

      <h1 className="text-3xl font-bold text-navy mb-8">{t('orders')}</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-xl">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hay pedidos aún</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          {/* Orders table will go here when connected to Supabase */}
        </div>
      )}
    </div>
  );
}
