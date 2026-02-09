'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const t = useTranslations('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // TODO: Supabase auth login
        toast.success('Inicio de sesión exitoso');
      } else {
        if (form.password !== form.confirmPassword) {
          toast.error('Las contraseñas no coinciden');
          return;
        }
        // TODO: Supabase auth register
        toast.success('Cuenta creada exitosamente');
      }
    } catch {
      toast.error(isLogin ? t('login_error') : t('register_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-20">
      <div className="bg-white border border-gray-100 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-navy text-center mb-8">
          {isLogin ? t('login_title') : t('register_title')}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <Input
                label={t('full_name')}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
              <Input
                label={t('phone')}
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </>
          )}

          <Input
            label={t('email')}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label={t('password')}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {!isLogin && (
            <Input
              label={t('confirm_password')}
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? '...' : isLogin ? t('login_title') : t('register_title')}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue hover:text-navy transition-colors"
          >
            {isLogin ? t('no_account') : t('has_account')}
          </button>
        </div>

        {isLogin && (
          <div className="mt-2 text-center">
            <Link href="/cuenta/login" className="text-sm text-gray-500 hover:text-blue transition-colors">
              {t('forgot_password')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
