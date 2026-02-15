import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - List all products (admin view, no RLS filter on active)
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from('products')
      .select('*, categories(name_es, name_en, slug)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch products error:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    return NextResponse.json({ products: products || [] });
  } catch (err) {
    console.error('Products API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new product
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name_es: body.name_es,
        name_en: body.name_en,
        slug: body.slug,
        description_es: body.description_es || '',
        description_en: body.description_en || '',
        price_usd: body.price_usd || 0,
        price_bs: body.price_bs || 0,
        stock: body.stock || 0,
        category_id: body.category_id || null,
        images: body.images || [],
        featured: body.featured || false,
        active: body.active !== false,
        brand: body.brand || '',
        sku: body.sku || '',
        tags: body.tags || [],
      })
      .select()
      .single();

    if (error) {
      console.error('Create product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error('Create product API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update a product
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const { data: product, error } = await supabase
      .from('products')
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error('Update product API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a product
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      console.error('Delete product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete product API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
