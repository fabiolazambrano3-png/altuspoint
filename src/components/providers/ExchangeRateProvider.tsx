'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface ExchangeRateContextType {
  rate: number;          // BCV rate (Bs per $1 USD)
  loading: boolean;
  lastUpdated: string | null;
  convertToVes: (usd: number) => number;
  formatBs: (usd: number) => string;
}

const ExchangeRateContext = createContext<ExchangeRateContextType>({
  rate: 0,
  loading: true,
  lastUpdated: null,
  convertToVes: () => 0,
  formatBs: () => 'Bs. 0.00',
});

export function ExchangeRateProvider({ children }: { children: React.ReactNode }) {
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch('/api/exchange-rate');
        if (res.ok) {
          const data = await res.json();
          if (data.rate > 0) {
            setRate(data.rate);
            setLastUpdated(data.fetched_at);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch exchange rate:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRate();

    // Refresh rate every 30 minutes
    const interval = setInterval(fetchRate, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToVes = useCallback(
    (usd: number) => (rate > 0 ? usd * rate : 0),
    [rate]
  );

  const formatBs = useCallback(
    (usd: number) => {
      if (rate <= 0) return '';
      const bs = usd * rate;
      return `Bs. ${bs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [rate]
  );

  return (
    <ExchangeRateContext.Provider value={{ rate, loading, lastUpdated, convertToVes, formatBs }}>
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRate() {
  return useContext(ExchangeRateContext);
}
