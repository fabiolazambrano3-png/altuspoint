import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BRAND } from '@/lib/constants';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('common');

  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/images/logo.png"
              alt="AltusPoint"
              width={424}
              height={120}
              className="h-12 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {t('company')}
            </p>
            <p className="text-gray-500 text-xs mt-3 font-mono">
              RIF: {BRAND.rif}
            </p>
            <p className="text-gray-500 text-xs mt-1 font-mono">
              Registro sanitario de empresa: {BRAND.registroSanitario}
            </p>
            <p className="text-blue/60 text-sm mt-6 italic font-display">
              &ldquo;{t('slogan')}&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[3px] text-blue font-semibold mb-6">
              {t('quick_links')}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                {tc('home')}
              </Link>
              <Link href="/productos" className="text-gray-400 hover:text-white transition-colors text-sm">
                {tc('products')}
              </Link>
              <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors text-sm">
                {tc('contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[3px] text-blue font-semibold mb-6">
              {t('contact_info')}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 shrink-0 text-blue/50 group-hover:text-blue transition-colors" />
                {BRAND.email}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
              >
                <Phone className="w-4 h-4 shrink-0 text-blue/50 group-hover:text-blue transition-colors" />
                {BRAND.whatsappFormatted}
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 shrink-0 text-blue/50" />
                {BRAND.address}
              </div>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
              >
                <Instagram className="w-4 h-4 shrink-0 text-blue/50 group-hover:text-blue transition-colors" />
                {BRAND.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} {BRAND.legalName} {t('rights')}
          </p>
          {/* Brandbook color strip */}
          <div className="flex h-1 w-40 rounded-full overflow-hidden">
            <div className="flex-1" style={{background: '#7AB648'}} />
            <div className="flex-1" style={{background: '#5BB5A2'}} />
            <div className="flex-1" style={{background: '#6B8EC2'}} />
            <div className="flex-1" style={{background: '#0B1D4F'}} />
          </div>
        </div>
      </div>
    </footer>
  );
}
