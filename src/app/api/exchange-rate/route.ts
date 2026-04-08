import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Public endpoint — returns the latest BCV exchange rate
export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from('exchange_rates')
      .select('rate, fetched_at, source')
      .eq('source', 'bcv')
      .order('fetched_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { rate: 0, error: 'No exchange rate found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      rate: Number(data.rate),
      source: data.source,
      fetched_at: data.fetched_at,
    }, {
      headers: {
        // Cache for 5 minutes on CDN, stale-while-revalidate for 1 hour
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch {
    return NextResponse.json({ rate: 0, error: 'Internal error' }, { status: 500 });
  }
}
