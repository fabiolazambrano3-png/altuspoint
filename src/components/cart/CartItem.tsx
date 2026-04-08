'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice, getLocalizedField } from '@/lib/utils';
import { useExchangeRate } from '@/components/providers/ExchangeRateProvider';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType, Locale } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('cart');
  const { updateQuantity, removeItem } = useCart();
  const { formatBs } = useExchangeRate();

  const name = getLocalizedField(item.product, 'name', locale);
  const imageUrl = item.product.images?.[0] || '/images/placeholder.svg';

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
        <Image src={imageUrl} alt={name} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{name}</h4>
        <p className="text-sm text-navy font-semibold mt-1">
          {formatPrice(item.product.price_usd)}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="p-1.5 hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="p-1.5 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.product.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title={t('remove')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-navy">
          {formatPrice(item.product.price_usd * item.quantity)}
        </p>
        {formatBs(item.product.price_usd * item.quantity) && (
          <p className="text-xs text-gray-500">
            {formatBs(item.product.price_usd * item.quantity)}
          </p>
        )}
      </div>
    </div>
  );
}
