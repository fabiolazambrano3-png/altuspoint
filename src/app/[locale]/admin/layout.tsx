'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, BarChart3, ArrowLeft, FileText } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin');
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/admin/productos', label: t('products'), icon: Package },
    { href: '/admin/pedidos', label: t('orders'), icon: ShoppingCart },
    { href: '/admin/blog', label: t('blog'), icon: FileText },
    { href: '/admin/inventario', label: t('inventory'), icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    // Remove locale prefix for comparison
    const cleanPath = pathname.replace(/^\/(es|en)/, '');
    if (href === '/admin') return cleanPath === '/admin';
    return cleanPath.startsWith(href);
  };

  return (
    <div className="min-h-[80vh] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white shrink-0 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="w-5 h-5 text-blue" />
            <h2 className="font-display text-lg font-bold">Admin</h2>
          </div>
          <p className="text-xs text-white/40">AltusPoint C.A.</p>
        </div>

        <nav className="px-3 pb-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 mt-auto border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al sitio
          </Link>
        </div>
      </aside>

      {/* Mobile header for admin */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy z-40 border-t border-white/10">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                isActive(item.href) ? 'text-white' : 'text-white/40'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 min-h-screen pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
