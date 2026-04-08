'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/products/ProductGrid';
import { formatPrice, getLocalizedField } from '@/lib/utils';
import { useExchangeRate } from '@/components/providers/ExchangeRateProvider';
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
  ChevronLeft,
  ChevronRight,
  FileDown,
} from 'lucide-react';
import type { Product, ProductVariant, Category, Locale } from '@/types';
import { MetaEvents } from '@/components/MetaPixel';

export default function ProductDetailClient() {
  const params = useParams();
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const tc = useTranslations('common');
  const { addItem } = useCart();
  const { formatBs } = useExchangeRate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(demoProducts);
  const [allCategories, setAllCategories] = useState<Category[]>(demoCategories);
  const [loading, setLoading] = useState(true);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch single product by slug (includes variants) + all products + categories
        const [productRes, productsRes, categoriesRes] = await Promise.all([
          fetch(`/api/products?slug=${params.slug}`),
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);
        const productData = await productRes.json();
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        const prods: Product[] = productsData.products?.length > 0 ? productsData.products : demoProducts;
        const cats: Category[] = categoriesData.categories?.length > 0 ? categoriesData.categories : demoCategories;

        setAllProducts(prods);
        setAllCategories(cats);

        if (productData.product) {
          setProduct(productData.product);
        } else {
          // Fallback to demo data
          const found = demoProducts.find((p) => p.slug === params.slug);
          setProduct(found || null);
        }
      } catch {
        const found = demoProducts.find((p) => p.slug === params.slug);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.slug]);

  // Track ViewContent when product loads
  useEffect(() => {
    if (product) {
      MetaEvents.viewContent({
        content_name: product.name_es || product.name_en || '',
        content_ids: [product.id],
        content_type: 'product',
        value: product.price_usd,
        currency: 'USD',
      });
    }
  }, [product]);

  // Extract unique sizes and colors from variants
  const { sizes, colors } = useMemo(() => {
    if (!product?.variants?.length) return { sizes: [] as string[], colors: [] as string[] };
    const s = [...new Set(product.variants.map((v) => v.size).filter(Boolean))];
    const c = [...new Set(product.variants.map((v) => v.color).filter(Boolean))];
    return { sizes: s, colors: c };
  }, [product?.variants]);

  const hasVariants = (product?.variants?.length ?? 0) > 0;

  // Effective stock & price based on selected variant
  const effectiveStock = selectedVariant ? selectedVariant.stock : product?.stock ?? 0;
  const effectivePrice = selectedVariant
    ? (product?.price_usd ?? 0) + selectedVariant.price_diff_usd
    : product?.price_usd ?? 0;

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
  const images = product.images?.length ? product.images : ['/images/placeholder.svg'];
  const isConsultPrice = product.price_usd === 0;

  const category =
    product.category ||
    allCategories.find((c) => c.id === product.category_id);
  const categoryName = category ? getLocalizedField(category, 'name', locale) : '';
  const categoryColor = category?.color || '#0B1D4F';

  const relatedProducts = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const variantLabel = selectedVariant
    ? ` - ${[selectedVariant.size, selectedVariant.color].filter(Boolean).join(' / ')}`
    : '';

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    locale === 'es'
      ? `Hola, me interesa el producto: ${getLocalizedField(product, 'name', 'es')}${variantLabel} (SKU: ${selectedVariant?.sku_variant || product.sku || 'N/A'})`
      : `Hi, I'm interested in: ${getLocalizedField(product, 'name', 'en')}${variantLabel} (SKU: ${selectedVariant?.sku_variant || product.sku || 'N/A'})`
  )}`;

  const handleSelectVariant = (size: string, color: string) => {
    if (!product.variants) return;
    const match = product.variants.find(
      (v) =>
        (size === '' || v.size === size) &&
        (color === '' || v.color === color)
    );
    setSelectedVariant(match || null);
    setQuantity(1);
  };

  const nextImage = () => setSelectedImageIdx((i) => (i + 1) % images.length);
  const prevImage = () => setSelectedImageIdx((i) => (i - 1 + images.length) % images.length);

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
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image
              src={images[selectedImageIdx]}
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
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                    idx === selectedImageIdx ? 'border-navy' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image src={img} alt={`${name} ${idx + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
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
            {(selectedVariant?.sku_variant || product.sku) && (
              <span className="flex items-center gap-1.5">
                <Barcode className="w-4 h-4" />
                SKU: {selectedVariant?.sku_variant || product.sku}
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
                {formatPrice(effectivePrice)}
              </span>
              {formatBs(effectivePrice) && (
                <span className="text-lg text-gray-500">
                  {formatBs(effectivePrice)}
                </span>
              )}
            </div>
          )}

          {/* Variant Selector */}
          {hasVariants && (
            <div className="mb-6 space-y-4">
              {/* Size selector */}
              {sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {locale === 'es' ? 'Talla' : 'Size'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                      const isSelected = selectedVariant?.size === size;
                      const available = product.variants!.some(
                        (v) => v.size === size && v.stock > 0 &&
                          (colors.length === 0 || !selectedVariant?.color || v.color === selectedVariant.color)
                      );
                      return (
                        <button
                          key={size}
                          onClick={() => handleSelectVariant(size, selectedVariant?.color || '')}
                          disabled={!available}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected
                              ? 'border-navy bg-navy text-white'
                              : available
                              ? 'border-gray-300 hover:border-navy text-gray-700'
                              : 'border-gray-200 text-gray-300 cursor-not-allowed'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {locale === 'es' ? 'Color' : 'Color'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => {
                      const isSelected = selectedVariant?.color === color;
                      const available = product.variants!.some(
                        (v) => v.color === color && v.stock > 0 &&
                          (sizes.length === 0 || !selectedVariant?.size || v.size === selectedVariant.size)
                      );
                      return (
                        <button
                          key={color}
                          onClick={() => handleSelectVariant(selectedVariant?.size || '', color)}
                          disabled={!available}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected
                              ? 'border-navy bg-navy text-white'
                              : available
                              ? 'border-gray-300 hover:border-navy text-gray-700'
                              : 'border-gray-200 text-gray-300 cursor-not-allowed'
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Variant with only name (no size/color) */}
              {sizes.length === 0 && colors.length === 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {locale === 'es' ? 'Variante' : 'Variant'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants!.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                        disabled={v.stock <= 0}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          selectedVariant?.id === v.id
                            ? 'border-navy bg-navy text-white'
                            : v.stock > 0
                            ? 'border-gray-300 hover:border-navy text-gray-700'
                            : 'border-gray-200 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Prompt to select variant */}
              {hasVariants && !selectedVariant && !isConsultPrice && (
                <p className="text-sm text-amber-600 font-medium">
                  {locale === 'es' ? 'Selecciona una opción para continuar' : 'Select an option to continue'}
                </p>
              )}
            </div>
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2 mb-6">
            {effectiveStock > 0 ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">{t('in_stock')}</span>
                {!isConsultPrice && (
                  <span className="text-gray-400 text-sm">({effectiveStock} {t('units')})</span>
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
          ) : effectiveStock > 0 ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={hasVariants && !selectedVariant}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(effectiveStock, quantity + 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={hasVariants && !selectedVariant}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, quantity)}
                disabled={hasVariants && !selectedVariant}
              >
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

          {/* Brochure download */}
          {product.brochure_url && (
            <a
              href={product.brochure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-4 px-4 py-2.5 bg-navy/5 hover:bg-navy/10 border border-navy/15 rounded-lg text-sm font-medium text-navy transition-colors"
            >
              <FileDown className="w-4.5 h-4.5" />
              {locale === 'es' ? 'Descargar ficha técnica (PDF)' : 'Download product brochure (PDF)'}
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
