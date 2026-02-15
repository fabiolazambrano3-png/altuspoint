import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, sendNewOrderNotification } from '@/lib/email';

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
    const orderItems = items.map((item: { productId: string; quantity: number; unitPrice: number; name: string }) => ({
      order_id: order.id,
      product_id: item.productId || null,
      quantity: item.quantity,
      unit_price: item.unitPrice,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Order items error:', itemsError);
    }

    // Send email notifications (non-blocking)
    if (process.env.RESEND_API_KEY) {
      const customerEmail = user?.email || shippingInfo.email || '';
      const customerName = shippingInfo.name || user?.user_metadata?.full_name || 'Cliente';

      const emailItems = items.map((item: { name: string; quantity: number; unitPrice: number }) => ({
        name: item.name || 'Producto',
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

      // Fire and forget — don't block order response
      Promise.all([
        sendOrderConfirmationEmail({
          orderId: order.id,
          customerEmail,
          customerName,
          items: emailItems,
          totalUsd,
          totalBs,
          paymentMethod,
          shippingAddress: shippingInfo.address,
          shippingCity: shippingInfo.city,
          shippingState: shippingInfo.state,
        }),
        sendNewOrderNotification({
          orderId: order.id,
          customerName,
          customerEmail,
          totalUsd,
          paymentMethod,
          itemCount: items.length,
        }),
      ]).catch((err) => console.error('Email send error:', err));
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error('Order API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
