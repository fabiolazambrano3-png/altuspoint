'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice, getLocalizedField } from '@/lib/utils';
import { useExchangeRate } from '@/components/providers/ExchangeRateProvider';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import type { Product, Locale } from '@/types';
import { BRAND } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const { addItem } = useCart();
  const { formatBs } = useExchangeRate();

  const name = getLocalizedField(product, 'name', locale);
  const imageUrl = product.images?.[0] || '/images/placeholder.svg';
  const isConsultPrice = product.price_usd === 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/productos/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-navy text-white text-xs px-2 py-1 rounded-full font-medium">
            ★ {t('featured_badge')}
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {t('out_of_stock')}
            </span>
          </div>
        )}
      </Link>

      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
        )}

        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-navy transition-colors line-clamp-2 mb-2 text-sm leading-snug">
            {name}
          </h3>
        </Link>

        {/* SKU */}
        {product.sku && (
          <p className="text-xs text-gray-400 mb-2">SKU: {product.sku}</p>
        )}

        <div className="flex items-center justify-between mt-2">
          {isConsultPrice ? (
            <div>
              <p className="text-sm font-bold text-navy">{t('consult_price')}</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-bold text-navy">{formatPrice(product.price_usd)}</p>
              {formatBs(product.price_usd) && (
                <p className="text-xs text-gray-500">{formatBs(product.price_usd)}</p>
              )}
            </div>
          )}

          {isConsultPrice ? (
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                locale === 'es'
                  ? `Hola, me interesa: ${getLocalizedField(product, 'name', 'es')}`
                  : `Hi, I'm interested in: ${getLocalizedField(product, 'name', 'en')}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title={t('consult_whatsapp')}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
              className="p-2.5 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={t('add_to_cart')}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
