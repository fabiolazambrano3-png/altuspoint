import type { Metadata } from 'next';
import HomeClient from './HomeClient';

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
      ? 'Material y Equipos Médicos de Alta Calidad'
      : 'Premium Medical Equipment & Supplies',
    description: isEs
      ? 'Distribuidora líder de equipos y material médico en Venezuela. Más de 30 años de experiencia garantizando calidad para profesionales de la salud.'
      : 'Leading medical equipment and supplies distributor in Venezuela. Over 30 years of experience ensuring quality for healthcare professionals.',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Material y Equipos Médicos de Alta Calidad'
        : 'Premium Medical Equipment & Supplies',
      description: isEs
        ? 'Distribuidora líder de equipos y material médico en Venezuela. Más de 30 años de experiencia garantizando calidad para profesionales de la salud.'
        : 'Leading medical equipment and supplies distributor in Venezuela. Over 30 years of experience ensuring quality for healthcare professionals.',
      url: `${BASE_URL}/${locale}`,
      type: 'website',
    },
  };
}

export default function HomePage() {
  return <HomeClient />;
}
