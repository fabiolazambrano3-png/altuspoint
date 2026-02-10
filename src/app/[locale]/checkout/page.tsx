'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/components/providers/CartProvider';
import { Link } from '@/i18n/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector';
import PaymentInstructions from '@/components/checkout/PaymentInstructions';
import ProofUpload from '@/components/checkout/ProofUpload';
import { formatPrice } from '@/lib/utils';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import type { PaymentMethod } from '@/types';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tc = useTranslations('cart');
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.product.price_usd,
          })),
          shippingInfo: form,
          paymentMethod,
          totalUsd: totalPrice,
          totalBs: totalPrice * 36,
        }),
      });

      const orderData = await orderRes.json();

      // Upload payment proof if exists
      if (proofFile && orderData.orderId) {
        const formData = new FormData();
        formData.append('file', proofFile);
        formData.append('orderId', orderData.orderId);
        await fetch('/api/upload-proof', { method: 'POST', body: formData });
      }

      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error('Order error:', err);
      toast.error('Error al crear el pedido');
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-6">{tc('empty')}</p>
        <Link href="/productos">
          <Button>{tc('empty_cta')}</Button>
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-navy mb-4">{t('order_placed')}</h1>
        <p className="text-gray-600 mb-8">{t('order_placed_desc')}</p>
        <Link href="/productos">
          <Button>Seguir comprando</Button>
        </Link>
      </div>
    );
  }

  const isManualPayment = paymentMethod && paymentMethod !== 'paypal';
  const canSubmit =
    form.fullName &&
    form.phone &&
    form.address &&
    form.city &&
    form.state &&
    paymentMethod &&
    (paymentMethod === 'paypal' || proofFile);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-bold text-navy mb-8">{t('title')}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">{t('shipping_info')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('full_name')}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
                <Input
                  label={t('phone')}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <div className="sm:col-span-2">
                  <Input
                    label={t('address')}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label={t('city')}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
                <Input
                  label={t('state')}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('notes')}</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 focus:border-blue"
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-navy mb-4">{t('payment_method')}</h2>
              <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />

              {paymentMethod && (
                <div className="mt-6">
                  <PaymentInstructions method={paymentMethod} />
                </div>
              )}

              {isManualPayment && (
                <div className="mt-6">
                  <ProofUpload onFileSelect={setProofFile} />
                </div>
              )}
            </section>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-navy mb-4">{t('order_summary')}</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1 mr-2">
                      {item.product.name_es} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.product.price_usd * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-lg">{tc('total')}</span>
                <span className="font-bold text-lg text-navy">{formatPrice(totalPrice)}</span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!canSubmit}
              >
                {t('place_order')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
