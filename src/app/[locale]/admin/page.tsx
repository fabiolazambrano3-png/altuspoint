'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Package, ShoppingCart, DollarSign, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStats({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0, totalProducts: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue" />
      </div>
    );
  }

  const statCards = [
    {
      label: t('total_orders'),
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
      iconBg: 'bg-blue/10',
      iconColor: 'text-blue',
    },
    {
      label: t('pending_orders'),
      value: stats?.pendingOrders ?? 0,
      icon: AlertTriangle,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      label: t('total_revenue'),
      value: `$${(stats?.totalRevenue ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: t('total_products'),
      value: stats?.totalProducts ?? 0,
      icon: Package,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">{t('dashboard')}</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen general de la tienda</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/productos"
          className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow group"
        >
          <Package className="w-8 h-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg text-gray-900">{t('products')}</h3>
          <p className="text-sm text-gray-500 mt-1">Agregar, editar o eliminar productos</p>
        </Link>

        <Link
          href="/admin/pedidos"
          className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow group"
        >
          <ShoppingCart className="w-8 h-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg text-gray-900">{t('orders')}</h3>
          <p className="text-sm text-gray-500 mt-1">Gestionar pedidos y pagos</p>
        </Link>

        <Link
          href="/admin/inventario"
          className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow group"
        >
          <TrendingUp className="w-8 h-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg text-gray-900">{t('inventory')}</h3>
          <p className="text-sm text-gray-500 mt-1">Control de stock e inventario</p>
        </Link>
      </div>
    </div>
  );
}
