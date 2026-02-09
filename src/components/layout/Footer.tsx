import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BRAND } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('common');

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="AltusPoint"
              width={160}
              height={50}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('company')}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              RIF: J-501636583
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('quick_links')}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                {tc('home')}
              </Link>
              <Link href="/productos" className="text-gray-300 hover:text-white transition-colors text-sm">
                {tc('products')}
              </Link>
              <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors text-sm">
                {tc('contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('contact_info')}</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {BRAND.email}
              </a>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                {BRAND.whatsapp}
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                {BRAND.address}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {BRAND.name}. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
