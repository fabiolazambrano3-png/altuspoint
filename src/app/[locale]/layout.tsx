import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CartProvider } from '@/components/providers/CartProvider';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AltusPoint - Distribuidora de Productos Médicos',
  description:
    'Distribuidora líder de equipos y material médico en Venezuela. Calidad garantizada para profesionales de la salud.',
  keywords: ['material médico', 'equipos médicos', 'Venezuela', 'distribuidora', 'AltusPoint'],
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
        url: '/opengraph-image',
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
    images: ['/opengraph-image'],
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
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
