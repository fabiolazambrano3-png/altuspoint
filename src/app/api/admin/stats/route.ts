import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;

    const [ordersRes, pendingRes, productsRes, revenueRes] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('total_usd').not('status', 'eq', 'cancelled'),
    ]);

    const totalRevenue = (revenueRes.data || []).reduce((sum, o) => sum + Number(o.total_usd), 0);

    return NextResponse.json({
      totalOrders: ordersRes.count || 0,
      pendingOrders: pendingRes.count || 0,
      totalProducts: productsRes.count || 0,
      totalRevenue,
    });
  } catch (err) {
    console.error('Stats error:', err);
    return NextResponse.json({ totalOrders: 0, pendingOrders: 0, totalProducts: 0, totalRevenue: 0 });
  }
}
