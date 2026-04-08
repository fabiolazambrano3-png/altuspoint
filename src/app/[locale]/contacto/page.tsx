import type { Metadata } from 'next';
import ContactoClient from './ContactoClient';

const BASE_URL = 'https://altuspoint.health';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  return {
    title: isEs ? 'Contacto' : 'Contact Us',
    description: isEs
      ? 'Contáctanos para cotizaciones de equipos médicos. Atención personalizada por WhatsApp, email o en nuestra sede en San Cristóbal, Venezuela.'
      : 'Contact us for medical equipment quotes. Personalized support via WhatsApp, email or at our headquarters in San Cristóbal, Venezuela.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/contacto`,
      languages: {
        es: `${BASE_URL}/es/contacto`,
        en: `${BASE_URL}/en/contacto`,
      },
    },
    openGraph: {
      title: isEs ? 'Contacto' : 'Contact Us',
      description: isEs
        ? 'Contáctanos para cotizaciones de equipos médicos. Atención personalizada por WhatsApp, email o en nuestra sede en San Cristóbal, Venezuela.'
        : 'Contact us for medical equipment quotes. Personalized support via WhatsApp, email or at our headquarters in San Cristóbal, Venezuela.',
      url: `${BASE_URL}/${locale}/contacto`,
      type: 'website',
    },
  };
}

export default function ContactoPage() {
  return <ContactoClient />;
}
