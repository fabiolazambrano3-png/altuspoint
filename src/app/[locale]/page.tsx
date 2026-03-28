import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Shield, Truck, Headphones, Award, Clock, Heart, Monitor, Scissors, Footprints, Sparkles, Bone, SprayCan, Wind, Bandage, Baby, Handshake, Star, Users, ArrowRight, type LucideIcon } from 'lucide-react';
import { BRAND } from '@/lib/constants';

// 8 Product lines from brandbook with their gradient colors
const productLines: { slug: string; color: string; bgColor: string; icon: LucideIcon }[] = [
  { slug: 'equipos-medicos', color: '#7AB648', bgColor: '#E6F0D9', icon: Monitor },
  { slug: 'material-quirurgico', color: '#8BC66A', bgColor: '#D9EFD6', icon: Scissors },
  { slug: 'medias-de-compresion', color: '#5BB5A2', bgColor: '#D4EDE4', icon: Footprints },
  { slug: 'cirugia-plastica', color: '#5BA8BF', bgColor: '#D6E8ED', icon: Sparkles },
  { slug: 'ortesis-rehabilitacion', color: '#6B8EC2', bgColor: '#D8E4F0', icon: Bone },
  { slug: 'desinfeccion-limpieza', color: '#5A6FAF', bgColor: '#DDE2F0', icon: SprayCan },
  { slug: 'gases-medicinales', color: '#3D4F8F', bgColor: '#D8DAE8', icon: Wind },
  { slug: 'cuidado-heridas', color: '#0B1D4F', bgColor: '#D4D7E5', icon: Bandage },
  { slug: 'linea-materna', color: '#E8A0BF', bgColor: '#F9E4EF', icon: Baby },
];

export default function HomePage() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <div>
      {/* Hero Section — Premium */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#122a6b] to-blue" />
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        </div>
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px]" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44">
          <div className="max-w-3xl">
            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
              <span className="text-sm text-blue/90 font-medium tracking-wide">
                {BRAND.experience} {t('years_experience')}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              {t('hero_title')}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl font-light">
              {t('hero_subtitle')}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/productos">
                <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-semibold bg-white text-navy hover:bg-gray-50 shadow-lg shadow-black/10 transition-all duration-200">
                  {t('hero_cta')}
                </button>
              </Link>
              <Link href="/contacto">
                <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200">
                  {tc('contact')}
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-14 flex flex-wrap gap-8 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{t('trust_certified')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{t('trust_experience')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>{t('trust_shipping')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines — 8 categories from brandbook */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[4px] text-blue font-medium mb-3">
              {t('categories_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              {t('categories')}
            </h2>
            <div className="section-line mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {productLines.map((line) => (
              <Link
                key={line.slug}
                href={`/productos?category=${line.slug}`}
                className="card-premium group relative flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white overflow-hidden"
              >
                {/* Color accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5" style={{backgroundColor: line.color}} />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{backgroundColor: `${line.color}15`}}
                >
                  <line.icon className="w-6 h-6" style={{color: line.color}} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-navy transition-colors leading-tight">
                  {t(`cat_${line.slug.replace(/-/g, '_')}`)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Choose Us — Premium */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Story */}
            <div>
              <p className="text-sm uppercase tracking-[4px] text-blue font-medium mb-3">
                {t('about_label')}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy leading-tight">
                {t('about_title')}
              </h2>
              <div className="section-line mt-6 mb-8" />
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {t('about_text')}
              </p>
              <blockquote className="mt-8 pl-6 border-l-4 border-blue italic text-navy font-display text-xl leading-relaxed">
                &ldquo;{t('about_quote')}&rdquo;
              </blockquote>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-5">
              <div className="card-premium bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <div className="text-4xl font-bold text-gradient-navy font-display">30+</div>
                <p className="mt-2 text-sm text-gray-500">{t('stat_years')}</p>
              </div>
              <div className="card-premium bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <div className="text-4xl font-bold text-gradient-navy font-display">8</div>
                <p className="mt-2 text-sm text-gray-500">{t('stat_lines')}</p>
              </div>
              <div className="card-premium bg-white p-8 rounded-2xl border border-gray-100 text-center">
                <div className="text-4xl font-bold text-gradient-navy font-display">100+</div>
                <p className="mt-2 text-sm text-gray-500">{t('stat_products')}</p>
              </div>
              <div className="card-premium bg-navy p-8 rounded-2xl text-center">
                <div className="text-4xl font-bold text-white font-display">24/7</div>
                <p className="mt-2 text-sm text-white/60">{t('stat_support')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[4px] text-blue font-medium mb-3">
              {t('features_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('why_us')}
            </h2>
            <div className="section-line mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: t('why_quality'), desc: t('why_quality_desc'), color: '#7AB648' },
              { icon: Truck, title: t('why_shipping'), desc: t('why_shipping_desc'), color: '#5BB5A2' },
              { icon: Headphones, title: t('why_support'), desc: t('why_support_desc'), color: '#6B8EC2' },
            ].map((feature, i) => (
              <div key={i} className="card-premium bg-white p-10 rounded-2xl border border-gray-100 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{backgroundColor: `${feature.color}15`}}
                >
                  <feature.icon className="w-7 h-7" style={{color: feature.color}} />
                </div>
                <h3 className="font-semibold text-lg text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Trust strip */}
      <section className="py-16 bg-light-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {[
              { icon: Shield, label: t('value_safety') },
              { icon: Award, label: t('value_quality') },
              { icon: Heart, label: t('value_trust') },
              { icon: Clock, label: t('value_innovation') },
            ].map((value, i) => (
              <div key={i} className="flex items-center gap-3 text-navy">
                <value.icon className="w-5 h-5 text-blue" />
                <span className="text-sm font-semibold tracking-wide">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Message */}
            <div>
              <p className="text-sm uppercase tracking-[4px] text-blue font-medium mb-3">
                {t('distributor_label')}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy leading-tight">
                {t('distributor_title')}
              </h2>
              <div className="section-line mt-6 mb-8" />
              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {t('distributor_text')}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hola, estoy interesado en ser distribuidor AltusPoint. Me gustaría recibir más información.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-base font-semibold bg-green-primary text-white hover:bg-green-dark shadow-lg shadow-green-primary/20 transition-all duration-200">
                    <Handshake className="w-5 h-5" />
                    {t('distributor_cta')}
                  </button>
                </a>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hola, me gustaría conocer los requisitos para ser distribuidor AltusPoint.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-base font-medium border-2 border-navy/20 text-navy hover:bg-navy/5 transition-all duration-200">
                    {t('distributor_cta_secondary')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            {/* Right - Benefits */}
            <div className="space-y-5">
              {[
                { icon: Star, title: t('distributor_benefit_1'), desc: t('distributor_benefit_1_desc'), color: '#7AB648' },
                { icon: Headphones, title: t('distributor_benefit_2'), desc: t('distributor_benefit_2_desc'), color: '#5BB5A2' },
                { icon: Users, title: t('distributor_benefit_3'), desc: t('distributor_benefit_3_desc'), color: '#6B8EC2' },
              ].map((benefit, i) => (
                <div key={i} className="card-premium flex items-start gap-5 p-6 rounded-2xl border border-gray-100 bg-white">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{backgroundColor: `${benefit.color}15`}}
                  >
                    <benefit.icon className="w-6 h-6" style={{color: benefit.color}} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{benefit.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — Premium */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#122a6b] to-blue" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px'}} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('cta_title')}
          </h2>
          <p className="mt-6 text-white/50 text-lg font-light max-w-2xl mx-auto">
            {t('cta_subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/productos">
              <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-semibold bg-white text-navy hover:bg-gray-50 shadow-lg transition-all duration-200">
                {t('hero_cta')}
              </button>
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200">
                WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
