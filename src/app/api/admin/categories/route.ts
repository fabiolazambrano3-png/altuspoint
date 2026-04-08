import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_es');

    if (error) {
      console.error('Fetch categories error:', error);
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }

    return NextResponse.json({ categories: categories || [] });
  } catch (err) {
    console.error('Categories API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
