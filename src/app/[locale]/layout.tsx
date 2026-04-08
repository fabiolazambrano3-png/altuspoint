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

const BASE_URL = 'https://altuspoint.health';

const seoByLocale = {
  es: {
    title: 'AltusPoint - Distribuidora de Equipos y Material Médico en Venezuela',
    description:
      'Distribuidora líder de equipos y material médico en Venezuela. Más de 30 años de experiencia. Medias de compresión, equipos quirúrgicos, ortesis y más.',
    ogLocale: 'es_VE',
    keywords: [
      'material médico', 'equipos médicos', 'Venezuela', 'distribuidora médica',
      'medias de compresión', 'material quirúrgico', 'ortesis', 'insumos médicos',
      'AltusPoint', 'compresión graduada', 'rehabilitación', 'cirugía plástica',
    ],
  },
  en: {
    title: 'AltusPoint - Medical Equipment & Supplies Distributor in Venezuela',
    description:
      'Leading medical equipment and supplies distributor in Venezuela. Over 30 years of experience. Compression stockings, surgical equipment, orthoses and more.',
    ogLocale: 'en_US',
    keywords: [
      'medical equipment', 'medical supplies', 'Venezuela', 'medical distributor',
      'compression stockings', 'surgical equipment', 'orthoses', 'healthcare supplies',
      'AltusPoint', 'graduated compression', 'rehabilitation', 'plastic surgery',
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoByLocale[locale as keyof typeof seoByLocale] || seoByLocale.es;

  return {
    title: {
      default: seo.title,
      template: `%s | AltusPoint`,
    },
    description: seo.description,
    keywords: seo.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}/${locale}`,
      siteName: 'AltusPoint',
      locale: seo.ogLocale,
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${BASE_URL}/opengraph-image`],
    },
  };
}

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
      <head>
        {/* Meta Pixel - Base Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1479611343947425');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1479611343947425&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
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
              url: BASE_URL,
              logo: `${BASE_URL}/images/logo.png`,
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
