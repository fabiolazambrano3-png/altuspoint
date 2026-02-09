'use client';

import { useTranslations } from 'next-intl';
import { PAYMENT_INFO } from '@/lib/constants';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { PaymentMethod } from '@/types';

interface PaymentInstructionsProps {
  method: PaymentMethod;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={copy} className="p-1 hover:bg-gray-200 rounded transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">{value}</span>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

export default function PaymentInstructions({ method }: PaymentInstructionsProps) {
  const t = useTranslations('checkout');

  if (method === 'paypal') {
    return (
      <div className="p-4 bg-blue-50 rounded-xl">
        <p className="text-sm text-blue-800">
          {t('paypal')} - El pago se procesará automáticamente.
        </p>
      </div>
    );
  }

  const bt = PAYMENT_INFO.bank_transfer;
  const pm = PAYMENT_INFO.pago_movil;
  const zl = PAYMENT_INFO.zelle;
  const cr = PAYMENT_INFO.crypto;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h4 className="font-semibold text-navy mb-3">{t('payment_instructions')}</h4>

      {method === 'bank_transfer' && (
        <>
          <InfoRow label="Banco" value={bt.bank} />
          <InfoRow label="Tipo" value={bt.account_type} />
          <InfoRow label="Cuenta" value={bt.account_number} />
          <InfoRow label="RIF" value={bt.rif} />
          <InfoRow label="Titular" value={bt.holder} />
        </>
      )}

      {method === 'pago_movil' && (
        <>
          <InfoRow label="Teléfono" value={pm.phone} />
          <InfoRow label="Banco" value={pm.bank_code} />
          <InfoRow label="Cédula/RIF" value={pm.id} />
        </>
      )}

      {method === 'zelle' && (
        <>
          <InfoRow label="Email" value={zl.email} />
          <InfoRow label="Titular" value={zl.holder} />
        </>
      )}

      {method === 'crypto' && (
        <>
          <InfoRow label="Red" value={cr.network} />
          <InfoRow label="Wallet" value={cr.wallet} />
          <InfoRow label="Moneda" value={cr.currency} />
        </>
      )}
    </div>
  );
}
