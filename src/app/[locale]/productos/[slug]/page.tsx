'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/products/ProductGrid';
import { formatPrice, getLocalizedField } from '@/lib/utils';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { BRAND } from '@/lib/constants';
import {
  Minus,
  Plus,
  Check,
  Package,
  MessageCircle,
  Tag,
  Barcode,
  Building2,
  Loader2,
} from 'lucide-react';
import type { Product, Category, Locale } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(demoProducts);
  const [allCategories, setAllCategories] = useState<Category[]>(demoCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const prods: Product[] = productsData.products?.length > 0 ? productsData.products : demoProducts;
        const cats: Category[] = categoriesData.categories?.length > 0 ? categoriesData.categories : demoCategories;

        setAllProducts(prods);
        setAllCategories(cats);

        const found = prods.find((p: Product) => p.slug === params.slug);
        setProduct(found || null);
      } catch {
        const found = demoProducts.find((p) => p.slug === params.slug);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">{t('not_found')}</p>
        <Link href="/productos" className="text-blue hover:underline mt-4 inline-block">
          {tc('back')}
        </Link>
      </div>
    );
  }

  const name = getLocalizedField(product, 'name', locale);
  const description = getLocalizedField(product, 'description', locale);
  const imageUrl = product.images?.[0] || '/images/placeholder.svg';
  const isConsultPrice = product.price_usd === 0;

  const category =
    product.category ||
    allCategories.find((c) => c.id === product.category_id);
  const categoryName = category ? getLocalizedField(category, 'name', locale) : '';
  const categoryColor = category?.color || '#0B1D4F';

  const relatedProducts = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    locale === 'es'
      ? `Hola, me interesa el producto: ${getLocalizedField(product, 'name', 'es')} (SKU: ${product.sku || 'N/A'})`
      : `Hi, I'm interested in: ${getLocalizedField(product, 'name', 'en')} (SKU: ${product.sku || 'N/A'})`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/productos" className="hover:text-navy transition-colors">
          {tc('products')}
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href="/productos"
              className="hover:text-navy transition-colors"
              style={{ color: categoryColor }}
            >
              {categoryName}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.featured && (
            <span className="absolute top-4 left-4 bg-navy text-white text-xs px-3 py-1.5 rounded-full font-medium">
              ★ {t('featured_badge')}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          {/* Category badge */}
          {category && (
            <span
              className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {categoryName}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-display">
            {name}
          </h1>

          {/* Brand & SKU */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
            {product.brand && (
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                {product.brand}
              </span>
            )}
            {product.sku && (
              <span className="flex items-center gap-1.5">
                <Barcode className="w-4 h-4" />
                SKU: {product.sku}
              </span>
            )}
          </div>

          {/* Price */}
          {isConsultPrice ? (
            <div className="bg-navy/5 rounded-xl p-4 mb-6 border border-navy/10">
              <p className="text-lg font-bold text-navy mb-1">{t('consult_price')}</p>
              <p className="text-sm text-gray-600">{t('consult_description')}</p>
            </div>
          ) : (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-navy">
                {formatPrice(product.price_usd)}
              </span>
              <span className="text-lg text-gray-500">
                {formatPrice(product.price_bs, 'BS')}
              </span>
            </div>
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">{t('in_stock')}</span>
                {!isConsultPrice && (
                  <span className="text-gray-400 text-sm">({product.stock} {t('units')})</span>
                )}
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

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          {isConsultPrice ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3.5 rounded-xl hover:bg-green-700 transition-colors font-medium text-lg w-full justify-center sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              {t('consult_whatsapp')}
            </a>
          ) : product.stock > 0 ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button size="lg" className="flex-1" onClick={() => addItem(product, quantity)}>
                {t('add_to_cart')}
              </Button>
            </div>
          ) : null}

          {/* WhatsApp consult link for non-consult products too */}
          {!isConsultPrice && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-800 mt-4 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {t('ask_whatsapp')}
            </a>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-navy mb-8 font-display">{t('related')}</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
