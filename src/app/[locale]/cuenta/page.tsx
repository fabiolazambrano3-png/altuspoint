'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { User, Package, LogOut, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const t = useTranslations('account');
  const tc = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success(tc('logged_out'));
    router.push(`/${locale}`);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">{t('title')}</h1>
        {user && (
          <p className="text-gray-500 mt-1">
            {user.user_metadata?.full_name || user.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/cuenta/pedidos"
          className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-light-blue flex items-center justify-center">
            <Package className="w-6 h-6 text-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('orders')}</h3>
            <p className="text-sm text-gray-500">{t('view_details')}</p>
          </div>
        </Link>

        <div className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-light-blue flex items-center justify-center">
            <User className="w-6 h-6 text-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{t('profile')}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          variant="ghost"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {tc('logout')}
        </Button>
      </div>
    </div>
  );
}
