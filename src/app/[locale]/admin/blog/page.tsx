'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Plus, Edit, Trash2, X, Loader2, Search, Eye, EyeOff,
  FileText, Calendar, Tag,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogPost {
  id: string;
  title_es: string;
  title_en: string;
  slug: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
  featured_image: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  author_name: string;
  meta_title_es: string;
  meta_title_en: string;
  meta_description_es: string;
  meta_description_en: string;
  created_at: string;
  updated_at: string;
}

const emptyPost = {
  title_es: '',
  title_en: '',
  slug: '',
  excerpt_es: '',
  excerpt_en: '',
  content_es: '',
  content_en: '',
  featured_image: '',
  tags: [] as string[],
  published: false,
  author_name: 'AltusPoint',
  meta_title_es: '',
  meta_title_en: '',
  meta_description_es: '',
  meta_description_en: '',
};

export default function AdminBlogPage() {
  const t = useTranslations('admin');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
      toast.error('Error cargando artículos');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyPost);
    setActiveTab('content');
    setShowModal(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title_es: post.title_es,
      title_en: post.title_en,
      slug: post.slug,
      excerpt_es: post.excerpt_es,
      excerpt_en: post.excerpt_en,
      content_es: post.content_es,
      content_en: post.content_en,
      featured_image: post.featured_image,
      tags: post.tags || [],
      published: post.published,
      author_name: post.author_name || 'AltusPoint',
      meta_title_es: post.meta_title_es || '',
      meta_title_en: post.meta_title_en || '',
      meta_description_es: post.meta_description_es || '',
      meta_description_en: post.meta_description_en || '',
    });
    setActiveTab('content');
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title_es || !form.slug) {
      toast.error('Título y slug son requeridos');
      return;
    }
    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...form } : form;

      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error');
      }

      toast.success(editingId ? 'Artículo actualizado' : 'Artículo creado');
      setShowModal(false);
      fetchPosts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al guardar';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error');
      toast.success('Artículo eliminado');
      fetchPosts();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: post.id,
          published: !post.published,
        }),
      });
      if (!res.ok) throw new Error('Error');
      toast.success(post.published ? 'Artículo despublicado' : 'Artículo publicado');
      fetchPosts();
    } catch {
      toast.error('Error al cambiar estado');
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

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      !search ||
      p.title_es.toLowerCase().includes(search.toLowerCase()) ||
      p.title_en.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && p.published) ||
      (filterStatus === 'draft' && !p.published);

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-VE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

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
          <h1 className="text-2xl font-bold text-navy">{t('blog')}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredPosts.length !== posts.length
              ? `${filteredPosts.length} de ${posts.length} artículos`
              : `${posts.length} artículos en total`}
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-2" />
          {t('add_post')}
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
          className="sm:w-48 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 bg-white text-gray-700"
        >
          <option value="all">Todos los estados</option>
          <option value="published">Publicados</option>
          <option value="draft">Borradores</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Artículo</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Tags</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                    {search || filterStatus !== 'all'
                      ? 'No se encontraron artículos con esos filtros'
                      : 'No hay artículos aún. Crea el primero.'}
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                          {post.featured_image ? (
                            <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <FileText className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{post.title_es}</p>
                          <p className="text-xs text-gray-400">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          post.published
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {post.published ? 'Publicado' : 'Borrador'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {(post.tags || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue/10 text-blue font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {(post.tags || []).length > 3 && (
                          <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(post)}
                          className="p-2 text-gray-400 hover:text-blue rounded-lg hover:bg-blue/10 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id, post.title_es)}
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
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl mb-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-navy">
                {editingId ? t('edit_post') : t('add_post')}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
              {(['content', 'seo'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-navy text-navy'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab === 'content' && 'Contenido'}
                  {tab === 'seo' && 'SEO & Meta'}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto">

              {/* ─── TAB: CONTENT ─── */}
              {activeTab === 'content' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Título (ES) *"
                      value={form.title_es}
                      onChange={(e) => {
                        const title = e.target.value;
                        setForm({
                          ...form,
                          title_es: title,
                          slug: !editingId ? generateSlug(title) : form.slug,
                        });
                      }}
                    />
                    <Input
                      label="Title (EN)"
                      value={form.title_en}
                      onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Slug *"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Autor"
                      value={form.author_name}
                      onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    />
                    <Input
                      label="Imagen destacada (URL)"
                      value={form.featured_image}
                      onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Extracto (ES)</label>
                      <textarea
                        value={form.excerpt_es}
                        onChange={(e) => setForm({ ...form, excerpt_es: e.target.value })}
                        rows={2}
                        placeholder="Breve resumen del artículo para las tarjetas del listado..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (EN)</label>
                      <textarea
                        value={form.excerpt_en}
                        onChange={(e) => setForm({ ...form, excerpt_en: e.target.value })}
                        rows={2}
                        placeholder="Brief article summary for listing cards..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido (ES) — Markdown</label>
                    <textarea
                      value={form.content_es}
                      onChange={(e) => setForm({ ...form, content_es: e.target.value })}
                      rows={12}
                      placeholder="Escribe el contenido del artículo en Markdown...&#10;&#10;## Subtítulo&#10;&#10;Párrafo de texto con **negritas** y *cursivas*.&#10;&#10;- Lista 1&#10;- Lista 2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (EN) — Markdown</label>
                    <textarea
                      value={form.content_en}
                      onChange={(e) => setForm({ ...form, content_en: e.target.value })}
                      rows={8}
                      placeholder="Write article content in Markdown..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 font-mono"
                    />
                  </div>

                  <Input
                    label="Tags (separar con coma)"
                    value={form.tags.join(', ')}
                    onChange={(e) =>
                      setForm({ ...form, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
                    }
                  />

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-blue focus:ring-blue"
                    />
                    <span className="text-sm text-gray-700">Publicar artículo</span>
                  </label>
                </div>
              )}

              {/* ─── TAB: SEO ─── */}
              {activeTab === 'seo' && (
                <div className="space-y-5">
                  <div className="bg-blue/5 border border-blue/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-blue" />
                      <p className="text-sm font-semibold text-navy">Meta tags para SEO</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Estos campos optimizan cómo aparece el artículo en Google. Si se dejan vacíos, se usarán el título y extracto automáticamente.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Meta título (ES)"
                      value={form.meta_title_es}
                      onChange={(e) => setForm({ ...form, meta_title_es: e.target.value })}
                    />
                    <Input
                      label="Meta title (EN)"
                      value={form.meta_title_en}
                      onChange={(e) => setForm({ ...form, meta_title_en: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta descripción (ES)</label>
                      <textarea
                        value={form.meta_description_es}
                        onChange={(e) => setForm({ ...form, meta_description_es: e.target.value })}
                        rows={3}
                        placeholder="Descripción de 150-160 caracteres para Google..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      />
                      <p className="text-xs text-gray-400 mt-1">{form.meta_description_es.length}/160 caracteres</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meta description (EN)</label>
                      <textarea
                        value={form.meta_description_en}
                        onChange={(e) => setForm({ ...form, meta_description_en: e.target.value })}
                        rows={3}
                        placeholder="150-160 character description for Google..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
                      />
                      <p className="text-xs text-gray-400 mt-1">{form.meta_description_en.length}/160 characters</p>
                    </div>
                  </div>

                  {/* Google Preview */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Vista previa en Google</p>
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-blue-700 text-lg hover:underline cursor-pointer truncate">
                        {form.meta_title_es || form.title_es || 'Título del artículo'}
                      </p>
                      <p className="text-green-700 text-xs mt-0.5">
                        altuspoint.health/es/blog/{form.slug || 'slug-del-articulo'}
                      </p>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {form.meta_description_es || form.excerpt_es || 'Descripción del artículo aparecerá aquí...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <div className="text-xs text-gray-400">
                {form.published ? '✓ Se publicará al guardar' : 'Se guardará como borrador'}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editingId ? 'Guardar Cambios' : 'Crear Artículo'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
