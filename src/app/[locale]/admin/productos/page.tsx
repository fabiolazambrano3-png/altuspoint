'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';
import {
  Plus, Edit, Trash2, X, Loader2, Search, Image as ImageIcon,
  Upload, GripVertical, Palette, Ruler,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
  description_es: string;
  description_en: string;
  price_usd: number;
  price_bs: number;
  stock: number;
  category_id: string | null;
  images: string[];
  featured: boolean;
  active: boolean;
  brand: string;
  sku: string;
  tags: string[];
  categories?: { name_es: string; name_en: string; slug: string } | null;
}

interface Category {
  id: string;
  name_es: string;
  name_en: string;
  slug: string;
}

interface Variant {
  id: string;
  product_id: string;
  name: string;
  size: string;
  color: string;
  sku_variant: string;
  stock: number;
  price_diff_usd: number;
  active: boolean;
}

const emptyProduct = {
  name_es: '',
  name_en: '',
  slug: '',
  description_es: '',
  description_en: '',
  price_usd: 0,
  price_bs: 0,
  stock: 0,
  category_id: '',
  images: [] as string[],
  featured: false,
  active: true,
  brand: '',
  sku: '',
  tags: [] as string[],
};

const emptyVariant = {
  name: '',
  size: '',
  color: '',
  sku_variant: '',
  stock: 0,
  price_diff_usd: 0,
  active: true,
};

export default function AdminProductsPage() {
  const t = useTranslations('admin');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);

  // Image upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Variants
  const [variants, setVariants] = useState<Variant[]>([]);
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantForm, setVariantForm] = useState(emptyVariant);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [savingVariant, setSavingVariant] = useState(false);

  // Active tab in modal
  const [activeTab, setActiveTab] = useState<'general' | 'images' | 'variants'>('general');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch {
      // ignore
    }
  };

  const fetchVariants = async (productId: string) => {
    try {
      const res = await fetch(`/api/admin/variants?productId=${productId}`);
      const data = await res.json();
      setVariants(data.variants || []);
    } catch {
      setVariants([]);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setVariants([]);
    setActiveTab('general');
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name_es: product.name_es,
      name_en: product.name_en,
      slug: product.slug,
      description_es: product.description_es,
      description_en: product.description_en,
      price_usd: product.price_usd,
      price_bs: product.price_bs,
      stock: product.stock,
      category_id: product.category_id || '',
      images: product.images || [],
      featured: product.featured,
      active: product.active,
      brand: product.brand || '',
      sku: product.sku || '',
      tags: product.tags || [],
    });
    setActiveTab('general');
    fetchVariants(product.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name_es || !form.slug) {
      toast.error('Nombre y slug son requeridos');
      return;
    }
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...form } : form;

      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          category_id: form.category_id || null,
          price_usd: Number(form.price_usd),
          price_bs: Number(form.price_bs),
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error');
      }

      toast.success(editingId ? 'Producto actualizado' : 'Producto creado');
      setShowModal(false);
      fetchProducts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al guardar';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error');
      toast.success('Producto eliminado');
      fetchProducts();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // ─── Image handlers ───
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productSlug', form.slug || 'product');

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setForm({ ...form, images: [...form.images, data.url] });
      toast.success('Imagen subida');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al subir imagen';
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length) return;
    const newImages = [...form.images];
    const [moved] = newImages.splice(from, 1);
    newImages.splice(to, 0, moved);
    setForm({ ...form, images: newImages });
  };

  // ─── Variant handlers ───
  const openVariantCreate = () => {
    setEditingVariantId(null);
    setVariantForm(emptyVariant);
    setShowVariantForm(true);
  };

  const openVariantEdit = (v: Variant) => {
    setEditingVariantId(v.id);
    setVariantForm({
      name: v.name,
      size: v.size,
      color: v.color,
      sku_variant: v.sku_variant,
      stock: v.stock,
      price_diff_usd: v.price_diff_usd,
      active: v.active,
    });
    setShowVariantForm(true);
  };

  const handleSaveVariant = async () => {
    if (!editingId) {
      toast.error('Primero guarda el producto');
      return;
    }
    setSavingVariant(true);
    try {
      const method = editingVariantId ? 'PUT' : 'POST';
      const body = editingVariantId
        ? { id: editingVariantId, ...variantForm }
        : { product_id: editingId, ...variantForm };

      const res = await fetch('/api/admin/variants', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          stock: Number(variantForm.stock),
          price_diff_usd: Number(variantForm.price_diff_usd),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error');
      }

      toast.success(editingVariantId ? 'Variante actualizada' : 'Variante creada');
      setShowVariantForm(false);
      fetchVariants(editingId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error';
      toast.error(message);
    } finally {
      setSavingVariant(false);
    }
  };

  const handleDeleteVariant = async (id: string) => {
    if (!confirm('¿Eliminar esta variante?')) return;
    try {
      const res = await fetch(`/api/admin/variants?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error');
      toast.success('Variante eliminada');
      if (editingId) fetchVariants(editingId);
    } catch {
      toast.error('Error al eliminar variante');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name_es.toLowerCase().includes(search.toLowerCase()) ||
      p.name_en.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.includes(search.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-navy">{t('products')}</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} productos en total</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          {t('add_product')}
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Producto</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Categoría</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Precio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                    {search ? 'No se encontraron productos' : 'No hay productos aún. Crea el primero.'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.name_es}</p>
                          <p className="text-xs text-gray-400">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-gray-500">
                        {product.categories?.name_es || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-sm">
                        {product.price_usd > 0 ? formatPrice(product.price_usd) : 'Consultar'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-medium text-sm ${product.stock < 10 ? 'text-red-600' : product.stock < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.active ? 'Activo' : 'Inactivo'}
                      </span>
                      {product.featured && (
                        <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue/10 text-blue">
                          ★
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 text-gray-400 hover:text-blue rounded-lg hover:bg-blue/10 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name_es)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════ MODAL ═══════════════ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-6 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl mb-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-navy">
                {editingId ? t('edit_product') : t('add_product')}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
              {(['general', 'images', 'variants'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-navy text-navy'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab === 'general' && 'General'}
                  {tab === 'images' && `Imágenes (${form.images.length})`}
                  {tab === 'variants' && `Variantes (${variants.length})`}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto">

              {/* ─── TAB: GENERAL ─── */}
              {activeTab === 'general' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre (ES) *"
                      value={form.name_es}
                      onChange={(e) => {
                        const name = e.target.value;
                        setForm({
                          ...form,
                          name_es: name,
                          slug: !editingId ? generateSlug(name) : form.slug,
                        });
                      }}
                    />
                    <Input
                      label="Name (EN)"
                      value={form.name_en}
                      onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Slug *"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Marca"
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    />
                    <Input
                      label="SKU"
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (ES)</label>
                      <textarea
                        value={form.description_es}
                        onChange={(e) => setForm({ ...form, description_es: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                      <textarea
                        value={form.description_en}
                        onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="Precio USD"
                      type="number"
                      value={String(form.price_usd)}
                      onChange={(e) => setForm({ ...form, price_usd: Number(e.target.value) })}
                    />
                    <Input
                      label="Precio Bs"
                      type="number"
                      value={String(form.price_bs)}
                      onChange={(e) => setForm({ ...form, price_bs: Number(e.target.value) })}
                    />
                    <Input
                      label="Stock"
                      type="number"
                      value={String(form.stock)}
                      onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    />
                  </div>

                  {categories.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                      <select
                        value={form.category_id}
                        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      >
                        <option value="">Sin categoría</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name_es}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <Input
                    label="Tags (separar con coma)"
                    value={form.tags.join(', ')}
                    onChange={(e) =>
                      setForm({ ...form, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                    }
                  />

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-blue focus:ring-blue"
                      />
                      <span className="text-sm text-gray-700">Destacado</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(e) => setForm({ ...form, active: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-blue focus:ring-blue"
                      />
                      <span className="text-sm text-gray-700">Activo</span>
                    </label>
                  </div>
                </div>
              )}

              {/* ─── TAB: IMAGES ─── */}
              {activeTab === 'images' && (
                <div className="space-y-4">
                  {/* Upload button */}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue hover:bg-blue/5 transition-colors"
                    >
                      {uploading ? (
                        <Loader2 className="w-8 h-8 animate-spin text-blue mx-auto" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      )}
                      <p className="mt-2 text-sm text-gray-500">
                        {uploading ? 'Subiendo...' : 'Haz clic para subir una imagen'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG o WebP (máx. 5MB)</p>
                    </button>
                  </div>

                  {/* Image list */}
                  {form.images.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-4">No hay imágenes</p>
                  ) : (
                    <div className="space-y-2">
                      {form.images.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                        >
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => moveImage(index, index - 1)}
                              disabled={index === 0}
                              className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              title="Mover arriba"
                            >
                              <GripVertical className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 overflow-hidden shrink-0">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 truncate">{url}</p>
                            {index === 0 && (
                              <span className="text-xs font-medium text-navy bg-navy/10 px-2 py-0.5 rounded mt-1 inline-block">
                                Imagen principal
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {index > 0 && (
                              <button
                                onClick={() => moveImage(index, 0)}
                                className="p-1.5 text-gray-400 hover:text-blue rounded hover:bg-blue/10 text-xs"
                                title="Hacer principal"
                              >
                                ★
                              </button>
                            )}
                            <button
                              onClick={() => removeImage(index)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Manual URL input */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400 mb-2">O agrega una URL manualmente:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="/images/products/nombre-imagen.png"
                        id="manual-url-input"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.currentTarget;
                            if (input.value.trim()) {
                              setForm({ ...form, images: [...form.images, input.value.trim()] });
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const input = document.getElementById('manual-url-input') as HTMLInputElement;
                          if (input?.value.trim()) {
                            setForm({ ...form, images: [...form.images, input.value.trim()] });
                            input.value = '';
                          }
                        }}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB: VARIANTS ─── */}
              {activeTab === 'variants' && (
                <div className="space-y-4">
                  {!editingId ? (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">Guarda el producto primero para agregar variantes</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {variants.length} variante{variants.length !== 1 ? 's' : ''}
                        </p>
                        <Button onClick={openVariantCreate}>
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar Variante
                        </Button>
                      </div>

                      {/* Variant form */}
                      {showVariantForm && (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-navy">
                              {editingVariantId ? 'Editar variante' : 'Nueva variante'}
                            </h4>
                            <button onClick={() => setShowVariantForm(false)} className="p-1 hover:bg-gray-200 rounded">
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                          <Input
                            label="Nombre (ej: Talla M - Negro)"
                            value={variantForm.name}
                            onChange={(e) => setVariantForm({ ...variantForm, name: e.target.value })}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              label="Talla"
                              value={variantForm.size}
                              onChange={(e) => setVariantForm({ ...variantForm, size: e.target.value })}
                            />
                            <Input
                              label="Color"
                              value={variantForm.color}
                              onChange={(e) => setVariantForm({ ...variantForm, color: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <Input
                              label="SKU Variante"
                              value={variantForm.sku_variant}
                              onChange={(e) => setVariantForm({ ...variantForm, sku_variant: e.target.value })}
                            />
                            <Input
                              label="Stock"
                              type="number"
                              value={String(variantForm.stock)}
                              onChange={(e) => setVariantForm({ ...variantForm, stock: Number(e.target.value) })}
                            />
                            <Input
                              label="Dif. Precio USD"
                              type="number"
                              value={String(variantForm.price_diff_usd)}
                              onChange={(e) => setVariantForm({ ...variantForm, price_diff_usd: Number(e.target.value) })}
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setShowVariantForm(false)}>Cancelar</Button>
                            <Button onClick={handleSaveVariant} disabled={savingVariant}>
                              {savingVariant && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                              {editingVariantId ? 'Actualizar' : 'Crear'}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Variant list */}
                      {variants.length === 0 && !showVariantForm ? (
                        <div className="text-center py-8 text-gray-400">
                          <Ruler className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No hay variantes. Agrega tallas, colores, etc.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {variants.map((v) => (
                            <div
                              key={v.id}
                              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{v.name || `${v.size} ${v.color}`.trim() || 'Sin nombre'}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                  {v.size && (
                                    <span className="inline-flex items-center gap-1">
                                      <Ruler className="w-3 h-3" /> {v.size}
                                    </span>
                                  )}
                                  {v.color && (
                                    <span className="inline-flex items-center gap-1">
                                      <Palette className="w-3 h-3" /> {v.color}
                                    </span>
                                  )}
                                  {v.sku_variant && <span>SKU: {v.sku_variant}</span>}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className={`text-sm font-medium ${v.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                                  {v.stock} uds
                                </p>
                                {v.price_diff_usd !== 0 && (
                                  <p className="text-xs text-gray-400">
                                    {v.price_diff_usd > 0 ? '+' : ''}{formatPrice(v.price_diff_usd)}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => openVariantEdit(v)}
                                  className="p-1.5 text-gray-400 hover:text-blue rounded hover:bg-blue/10"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVariant(v.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-red-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingId ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
