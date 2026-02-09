import { type Locale } from '@/types';

export function formatPrice(amount: number, currency: 'USD' | 'BS' = 'USD'): string {
  if (currency === 'USD') {
    return `$${amount.toFixed(2)}`;
  }
  return `Bs. ${amount.toFixed(2)}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLocalizedField(item: any, field: string, locale: Locale): string {
  const key = `${field}_${locale}`;
  return (item[key] as string) || '';
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
