'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/products/ProductGrid';
import { formatPrice, getLocalizedField } from '@/lib/utils';
import { demoProducts } from '@/lib/demo-data';
import { Minus, Plus, ArrowLeft, Check, Package } from 'lucide-react';
import type { Locale } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = demoProducts.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Producto no encontrado</p>
        <Link href="/productos" className="text-blue hover:underline mt-4 inline-block">
          {tc('back')}
        </Link>
      </div>
    );
  }

  const name = getLocalizedField(product, 'name', locale);
  const description = getLocalizedField(product, 'description', locale);
  const imageUrl = product.images?.[0] || '/images/placeholder.svg';

  const relatedProducts = demoProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {tc('back')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-navy">{formatPrice(product.price_usd)}</span>
            <span className="text-lg text-gray-500">{formatPrice(product.price_bs, 'BS')}</span>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">{t('in_stock')}</span>
                <span className="text-gray-400 text-sm">({product.stock})</span>
              </>
            ) : (
              <>
                <Package className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-medium">{t('out_of_stock')}</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">{t('description')}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Quantity + Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, quantity)}
              >
                {t('add_to_cart')}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-navy mb-8">{t('related')}</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
