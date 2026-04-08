import type { Metadata } from 'next';
import DistribuidoresClient from './DistribuidoresClient';

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
      ? 'Sé Distribuidor AltusPoint'
      : 'Become an AltusPoint Distributor',
    description: isEs
      ? 'Únete a la red de distribuidores AltusPoint. Accede a marcas internacionales certificadas, exclusividad territorial y más de 30 años de respaldo.'
      : 'Join the AltusPoint distributor network. Access certified international brands, territorial exclusivity and over 30 years of support.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/distribuidores`,
      languages: {
        es: `${BASE_URL}/es/distribuidores`,
        en: `${BASE_URL}/en/distribuidores`,
      },
    },
    openGraph: {
      title: isEs
        ? 'Sé Distribuidor AltusPoint'
        : 'Become an AltusPoint Distributor',
      description: isEs
        ? 'Únete a la red de distribuidores AltusPoint. Accede a marcas internacionales certificadas, exclusividad territorial y más de 30 años de respaldo.'
        : 'Join the AltusPoint distributor network. Access certified international brands, territorial exclusivity and over 30 years of support.',
      url: `${BASE_URL}/${locale}/distribuidores`,
      type: 'website',
    },
  };
}

export default function DistribuidoresPage() {
  return <DistribuidoresClient />;
}
