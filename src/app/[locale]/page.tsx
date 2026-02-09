import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import { Shield, Truck, Headphones, Stethoscope, Syringe, Pill } from 'lucide-react';

// Demo categories for initial display
const demoCategories = [
  { id: '1', slug: 'equipos-medicos', icon: Stethoscope, name_es: 'Equipos Médicos', name_en: 'Medical Equipment' },
  { id: '2', slug: 'material-quirurgico', icon: Syringe, name_es: 'Material Quirúrgico', name_en: 'Surgical Supplies' },
  { id: '3', slug: 'insumos-medicos', icon: Pill, name_es: 'Insumos Médicos', name_en: 'Medical Supplies' },
];

export default function HomePage() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t('hero_title')}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-blue/80 leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/productos">
                <Button size="lg" className="bg-white text-navy hover:bg-gray-100">
                  {t('hero_cta')}
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {tc('contact')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            {t('categories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/productos?category=${cat.slug}`}
                className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 hover:border-blue/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-light-blue flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-white transition-colors">
                  <cat.icon className="w-8 h-8 text-navy group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-navy transition-colors">
                  {cat.name_es}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">
            {t('why_us')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-14 h-14 rounded-xl bg-light-blue flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-navy" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{t('why_quality')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('why_quality_desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-14 h-14 rounded-xl bg-light-blue flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-navy" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{t('why_shipping')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('why_shipping_desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-14 h-14 rounded-xl bg-light-blue flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-7 h-7 text-navy" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{t('why_support')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('why_support_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {t('hero_title')}
          </h2>
          <p className="text-blue/80 text-lg mb-8">{t('hero_subtitle')}</p>
          <Link href="/productos">
            <Button size="lg" className="bg-white text-navy hover:bg-gray-100">
              {t('hero_cta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
