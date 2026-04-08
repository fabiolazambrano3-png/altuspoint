'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Package, Loader2, Eye, ChevronDown } from 'lucide-react';
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '@/lib/constants';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  product_id: string | null;
}

interface Order {
  id: string;
  user_id: string | null;
  status: string;
  payment_method: string;
  payment_proof_url: string | null;
  total_usd: number;
  total_bs: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  phone: string;
  notes: string;
  created_at: string;
  order_items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  payment_uploaded: 'bg-blue/10 text-blue',
  confirmed: 'bg-green-100 text-green-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminOrdersPage() {
  const t = useTranslations('admin');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      toast.error('Error cargando pedidos');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });

      if (!res.ok) throw new Error('Error');
      toast.success('Estado actualizado');
      fetchOrders();
    } catch {
      toast.error('Error al actualizar');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const statusLabels = ORDER_STATUS_LABELS.es;
  const paymentLabels = PAYMENT_METHOD_LABELS.es;

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">{t('orders')}</h1>
          <p className="text-sm text-gray-500 mt-1">{orders.length} pedidos en total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'payment_uploaded', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterStatus === s
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'all' ? 'Todos' : statusLabels[s as keyof typeof statusLabels] || s}
            {s !== 'all' && (
              <span className="ml-1.5 opacity-60">
                ({orders.filter((o) => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-100 rounded-xl">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No hay pedidos {filterStatus !== 'all' ? 'con este estado' : 'aún'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              {/* Order Header Row */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono text-xs text-gray-400">#{order.id.slice(0, 8)}</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('es-VE', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500 hidden sm:inline">
                    {paymentLabels[order.payment_method as keyof typeof paymentLabels] || order.payment_method}
                  </span>
                  <span className="font-semibold text-navy">
                    ${Number(order.total_usd).toFixed(2)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {statusLabels[order.status as keyof typeof statusLabels] || order.status}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Shipping Info */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Envío</h4>
                      <p className="text-sm text-gray-700">{order.shipping_address}</p>
                      <p className="text-sm text-gray-700">{order.shipping_city}, {order.shipping_state}</p>
                      <p className="text-sm text-gray-700">Tel: {order.phone}</p>
                      {order.notes && (
                        <p className="text-sm text-gray-500 mt-2 italic">Nota: {order.notes}</p>
                      )}
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                        Artículos ({order.order_items.length})
                      </h4>
                      <div className="space-y-1.5">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.quantity}x — ${Number(item.unit_price).toFixed(2)}
                            </span>
                            <span className="font-medium text-gray-800">
                              ${(item.quantity * Number(item.unit_price)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-gray-100 pt-1.5 flex justify-between font-semibold text-sm">
                          <span>Total</span>
                          <span className="text-navy">${Number(order.total_usd).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Cambiar Estado</h4>
                      <div className="space-y-1.5">
                        {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(order.id, s)}
                            disabled={order.status === s || updatingStatus === order.id}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              order.status === s
                                ? 'bg-navy text-white cursor-default'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {updatingStatus === order.id ? (
                              <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
                            ) : null}
                            {statusLabels[s as keyof typeof statusLabels]}
                          </button>
                        ))}
                      </div>

                      {order.payment_proof_url && (
                        <a
                          href={order.payment_proof_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center gap-2 text-xs text-blue hover:underline"
                        >
                          <Eye className="w-3 h-3" />
                          Ver comprobante de pago
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
