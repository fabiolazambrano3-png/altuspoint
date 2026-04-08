'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Extend Window interface for fbq
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

// Track PageView on SPA route changes
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
}

// ─── Helper functions for tracking events across the site ───

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

// Pre-built e-commerce events
export const MetaEvents = {
  viewContent: (data: { content_name: string; content_ids: string[]; content_type: string; value?: number; currency?: string }) => {
    trackEvent('ViewContent', data);
  },

  addToCart: (data: { content_ids: string[]; content_name: string; content_type: string; value: number; currency: string }) => {
    trackEvent('AddToCart', data);
  },

  initiateCheckout: (data: { content_ids: string[]; num_items: number; value: number; currency: string }) => {
    trackEvent('InitiateCheckout', data);
  },

  purchase: (data: { content_ids: string[]; content_type: string; value: number; currency: string; num_items: number }) => {
    trackEvent('Purchase', data);
  },

  lead: (data?: { content_name?: string; content_category?: string }) => {
    trackEvent('Lead', data);
  },

  contact: () => {
    trackEvent('Contact');
  },

  search: (searchString: string) => {
    trackEvent('Search', { search_string: searchString });
  },
};
