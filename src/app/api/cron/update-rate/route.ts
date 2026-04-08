import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This endpoint is called by Vercel Cron to update the BCV exchange rate
// Protected by CRON_SECRET to prevent unauthorized access

interface DolarApiResponse {
  promedio: number;
  fechaActualizacion: string;
}

interface ExchangeDynResponse {
  sources: {
    BCV: {
      quote: string;
      last_retrieved: string;
    };
  };
}

async function fetchBcvRate(): Promise<number | null> {
  // Primary: ve.dolarapi.com
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) {
      const data: DolarApiResponse = await res.json();
      if (data.promedio && data.promedio > 0) {
        console.log(`[BCV Rate] dolarapi.com: ${data.promedio}`);
        return data.promedio;
      }
    }
  } catch (err) {
    console.warn('[BCV Rate] dolarapi.com failed:', err);
  }

  // Fallback: exchangedyn.com
  try {
    const res = await fetch(
      'https://api.exchangedyn.com/markets/quotes/usdves/bcv',
      { signal: AbortSignal.timeout(10000) }
    );
    if (res.ok) {
      const data: ExchangeDynResponse = await res.json();
      const quote = Number(data.sources?.BCV?.quote);
      if (quote > 0) {
        console.log(`[BCV Rate] exchangedyn.com: ${quote}`);
        return quote;
      }
    }
  } catch (err) {
    console.warn('[BCV Rate] exchangedyn.com failed:', err);
  }

  return null;
}

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rate = await fetchBcvRate();

    if (!rate) {
      console.error('[BCV Rate] All sources failed');
      return NextResponse.json(
        { error: 'Could not fetch BCV rate from any source' },
        { status: 502 }
      );
    }

    // Use service role key to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('exchange_rates')
      .insert({
        source: 'bcv',
        rate,
        currency_pair: 'USD/VES',
        fetched_at: new Date().toISOString(),
      });

    if (error) {
      console.error('[BCV Rate] Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save rate' }, { status: 500 });
    }

    // Clean up old rates (keep last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await supabase
      .from('exchange_rates')
      .delete()
      .lt('fetched_at', thirtyDaysAgo.toISOString());

    console.log(`[BCV Rate] Updated: ${rate} Bs/$`);
    return NextResponse.json({ success: true, rate });
  } catch (err) {
    console.error('[BCV Rate] Cron error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
