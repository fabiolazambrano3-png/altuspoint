'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const t = useTranslations('auth');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) {
          toast.error(
            error.message === 'Invalid login credentials'
              ? t('invalid_credentials')
              : error.message
          );
          return;
        }
        toast.success(t('login_success'));
        router.push(redirect || `/${locale}/cuenta`);
        router.refresh();
      } else {
        if (form.password !== form.confirmPassword) {
          toast.error(t('passwords_dont_match'));
          return;
        }
        if (form.password.length < 6) {
          toast.error(t('password_too_short'));
          return;
        }
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              full_name: form.fullName,
              phone: form.phone,
            },
          },
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success(t('register_success'));
        router.push(`/${locale}/cuenta`);
        router.refresh();
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
            <button
              onClick={async () => {
                if (!form.email) {
                  toast.error(t('enter_email_first'));
                  return;
                }
                const { error } = await supabase.auth.resetPasswordForEmail(form.email);
                if (error) toast.error(error.message);
                else toast.success(t('reset_email_sent'));
              }}
              className="text-sm text-gray-500 hover:text-blue transition-colors"
            >
              {t('forgot_password')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
