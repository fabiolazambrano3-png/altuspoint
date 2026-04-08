'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/components/providers/CartProvider';
import { createClient } from '@/lib/supabase/client';
import LanguageSwitcher from './LanguageSwitcher';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/productos', label: t('products') },
    { href: '/blog', label: 'Blog' },
    { href: '/distribuidores', label: t('distributors') },
    { href: '/contacto', label: t('contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 glass border-b border-gray-100 shadow-sm'
          : 'bg-white border-b border-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="AltusPoint"
              width={424}
              height={120}
              className="h-14 sm:h-[4.5rem] w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-underline text-gray-600 hover:text-navy font-medium text-sm tracking-wide transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            <Link
              href={user ? '/cuenta' : '/cuenta/login'}
              className="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-navy transition-colors"
              title={user ? (user.user_metadata?.full_name || user.email) : t('login')}
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {user && (
                <span className="text-xs font-medium text-navy max-w-[80px] truncate">
                  {(user.user_metadata?.full_name || user.email || '').split(' ')[0]}
                </span>
              )}
            </Link>

            <Link
              href="/carrito"
              className="relative flex items-center gap-1.5 text-gray-500 hover:text-navy transition-colors"
            >
              <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-navy text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-navy transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-50 animate-fade-in-up">
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-gray-600 hover:bg-light-blue hover:text-navy rounded-xl font-medium text-sm transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={user ? '/cuenta' : '/cuenta/login'}
                className="px-4 py-3 text-gray-600 hover:bg-light-blue hover:text-navy rounded-xl font-medium text-sm transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {user ? t('my_account') : t('login')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
