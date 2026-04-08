'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BRAND } from '@/lib/constants';
import {
  MessageCircle,
  ChevronDown,
  Shield,
  Award,
  MapPin,
  GraduationCap,
  Megaphone,
  TrendingUp,
  Monitor,
  Scissors,
  Footprints,
  Sparkles,
  Bone,
  SprayCan,
  Wind,
  Bandage,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  Quote,
  type LucideIcon,
} from 'lucide-react';

const whatsappUrl = `https://wa.me/${BRAND.whatsapp.replace('+', '')}?text=${encodeURIComponent('Hola, estoy interesado en ser distribuidor AltusPoint. Me gustaría recibir más información.')}`;

const benefits = [
  { icon: Award, color: '#7AB648' },
  { icon: Shield, color: '#6B8EC2' },
  { icon: MapPin, color: '#5BB5A2' },
  { icon: GraduationCap, color: '#5A6FAF' },
  { icon: Megaphone, color: '#3D4F8F' },
  { icon: TrendingUp, color: '#0B1D4F' },
];

const productLines: { icon: LucideIcon; color: string }[] = [
  { icon: Monitor, color: '#7AB648' },
  { icon: Scissors, color: '#8BC66A' },
  { icon: Footprints, color: '#5BB5A2' },
  { icon: Sparkles, color: '#5BA8BF' },
  { icon: Bone, color: '#6B8EC2' },
  { icon: SprayCan, color: '#5A6FAF' },
  { icon: Wind, color: '#3D4F8F' },
  { icon: Bandage, color: '#0B1D4F' },
];

const brandNames = [
  'Medivaric', 'Hollister', 'Medical Illumination', 'BSN Medical',
  'Quirusmart', 'Infinium', 'Exeol', 'Ohio Medical', 'Molnlycke',
];

export default function DistribuidoresPage() {
  const t = useTranslations('distributors');
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToRequirements = () => {
    document.getElementById('requisitos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#122a6b] to-blue" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px]" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-primary animate-pulse" />
              <span className="text-sm text-blue/90 font-medium tracking-wide">
                {t('hero_badge')}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              {t('hero_title')}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl font-light">
              {t('hero_subtitle')}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2.5 rounded-lg px-8 py-3.5 text-base font-semibold bg-green-primary text-white hover:bg-green-dark shadow-lg shadow-green-primary/25 transition-all duration-200">
                  <MessageCircle className="w-5 h-5" />
                  {t('hero_cta')}
                </button>
              </a>
              <button
                onClick={scrollToRequirements}
                className="inline-flex items-center justify-center rounded-lg px-8 py-3.5 text-base font-medium border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
              >
                {t('hero_cta_secondary')}
              </button>
            </div>

            <div className="mt-14 flex flex-wrap gap-8 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>{t('trust_1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{t('trust_2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t('trust_3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('benefits_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('benefits_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="card-premium bg-white border border-gray-100 rounded-2xl p-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${b.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {t(`benefit_${i + 1}_title`)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`benefit_${i + 1}_desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARCAS ── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('brands_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('brands_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {brandNames.map((name) => (
              <div
                key={name}
                className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-navy font-semibold text-sm shadow-sm"
              >
                {name}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm max-w-xl mx-auto">
            {t('brands_text')}
          </p>
        </div>
      </section>

      {/* ── LÍNEAS DE PRODUCTO ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('lines_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('lines_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {productLines.map((line, i) => {
              const Icon = line.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${line.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: line.color }} />
                  </div>
                  <span className="text-sm font-medium text-navy text-center">
                    {t(`line_${i + 1}`)}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8 max-w-xl mx-auto">
            {t('lines_text')}
          </p>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('process_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('process_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-green-primary via-blue to-navy" />

            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-navy flex items-center justify-center mb-6 relative z-10 shadow-sm">
                  <span className="text-2xl font-bold text-navy">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {t(`step_${step}_title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`step_${step}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUISITOS ── */}
      <section id="requisitos" className="py-20 sm:py-28" style={{ backgroundColor: '#E8EFF8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('req_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('req_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <ul className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {t(`req_${i}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 italic leading-relaxed">
                  {t('req_note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('testimonials_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('testimonials_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-premium bg-white border border-gray-100 rounded-2xl p-8 relative">
                <Quote className="w-8 h-8 text-blue/20 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                  {t(`testimonial_${i}_text`)}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                    <span className="text-navy font-bold text-sm">D{i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy">{t(`testimonial_${i}_author`)}</p>
                    <p className="text-xs text-gray-400">{t(`testimonial_${i}_region`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue text-sm font-semibold uppercase tracking-widest mb-3">
              {t('faq_label')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              {t('faq_title')}
            </h2>
            <div className="section-line mx-auto mt-4" />
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-medium text-navy pr-4">
                    {t(`faq_${i}_q`)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t(`faq_${i}_a`)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#122a6b] to-blue" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('cta_title')}
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto font-light">
            {t('cta_subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2.5 rounded-lg px-8 py-3.5 text-base font-semibold bg-green-primary text-white hover:bg-green-dark shadow-lg shadow-green-primary/25 transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
                {t('hero_cta')}
              </button>
            </a>
          </div>

          <div className="mt-8 text-sm text-white/40">
            <a href={`mailto:${BRAND.email}`} className="hover:text-white/60 transition-colors">
              {t('cta_email_text')} {BRAND.email}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/30">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{BRAND.whatsappFormatted}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{BRAND.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Instagram: {BRAND.instagram}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
