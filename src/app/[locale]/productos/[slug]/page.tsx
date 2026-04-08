import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProductDetailClient from './ProductDetailClient';

const BASE_URL = 'https://altuspoint.health';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getProduct(slug: string) {
  try {
    const supabase = await createClient();
    const { data: product } = await supabase
      .from('products')
      .select('*, categories(id, name_es, name_en, slug)')
      .eq('slug', slug)
      .eq('active', true)
      .single();
    return product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug);
  const isEs = locale === 'es';

  if (!product) {
    return {
      title: isEs ? 'Producto no encontrado' : 'Product not found',
    };
  }

  const name = isEs ? product.name_es : (product.name_en || product.name_es);
  const description = isEs
    ? product.description_es
    : (product.description_en || product.description_es);
  const truncatedDesc = description?.substring(0, 160) || '';
  const image = product.images?.[0] || `${BASE_URL}/opengraph-image`;

  return {
    title: name,
    description: truncatedDesc,
    alternates: {
      canonical: `${BASE_URL}/${locale}/productos/${slug}`,
      languages: {
        es: `${BASE_URL}/es/productos/${slug}`,
        en: `${BASE_URL}/en/productos/${slug}`,
      },
    },
    openGraph: {
      title: name,
      description: truncatedDesc,
      url: `${BASE_URL}/${locale}/productos/${slug}`,
      type: 'website',
      images: [{ url: image, alt: name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  // Product Schema (JSON-LD)
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name_es,
        description: product.description_es?.substring(0, 300),
        image: product.images?.[0],
        sku: product.sku || undefined,
        brand: product.brand
          ? { '@type': 'Brand', name: product.brand }
          : undefined,
        offers: {
          '@type': 'Offer',
          url: `${BASE_URL}/${locale}/productos/${slug}`,
          priceCurrency: 'USD',
          price: product.price_usd || undefined,
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'AltusPoint',
          },
        },
      }
    : null;

  // BreadcrumbList Schema
  const categoryName = product?.categories?.name_es || '';
  const productName = product?.name_es || '';
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : 'Home',
        item: `${BASE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'es' ? 'Productos' : 'Products',
        item: `${BASE_URL}/${locale}/productos`,
      },
      ...(categoryName
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: categoryName,
              item: `${BASE_URL}/${locale}/productos`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: categoryName ? 4 : 3,
        name: productName,
        item: `${BASE_URL}/${locale}/productos/${slug}`,
      },
    ],
  };

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient />
    </>
  );
}
