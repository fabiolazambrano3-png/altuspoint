'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  Plus, Edit, Trash2, X, Loader2, Upload, FileText, Download,
  GripVertical, Eye, EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PRODUCT_LINE_COLORS } from '@/lib/constants';

interface LineBrochure {
  id: string;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  category_slug: string;
  image_url: string;
  brochure_url: string;
  display_order: number;
  active: boolean;
}

const CATEGORY_OPTIONS = [
  { slug: 'equipos-medicos', label: 'Equipos Médicos' },
  { slug: 'material-quirurgico', label: 'Material Quirúrgico' },
  { slug: 'medias-de-compresion', label: 'Medias de Compresión' },
  { slug: 'cirugia-plastica', label: 'Cirugía Plástica y Post-quirúrgico' },
  { slug: 'ortesis-rehabilitacion', label: 'Órtesis y Rehabilitación' },
  { slug: 'desinfeccion-limpieza', label: 'Desinfección y Limpieza' },
  { slug: 'gases-medicinales', label: 'Gases Medicinales' },
  { slug: 'cuidado-heridas', label: 'Cuidado de Heridas' },
  { slug: 'linea-materna', label: 'Línea Materna' },
];

const emptyForm: Omit<LineBrochure, 'id'> = {
  name_es: '',
  name_en: '',
  description_es: '',
  description_en: '',
  category_slug: '',
  image_url: '',
  brochure_url: '',
  display_order: 0,
  active: true,
};

export default function AdminRecursos() {
  const [brochures, setBrochures] = useState<LineBrochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<LineBrochure | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const fetchBrochures = async () => {
    try {
      const res = await fetch('/api/admin/resources');
      const data = await res.json();
      setBrochures(data.brochures || []);
    } catch {
      toast.error('Error cargando brochures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBrochures(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (b: LineBrochure) => {
    setEditing(b);
    setForm({
      name_es: b.name_es,
      name_en: b.name_en,
      description_es: b.description_es,
      description_en: b.description_en,
      category_slug: b.category_slug,
      image_url: b.image_url,
      brochure_url: b.brochure_url,
      display_order: b.display_order,
      active: b.active,
    });
    setShowModal(true);
  };

  const handleUploadPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Solo se permiten archivos PDF');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error('El archivo no puede superar 20MB');
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('productSlug', form.category_slug || 'linea');
      const res = await fetch('/api/admin/upload-brochure', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, brochure_url: data.url }));
        toast.success('PDF subido correctamente');
      } else {
        toast.error(data.error || 'Error subiendo PDF');
      }
    } catch {
      toast.error('Error subiendo PDF');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('productSlug', form.category_slug || 'linea');
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, image_url: data.url }));
        toast.success('Imagen subida');
      } else {
        toast.error(data.error || 'Error subiendo imagen');
      }
    } catch {
      toast.error('Error subiendo imagen');
    } finally {
      setUploadingImage(false);
      if (imageRef.current) imageRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!form.name_es) {
      toast.error('El nombre es requerido');
      return;
    }
    if (!form.brochure_url) {
      toast.error('Debes subir un PDF');
      return;
    }

    setSaving(true);
    try {
      const method = editing ? 'PUT' : 'POST';
      const body = editing ? { id: editing.id, ...form } : form;
      const res = await fetch('/api/admin/resources', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(editing ? 'Brochure actualizado' : 'Brochure creado');
        setShowModal(false);
        fetchBrochures();
      }
    } catch {
      toast.error('Error guardando');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este brochure?')) return;
    try {
      const res = await fetch(`/api/admin/resources?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Brochure eliminado');
        fetchBrochures();
      }
    } catch {
      toast.error('Error eliminando');
    }
  };

  const toggleActive = async (b: LineBrochure) => {
    try {
      await fetch('/api/admin/resources', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: b.id, active: !b.active }),
      });
      fetchBrochures();
      toast.success(b.active ? 'Brochure ocultado' : 'Brochure visible');
    } catch {
      toast.error('Error actualizando');
    }
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Recursos / Brochures</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona los brochures descargables por línea de producto
          </p>
        </div>
        <Button onClick={openNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Agregar brochure
        </Button>
      </div>

      {brochures.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500">No hay brochures</h3>
          <p className="text-sm text-gray-400 mt-1">Agrega el primer brochure de línea de producto</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-medium text-gray-500">Orden</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Línea</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Nombre</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Estado</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">PDF</th>
                <th className="text-right px-5 py-3 font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {brochures.map((b) => {
                const catLabel = CATEGORY_OPTIONS.find((c) => c.slug === b.category_slug)?.label || b.category_slug;
                const lineColor = PRODUCT_LINE_COLORS[b.category_slug] || '#6B8EC2';
                return (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="text-gray-400 flex items-center gap-1">
                        <GripVertical className="w-3.5 h-3.5" />
                        {b.display_order}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lineColor }} />
                        <span className="text-xs text-gray-500">{catLabel}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">{b.name_es}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleActive(b)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                          b.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {b.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {b.active ? 'Visible' : 'Oculto'}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      {b.brochure_url && (
                        <a
                          href={b.brochure_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue hover:underline flex items-center gap-1 text-xs"
                        >
                          <Download className="w-3 h-3" />
                          Ver PDF
                        </a>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(b)}
                          className="p-1.5 text-gray-400 hover:text-blue hover:bg-blue/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-navy">
                {editing ? 'Editar brochure' : 'Nuevo brochure'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Línea de producto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Línea de producto
                </label>
                <select
                  value={form.category_slug}
                  onChange={(e) => setForm((f) => ({ ...f, category_slug: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none"
                >
                  <option value="">Seleccionar línea...</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Nombre ES */}
              <Input
                label="Nombre (Español)"
                value={form.name_es}
                onChange={(e) => setForm((f) => ({ ...f, name_es: e.target.value }))}
                placeholder="Ej: Brochure Línea Órtesis y Rehabilitación"
              />

              {/* Nombre EN */}
              <Input
                label="Nombre (English)"
                value={form.name_en}
                onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))}
                placeholder="Ej: Orthosis & Rehabilitation Line Brochure"
              />

              {/* Descripción ES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (Español)
                </label>
                <textarea
                  value={form.description_es}
                  onChange={(e) => setForm((f) => ({ ...f, description_es: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none resize-none"
                  placeholder="Breve descripción de la línea..."
                />
              </div>

              {/* Descripción EN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (English)
                </label>
                <textarea
                  value={form.description_en}
                  onChange={(e) => setForm((f) => ({ ...f, description_en: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none resize-none"
                  placeholder="Short description of the line..."
                />
              </div>

              {/* Upload PDF */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo PDF (Brochure)
                </label>
                {form.brochure_url ? (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <a
                      href={form.brochure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-700 hover:underline flex-1 truncate"
                    >
                      PDF cargado
                    </a>
                    <button
                      onClick={() => setForm((f) => ({ ...f, brochure_url: '' }))}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleUploadPDF}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 text-center hover:border-blue hover:bg-blue/5 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-blue mx-auto" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-gray-500">
                            Haz clic para subir el PDF (máx. 20MB)
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Upload imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen de portada (opcional)
                </label>
                {form.image_url ? (
                  <div className="relative">
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      onClick={() => setForm((f) => ({ ...f, image_url: '' }))}
                      className="absolute top-2 right-2 bg-white/80 p-1 rounded-lg hover:bg-white"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={imageRef}
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                    <button
                      onClick={() => imageRef.current?.click()}
                      disabled={uploadingImage}
                      className="w-full border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 text-center hover:border-blue hover:bg-blue/5 transition-colors disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-5 h-5 animate-spin text-blue mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-500">
                          Subir imagen de portada
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Orden */}
              <Input
                label="Orden de visualización"
                type="number"
                value={String(form.display_order)}
                onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {editing ? 'Guardar cambios' : 'Crear brochure'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
