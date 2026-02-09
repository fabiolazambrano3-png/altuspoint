'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Building2, Smartphone, DollarSign, CreditCard, Bitcoin } from 'lucide-react';
import type { PaymentMethod } from '@/types';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
}

const methods: { id: PaymentMethod; icon: React.ElementType; key: string }[] = [
  { id: 'bank_transfer', icon: Building2, key: 'bank_transfer' },
  { id: 'pago_movil', icon: Smartphone, key: 'pago_movil' },
  { id: 'zelle', icon: DollarSign, key: 'zelle' },
  { id: 'paypal', icon: CreditCard, key: 'paypal' },
  { id: 'crypto', icon: Bitcoin, key: 'crypto' },
];

export default function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  const t = useTranslations('checkout');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {methods.map(({ id, icon: Icon, key }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className={cn(
            'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
            selected === id
              ? 'border-navy bg-light-blue'
              : 'border-gray-200 hover:border-blue/50'
          )}
        >
          <Icon className={cn('w-6 h-6', selected === id ? 'text-navy' : 'text-gray-400')} />
          <span className={cn('font-medium', selected === id ? 'text-navy' : 'text-gray-700')}>
            {t(key)}
          </span>
        </button>
      ))}
    </div>
  );
}
