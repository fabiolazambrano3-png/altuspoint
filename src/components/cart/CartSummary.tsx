'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/components/providers/CartProvider';
import { useExchangeRate } from '@/components/providers/ExchangeRateProvider';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartSummary() {
  const t = useTranslations('cart');
  const { totalPrice, totalItems } = useCart();
  const { formatBs } = useExchangeRate();

  if (totalItems === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">{t('subtotal')}</span>
        <div className="text-right">
          <span className="font-medium">{formatPrice(totalPrice)}</span>
          {formatBs(totalPrice) && (
            <p className="text-xs text-gray-500">{formatBs(totalPrice)}</p>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 my-4" />
      <div className="flex justify-between mb-6">
        <span className="font-semibold text-lg">{t('total')}</span>
        <div className="text-right">
          <span className="font-bold text-lg text-navy">{formatPrice(totalPrice)}</span>
          {formatBs(totalPrice) && (
            <p className="text-sm text-gray-500">{formatBs(totalPrice)}</p>
          )}
        </div>
      </div>
      <Link href="/checkout">
        <Button className="w-full" size="lg">
          {t('checkout')}
        </Button>
      </Link>
    </div>
  );
}
