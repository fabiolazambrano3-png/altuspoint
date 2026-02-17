'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { BRAND } from '@/lib/constants';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
      toast.success(t('sent'));
    } catch {
      toast.error('Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp.replace('+', '')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-navy mb-4">{t('title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900">{t('sent')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t('name')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label={t('email')}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('message')}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-blue"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? '...' : t('send')}
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
            <Mail className="w-6 h-6 text-navy mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <a href={`mailto:${BRAND.email}`} className="text-blue hover:underline">
                {BRAND.email}
              </a>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <Phone className="w-6 h-6 text-navy mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900">Teléfono</h3>
              <p className="text-blue group-hover:underline">{BRAND.whatsappFormatted}</p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
            <MapPin className="w-6 h-6 text-navy mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900">Ubicación</h3>
              <p className="text-gray-600">{BRAND.address}</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {t('whatsapp_cta')}
          </a>
        </div>
      </div>
    </div>
  );
}
