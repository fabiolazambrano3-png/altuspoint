import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('line_brochures')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching line brochures:', error);
      return NextResponse.json({ brochures: [] });
    }

    return NextResponse.json({ brochures: data || [] });
  } catch (err) {
    console.error('Resources API error:', err);
    return NextResponse.json({ brochures: [] });
  }
}
