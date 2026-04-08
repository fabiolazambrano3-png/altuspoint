'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const META_PIXEL_ID = '1479611343947425';

// Extend Window interface for fbq
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();

  // Track PageView on route changes (SPA navigation)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
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
