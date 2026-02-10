import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const { items, shippingInfo, paymentMethod, totalUsd, totalBs } = body;

    if (!items?.length || !shippingInfo || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id || null,
        status: 'pending',
        payment_method: paymentMethod,
        total_usd: totalUsd,
        total_bs: totalBs,
        shipping_address: shippingInfo.address,
        shipping_city: shippingInfo.city,
        shipping_state: shippingInfo.state,
        phone: shippingInfo.phone,
        notes: shippingInfo.notes || '',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Create order items
    const orderItems = items.map((item: { productId: string; quantity: number; unitPrice: number }) => ({
      order_id: order.id,
      product_id: item.productId || null,
      quantity: item.quantity,
      unit_price: item.unitPrice,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Order items error:', itemsError);
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error('Order API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
