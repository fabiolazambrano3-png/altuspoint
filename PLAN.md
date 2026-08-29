# Plan: Variantes de producto + Upload de imágenes en Admin

## 1. Variantes de producto (tallas/colores)

### Base de datos
- Crear tabla `product_variants` en Supabase:
  - `id` UUID
  - `product_id` UUID (FK → products)
  - `name` TEXT (ej: "Talla S - Beige", "Talla M - Negro")
  - `size` TEXT (ej: "S", "M", "L", "XL")
  - `color` TEXT (ej: "Beige", "Negro", "Blanco")
  - `sku_variant` TEXT (ej: "4463p-S-BG")
  - `stock` INTEGER
  - `price_diff_usd` DECIMAL (diferencia de precio vs producto base, default 0)
  - `active` BOOLEAN
- RLS: público para lectura, admin para CRUD

### API
- Nuevo endpoint `/api/admin/variants` (GET/POST/PUT/DELETE)
- Actualizar `/api/products` para incluir variantes en la respuesta

### Admin UI (en el modal de edición de producto)
- Nueva sección "Variantes" debajo de los campos existentes
- Tabla con las variantes existentes (talla, color, SKU, stock)
- Botón "Agregar variante" que abre inputs inline
- Cada variante se puede editar/eliminar

### Frontend (página de producto)
- Si el producto tiene variantes, mostrar selector de talla y color
- El stock se muestra por variante seleccionada

## 2. Upload de imágenes de producto

### Base de datos / Storage
- Crear bucket `product-images` en Supabase Storage (público)
- Las URLs se guardan en el campo `images TEXT[]` que ya existe

### API
- Nuevo endpoint `/api/admin/upload-image` que:
  - Acepta archivo via FormData
  - Sube a Supabase Storage bucket `product-images`
  - Retorna la URL pública

### Admin UI (en el modal de edición)
- Reemplazar el input de texto de URL por:
  - Zona de drag & drop / botón "Subir imagen"
  - Preview de imágenes actuales con botón para eliminar
  - Poder reordenar imágenes (la primera es la principal)
- Al subir, se llama al API y se agrega la URL al array `images`

## Archivos a crear/modificar:
1. `supabase/migrations/003_product_variants.sql` — nueva tabla + RLS
2. `src/app/api/admin/variants/route.ts` — CRUD variantes
3. `src/app/api/admin/upload-image/route.ts` — upload imágenes
4. `src/app/api/products/route.ts` — incluir variantes en respuesta
5. `src/app/[locale]/admin/productos/page.tsx` — agregar sección variantes + upload imágenes
6. `src/app/[locale]/productos/[slug]/page.tsx` — selector de variantes
7. `src/types/index.ts` — tipo ProductVariant
