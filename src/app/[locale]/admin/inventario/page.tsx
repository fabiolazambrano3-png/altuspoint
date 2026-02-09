'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { demoProducts } from '@/lib/demo-data';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function AdminInventoryPage() {
  const t = useTranslations('admin');
  const tc = useTranslations('common');

  const lowStockProducts = demoProducts.filter((p) => p.stock < 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {tc('back')}
      </Link>

      <h1 className="text-3xl font-bold text-navy mb-8">{t('inventory')}</h1>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-amber-700 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" />
            {t('low_stock')} ({lowStockProducts.length})
          </h2>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name_es}</p>
                  <p className="text-sm text-gray-500">{product.name_en}</p>
                </div>
                <span className="text-lg font-bold text-amber-700">{product.stock} uds</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Products Inventory */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Producto</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {demoProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{product.name_es}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${
                      product.stock === 0
                        ? 'text-red-600'
                        : product.stock < 20
                        ? 'text-amber-600'
                        : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock < 20
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Agotado' : product.stock < 20 ? 'Bajo' : 'OK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
