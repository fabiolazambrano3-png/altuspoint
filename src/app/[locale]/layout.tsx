import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import MetaPixel from '@/components/MetaPixel';
import { CartProvider } from '@/components/providers/CartProvider';
import { ExchangeRateProvider } from '@/components/providers/ExchangeRateProvider';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AltusPoint - Distribuidora de Productos Médicos',
  description:
    'Distribuidora líder de equipos y material médico en Venezuela. Calidad garantizada para profesionales de la salud.',
  keywords: [
    'material médico', 'equipos médicos', 'Venezuela', 'distribuidora', 'AltusPoint',
    'medias de compresión', 'medias compresivas', 'material quirúrgico', 'compresión graduada',
    'cirugía plástica', 'ortesis', 'rehabilitación', 'insumos médicos', 'salud',
  ],
  metadataBase: new URL('https://altuspoint.health'),
  openGraph: {
    title: 'AltusPoint - Distribuidora de Material y Equipos Médicos',
    description:
      'Distribuidora líder de equipos y material médico en Venezuela. Calidad garantizada para profesionales de la salud.',
    url: 'https://altuspoint.health',
    siteName: 'AltusPoint',
    locale: 'es_VE',
    type: 'website',
    images: [
      {
        url: 'https://altuspoint.health/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AltusPoint - Distribuidora de Material y Equipos Médicos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AltusPoint - Distribuidora de Material y Equipos Médicos',
    description:
      'Distribuidora líder de equipos y material médico en Venezuela. Calidad garantizada para profesionales de la salud.',
    images: ['https://altuspoint.health/opengraph-image'],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased`}>
        <MetaPixel />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AltusPoint',
              legalName: 'AltusPoint, C.A.',
              url: 'https://altuspoint.health',
              logo: 'https://altuspoint.health/images/logo.png',
              description: 'Distribuidora de material y equipos médicos en Venezuela con más de 30 años de experiencia.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calle 12 #18-44 Barrio Obrero',
                addressLocality: 'San Cristóbal',
                addressCountry: 'VE',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+584147114583',
                contactType: 'customer service',
                availableLanguage: ['Spanish', 'English'],
              },
              sameAs: ['https://www.instagram.com/altuspointco/'],
            }),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ExchangeRateProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <WhatsAppButton />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#0B1D4F',
                  color: '#fff',
                  borderRadius: '12px',
                },
              }}
            />
          </CartProvider>
          </ExchangeRateProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
