import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - List all active products (public)
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single product by slug
      const { data: product, error } = await supabase
        .from('products')
        .select('*, categories(id, name_es, name_en, slug, description_es, description_en, image_url)')
        .eq('slug', slug)
        .eq('active', true)
        .single();

      if (error || !product) {
        return NextResponse.json({ product: null });
      }

      // Map category join to category_id-compatible shape
      const mapped = {
        ...product,
        category: product.categories || undefined,
      };
      delete (mapped as Record<string, unknown>).categories;

      return NextResponse.json({ product: mapped });
    }

    // Get all active products
    const { data: products, error } = await supabase
      .from('products')
      .select('*, categories(id, name_es, name_en, slug, description_es, description_en, image_url)')
      .eq('active', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch products error:', error);
      return NextResponse.json({ products: [] });
    }

    // Map categories join
    const mapped = (products || []).map((p) => ({
      ...p,
      category: p.categories || undefined,
      categories: undefined,
    }));

    return NextResponse.json({ products: mapped });
  } catch (err) {
    console.error('Products API error:', err);
    return NextResponse.json({ products: [] });
  }
}
