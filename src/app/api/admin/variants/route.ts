import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - List variants for a product
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'productId required' }, { status: 400 });
    }

    const { data: variants, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Fetch variants error:', error);
      return NextResponse.json({ error: 'Failed to fetch variants' }, { status: 500 });
    }

    return NextResponse.json({ variants: variants || [] });
  } catch (err) {
    console.error('Variants API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new variant
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { data: variant, error } = await supabase
      .from('product_variants')
      .insert({
        product_id: body.product_id,
        name: body.name || '',
        size: body.size || '',
        color: body.color || '',
        sku_variant: body.sku_variant || '',
        stock: body.stock || 0,
        price_diff_usd: body.price_diff_usd || 0,
        active: body.active !== false,
      })
      .select()
      .single();

    if (error) {
      console.error('Create variant error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ variant });
  } catch (err) {
    console.error('Create variant API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update a variant
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Variant ID required' }, { status: 400 });
    }

    const { data: variant, error } = await supabase
      .from('product_variants')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update variant error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ variant });
  } catch (err) {
    console.error('Update variant API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a variant
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Variant ID required' }, { status: 400 });
    }

    const { error } = await supabase.from('product_variants').delete().eq('id', id);

    if (error) {
      console.error('Delete variant error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete variant API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
