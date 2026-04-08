import type { Metadata } from 'next';
import BlogClient from './BlogClient';

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
      ? 'Blog - Artículos sobre Salud y Equipos Médicos'
      : 'Blog - Health & Medical Equipment Articles',
    description: isEs
      ? 'Artículos informativos sobre equipos médicos, medias de compresión, cuidado postquirúrgico y más. Mantente al día con AltusPoint.'
      : 'Informative articles about medical equipment, compression stockings, post-surgical care and more. Stay updated with AltusPoint.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        es: `${BASE_URL}/es/blog`,
        en: `${BASE_URL}/en/blog`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Blog - Artículos sobre Salud y Equipos Médicos'
        : 'Blog - Health & Medical Equipment Articles',
      description: isEs
        ? 'Artículos informativos sobre equipos médicos, medias de compresión, cuidado postquirúrgico y más. Mantente al día con AltusPoint.'
        : 'Informative articles about medical equipment, compression stockings, post-surgical care and more. Stay updated with AltusPoint.',
      url: `${BASE_URL}/${locale}/blog`,
      type: 'website',
    },
  };
}

export default function BlogPage() {
  return <BlogClient />;
}
