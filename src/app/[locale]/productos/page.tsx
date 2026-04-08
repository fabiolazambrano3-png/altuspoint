import type { Metadata } from 'next';
import ProductosClient from './ProductosClient';

const BASE_URL = 'https://altuspoint.health';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  return {
    title: isEs
      ? 'Catálogo de Equipos y Material Médico'
      : 'Medical Equipment & Supplies Catalog',
    description: isEs
      ? 'Explora nuestro catálogo completo de equipos médicos, medias de compresión, material quirúrgico y más. Envíos a toda Venezuela.'
      : 'Browse our complete catalog of medical equipment, compression stockings, surgical supplies and more. Shipping across Venezuela.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/productos`,
      languages: {
        es: `${BASE_URL}/es/productos`,
        en: `${BASE_URL}/en/productos`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Catálogo de Equipos y Material Médico'
        : 'Medical Equipment & Supplies Catalog',
      description: isEs
        ? 'Explora nuestro catálogo completo de equipos médicos, medias de compresión, material quirúrgico y más. Envíos a toda Venezuela.'
        : 'Browse our complete catalog of medical equipment, compression stockings, surgical supplies and more. Shipping across Venezuela.',
      url: `${BASE_URL}/${locale}/productos`,
      type: 'website',
    },
  };
}

export default function ProductosPage() {
  return <ProductosClient />;
}
