import type { Metadata } from 'next';
import RecursosClient from './RecursosClient';

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
      ? 'Recursos y Descargas - Brochures por Línea de Producto'
      : 'Resources & Downloads - Product Line Brochures',
    description: isEs
      ? 'Descarga los brochures informativos de nuestras líneas de productos médicos. Material técnico y catálogos para profesionales de la salud.'
      : 'Download informational brochures for our medical product lines. Technical material and catalogs for healthcare professionals.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/recursos`,
      languages: {
        es: `${BASE_URL}/es/recursos`,
        en: `${BASE_URL}/en/recursos`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Recursos y Descargas - Brochures por Línea de Producto'
        : 'Resources & Downloads - Product Line Brochures',
      description: isEs
        ? 'Descarga los brochures informativos de nuestras líneas de productos médicos.'
        : 'Download informational brochures for our medical product lines.',
      url: `${BASE_URL}/${locale}/recursos`,
      type: 'website',
    },
  };
}

export default function RecursosPage() {
  return <RecursosClient />;
}
