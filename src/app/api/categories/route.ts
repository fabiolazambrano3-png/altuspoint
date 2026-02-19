import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - List all categories (public)
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Fetch categories error:', error);
      return NextResponse.json({ categories: [] });
    }

    return NextResponse.json({ categories: categories || [] });
  } catch (err) {
    console.error('Categories API error:', err);
    return NextResponse.json({ categories: [] });
  }
}
