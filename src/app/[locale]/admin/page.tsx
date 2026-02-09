'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Package, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const t = useTranslations('admin');

  // TODO: Fetch real data from Supabase
  const stats = {
    totalOrders: 24,
    pendingOrders: 5,
    totalRevenue: 15750.00,
    totalProducts: 8,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-navy mb-8">{t('dashboard')}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue" />
            </div>
            <span className="text-sm text-gray-500">{t('total_orders')}</span>
          </div>
          <p className="text-3xl font-bold text-navy">{stats.totalOrders}</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">{t('pending_orders')}</span>
          </div>
          <p className="text-3xl font-bold text-navy">{stats.pendingOrders}</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">{t('total_revenue')}</span>
          </div>
          <p className="text-3xl font-bold text-navy">${stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">{t('total_products')}</span>
          </div>
          <p className="text-3xl font-bold text-navy">{stats.totalProducts}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/productos"
          className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <Package className="w-8 h-8 text-navy mb-3" />
          <h3 className="font-semibold text-lg text-gray-900">{t('products')}</h3>
          <p className="text-sm text-gray-500 mt-1">{t('add_product')} / {t('edit_product')}</p>
        </Link>

        <Link
          href="/admin/pedidos"
          className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <ShoppingCart className="w-8 h-8 text-navy mb-3" />
          <h3 className="font-semibold text-lg text-gray-900">{t('orders')}</h3>
          <p className="text-sm text-gray-500 mt-1">{t('confirm_payment')} / {t('update_status')}</p>
        </Link>

        <Link
          href="/admin/inventario"
          className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <AlertTriangle className="w-8 h-8 text-navy mb-3" />
          <h3 className="font-semibold text-lg text-gray-900">{t('inventory')}</h3>
          <p className="text-sm text-gray-500 mt-1">{t('low_stock')}</p>
        </Link>
      </div>
    </div>
  );
}
