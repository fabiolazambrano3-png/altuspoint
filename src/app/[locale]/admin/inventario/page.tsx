'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Loader2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
  stock: number;
  active: boolean;
  images: string[];
  categories?: { name_es: string } | null;
}

export default function AdminInventoryPage() {
  const t = useTranslations('admin');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        toast.error('Error cargando productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const lowStock = products.filter((p) => p.stock < 20 && p.stock > 0);
  const outOfStock = products.filter((p) => p.stock === 0);
  const okStock = products.filter((p) => p.stock >= 20);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">{t('inventory')}</h1>
        <p className="text-sm text-gray-500 mt-1">{products.length} productos en total</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{outOfStock.length}</p>
          <p className="text-xs text-red-500 mt-1">Agotados</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{lowStock.length}</p>
          <p className="text-xs text-amber-500 mt-1">Stock Bajo (&lt;20)</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{okStock.length}</p>
          <p className="text-xs text-green-500 mt-1">Stock OK</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {(outOfStock.length > 0 || lowStock.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-amber-700 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" />
            Productos con Atención ({outOfStock.length + lowStock.length})
          </h2>
          <div className="space-y-2">
            {[...outOfStock, ...lowStock].map((product) => (
              <div
                key={product.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  product.stock === 0
                    ? 'bg-red-50 border-red-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.name_es}</p>
                    <p className="text-xs text-gray-500">{product.categories?.name_es || '—'}</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${product.stock === 0 ? 'text-red-700' : 'text-amber-700'}`}>
                  {product.stock === 0 ? 'Agotado' : `${product.stock} uds`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Inventory Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Producto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Categoría</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 text-sm">{product.name_es}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-gray-500">{product.categories?.name_es || '—'}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-bold text-sm ${
                      product.stock === 0
                        ? 'text-red-600'
                        : product.stock < 20
                        ? 'text-amber-600'
                        : 'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.stock === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock < 20
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Agotado' : product.stock < 20 ? 'Bajo' : 'OK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
