-- ============================================================
-- Migration 005: Subcategories + New Medivaric Products
-- ============================================================

-- 1. Add parent_id and display_order columns to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);

-- 2. Rename "Medias Antiembolicas" → "Medias de Compresión"
UPDATE categories
SET name_es = 'Medias de Compresión',
    name_en = 'Compression Stockings',
    slug = 'medias-de-compresion',
    description_es = 'Medias de compresión graduada Medivaric: antiembólicas, deportivas, para diabéticos y más',
    description_en = 'Medivaric graduated compression stockings: anti-embolism, sports, diabetic and more'
WHERE slug = 'medias-antiembolicas';

-- 3. Insert 7 subcategories under "Medias de Compresión"
INSERT INTO categories (name_es, name_en, slug, description_es, description_en, parent_id, display_order)
VALUES
  ('Compresión baja 8-15mmHg', 'Low Compression 8-15mmHg', 'compresion-baja-8-15',
   'Medias de compresión baja para descanso y prevención de várices',
   'Low compression stockings for rest and varicose vein prevention',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 1),

  ('Compresión media 15-20mmHg', 'Medium Compression 15-20mmHg', 'compresion-media-15-20',
   'Medias de compresión mediana para control y prevención de várices',
   'Medium compression stockings for varicose vein control and prevention',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 2),

  ('Compresión alta 20-30mmHg', 'High Compression 20-30mmHg', 'compresion-alta-20-30',
   'Medias de compresión alta para tratar várices profundas, dolor crónico e hinchazón severa',
   'High compression stockings for deep varicose veins, chronic pain and severe swelling',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 3),

  ('Antiembólicas 18-23mmHg', 'Anti-Embolism 18-23mmHg', 'antiembolicas-18-23',
   'Medias antiembólicas para prevención de coágulos sanguíneos post-quirúrgicos',
   'Anti-embolism stockings for post-surgical blood clot prevention',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 4),

  ('Deportivas', 'Sports', 'deportivas',
   'Medias de compresión deportiva para rendimiento atlético y recuperación muscular',
   'Sports compression stockings for athletic performance and muscle recovery',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 5),

  ('Diabéticos / Pie sensible', 'Diabetic / Sensitive Foot', 'diabeticos-pie-sensible',
   'Medias especializadas con hilado de cobre para pie diabético y pie sensible',
   'Specialized copper yarn stockings for diabetic and sensitive feet',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 6),

  ('Hilado de cobre', 'Copper Yarn', 'hilado-de-cobre',
   'Medias de compresión con nanotecnología de partículas de cobre: regeneración, antimicótico y bactericida',
   'Compression stockings with copper nanoparticle technology: regeneration, antifungal and bactericidal',
   (SELECT id FROM categories WHERE slug = 'medias-de-compresion'), 7);

-- 4. Reassign existing products to correct subcategories
-- Compresión Baja
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'compresion-baja-8-15')
WHERE slug = 'medias-compresion-baja-rodilla-8-15mmhg';

-- Compresión Media
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'compresion-media-15-20')
WHERE slug IN ('medias-compresion-media-rodilla-15-20mmhg', 'calcetin-caballero-compresion-media', 'medias-viajero-travel-socks');

-- Compresión Alta
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'compresion-alta-20-30')
WHERE slug = 'medias-compresion-alta-rodilla-20-30mmhg';

-- Antiembólicas
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'antiembolicas-18-23')
WHERE slug IN ('medias-antiembolicas-rodilla-18-23mmhg', 'medias-antiembolicas-muslo-18-23mmhg', 'medias-antiembolicas-cadera-18-23mmhg');

-- Deportivas
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'deportivas')
WHERE slug = 'medias-compresion-deportiva-cobre';

-- Diabéticos / Pie Sensible
UPDATE products SET category_id = (SELECT id FROM categories WHERE slug = 'diabeticos-pie-sensible')
WHERE slug = 'medias-pie-diabetico-sensible';

-- 5. Insert new Medivaric products

-- === Compresión Baja 8-15mmHg ===
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, tags)
VALUES
  ('Calcetín Miracle Socks con Hilado de Cobre 8-15mmHg', 'Miracle Socks with Copper Yarn 8-15mmHg',
   'calcetin-miracle-socks-cobre',
   'Calcetín de compresión baja con hilado de cobre. Compresión graduada de 8-15 mmHg con nanotecnología de partículas de cobre para regeneración de tejido, efecto antimicótico y bactericida.',
   'Low compression socks with copper yarn. 8-15 mmHg graduated compression with copper nanoparticle technology for tissue regeneration, antifungal and bactericidal effect.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-baja-8-15'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['hilado-de-cobre', 'compresion-baja']::text[]),

  ('Calcetín para Hombre Compresión Baja 8-15mmHg', 'Men''s Low Compression Sock 8-15mmHg',
   'calcetin-hombre-compresion-baja-8-15',
   'Calcetín de compresión baja para hombre. Compresión graduada de 8-15 mmHg, ideal para descanso y recuperación después de un largo día de trabajo.',
   'Men''s low compression sock. 8-15 mmHg graduated compression, ideal for rest and recovery after a long working day.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-baja-8-15'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-baja', 'hombre']::text[]),

  ('Medias a la Cadera Punta Cerrada Transparente 8-15mmHg', 'Thigh-High Closed Toe Sheer 8-15mmHg',
   'medias-cadera-punta-cerrada-transparente-8-15',
   'Media de compresión baja a la cadera con punta cerrada transparente. Compresión graduada de 8-15 mmHg para prevención de várices y mejora de la circulación.',
   'Low compression thigh-high stocking with closed toe sheer finish. 8-15 mmHg graduated compression for varicose vein prevention and improved circulation.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-baja-8-15'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-baja', 'cadera']::text[]);

-- === Compresión Media 15-20mmHg ===
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, tags)
VALUES
  ('Media a la Cadera Punta Cerrada Opaca 15-20mmHg', 'Hip-High Closed Toe Opaque 15-20mmHg',
   'media-cadera-punta-cerrada-opaca-15-20',
   'Media de compresión mediana a la cadera con punta cerrada opaca. Compresión graduada de 15-20 mmHg para control y prevención de venas várices.',
   'Medium compression hip-high stocking with closed toe opaque finish. 15-20 mmHg graduated compression for varicose vein control and prevention.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'cadera']::text[]),

  ('Media a la Rodilla Punta Cerrada Opaca 15-20mmHg', 'Knee-High Closed Toe Opaque 15-20mmHg',
   'media-rodilla-punta-cerrada-opaca-15-20',
   'Media de compresión mediana a la rodilla con punta cerrada opaca. Compresión graduada de 15-20 mmHg.',
   'Medium compression knee-high stocking with closed toe opaque finish. 15-20 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'rodilla']::text[]),

  ('Media a la Cadera Dedos Libres Transparente 15-20mmHg', 'Hip-High Open Toe Sheer 15-20mmHg',
   'media-cadera-dedos-libres-transparente-15-20',
   'Media de compresión mediana a la cadera con dedos libres transparente. Compresión graduada de 15-20 mmHg.',
   'Medium compression hip-high stocking with open toe sheer finish. 15-20 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'cadera']::text[]),

  ('Medias a la Rodilla Dedos Libres Transparente 15-20mmHg', 'Knee-High Open Toe Sheer 15-20mmHg',
   'medias-rodilla-dedos-libres-transparente-15-20',
   'Media de compresión mediana a la rodilla con dedos libres transparente. Compresión graduada de 15-20 mmHg.',
   'Medium compression knee-high stocking with open toe sheer finish. 15-20 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'rodilla']::text[]),

  ('Medias de Compresión Mediana Rodilla con Cierre 15-20mmHg', 'Medium Compression Knee-High with Zipper 15-20mmHg',
   'medias-compresion-media-rodilla-cierre-15-20',
   'Media de compresión mediana a la rodilla con cierre lateral para fácil colocación. Compresión graduada de 15-20 mmHg. Diseño unisex.',
   'Medium compression knee-high stocking with side zipper for easy application. 15-20 mmHg graduated compression. Unisex design.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'cierre', 'rodilla']::text[]),

  ('Medias de Compresión Mediana al Muslo Punta Cerrada Opaca 15-20mmHg', 'Medium Compression Thigh-High Closed Toe Opaque 15-20mmHg',
   'medias-compresion-media-muslo-opaca-15-20',
   'Media de compresión mediana al muslo con punta cerrada opaca unisex. Compresión graduada de 15-20 mmHg.',
   'Medium compression thigh-high stocking with closed toe opaque unisex finish. 15-20 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'muslo']::text[]),

  ('Muslo Punta Cerrada Transparente 15-20mmHg', 'Thigh-High Closed Toe Sheer 15-20mmHg',
   'muslo-punta-cerrada-transparente-15-20',
   'Media de compresión mediana al muslo con punta cerrada transparente. Compresión graduada de 15-20 mmHg.',
   'Medium compression thigh-high stocking with closed toe sheer finish. 15-20 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'muslo']::text[]),

  ('Media a la Cadera Punta Cerrada Transparente 15-20mmHg', 'Hip-High Closed Toe Sheer 15-20mmHg',
   'media-cadera-punta-cerrada-transparente-15-20',
   'Media de compresión mediana a la cadera con punta cerrada transparente. Compresión graduada de 15-20 mmHg.',
   'Medium compression hip-high stocking with closed toe sheer finish. 15-20 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-media-15-20'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-media', 'cadera']::text[]);

-- === Compresión Alta 20-30mmHg ===
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, tags)
VALUES
  ('Media de Compresión Alta Calcetín 20-30mmHg', 'High Compression Sock 20-30mmHg',
   'media-compresion-alta-calcetin-20-30',
   'Calcetín de compresión alta 20-30 mmHg. Indicado para tratar várices profundas, dolor crónico en las piernas, hinchazón severa o úlceras venosas.',
   'High compression sock 20-30 mmHg. Indicated for treating deep varicose veins, chronic leg pain, severe swelling or venous ulcers.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-alta-20-30'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-alta']::text[]),

  ('Media de Compresión Alta Muslo Dedos Libres 20-30mmHg', 'High Compression Thigh-High Open Toe 20-30mmHg',
   'media-compresion-alta-muslo-dedos-libres-20-30',
   'Media de compresión alta al muslo con dedos libres unisex. Compresión graduada de 20-30 mmHg.',
   'High compression thigh-high stocking with open toe unisex design. 20-30 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-alta-20-30'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-alta', 'muslo']::text[]),

  ('Medias de Compresión Alta Cadera Dedos Libres Opaca 20-30mmHg', 'High Compression Hip-High Open Toe Opaque 20-30mmHg',
   'medias-compresion-alta-cadera-opaca-20-30',
   'Media de compresión alta a la cadera con dedos libres opaca. Compresión graduada de 20-30 mmHg.',
   'High compression hip-high stocking with open toe opaque finish. 20-30 mmHg graduated compression.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'compresion-alta-20-30'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['compresion-alta', 'cadera']::text[]);

-- === Deportivas ===
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, tags)
VALUES
  ('Pantorrillera de Compresión Deportiva Unisex', 'Unisex Sports Compression Calf Sleeve',
   'pantorrillera-compresion-deportiva',
   'Pantorrillera de compresión deportiva unisex. Reduce la fatiga muscular durante el ejercicio y acelera la recuperación post-entrenamiento.',
   'Unisex sports compression calf sleeve. Reduces muscle fatigue during exercise and accelerates post-training recovery.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'deportivas'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['deportiva', 'pantorrillera']::text[]),

  ('Pack x3 Calceta Running en Hilado con Cobre', '3-Pack Running Sock with Copper Yarn',
   'pack-3-calceta-running-cobre',
   'Pack de 3 calcetas de uso diario y running en hilado con cobre. Propiedades antibacterianas y antimicóticas.',
   '3-pack daily use and running socks with copper yarn. Antibacterial and antifungal properties.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'deportivas'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['deportiva', 'hilado-de-cobre', 'running']::text[]),

  ('Pack x3 Tobillera Running en Hilado con Cobre', '3-Pack Running Ankle Sock with Copper Yarn',
   'pack-3-tobillera-running-cobre',
   'Pack de 3 tobilleras de uso diario y running en hilado con cobre. Propiedades antibacterianas y antimicóticas.',
   '3-pack daily use and running ankle socks with copper yarn. Antibacterial and antifungal properties.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'deportivas'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['deportiva', 'hilado-de-cobre', 'running']::text[]);

-- === Diabéticos / Pie Sensible ===
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, tags)
VALUES
  ('Media para Pie Sensible Unisex al Tobillo', 'Sensitive Foot Unisex Ankle Sock',
   'media-pie-sensible-tobillo',
   'Media unisex con hilado de cobre al tobillo para pie sensible y pie diabético. Incentiva la generación de colágeno, mejora la cicatrización y elimina el mal olor.',
   'Unisex copper yarn ankle sock for sensitive and diabetic feet. Encourages collagen generation, improves healing and eliminates odor.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'diabeticos-pie-sensible'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['diabetico', 'pie-sensible', 'hilado-de-cobre']::text[]),

  ('Media para Pie Sensible Unisex Caña Baja', 'Sensitive Foot Unisex Low-Cut Sock',
   'media-pie-sensible-cana-baja',
   'Media unisex de caña baja con hilado de cobre para pie sensible y pie diabético. Tejido sin marcas con ajuste suave que protege contra ampollas y rozaduras.',
   'Unisex low-cut sock with copper yarn for sensitive and diabetic feet. Seamless fabric with gentle fit that protects against blisters and chafing.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'diabeticos-pie-sensible'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['diabetico', 'pie-sensible', 'hilado-de-cobre']::text[]);

-- === Ortopédicos faltantes (en categoría existente "Ortesis y Rehabilitación") ===
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, tags)
VALUES
  ('Anillo Subrotuliano con Hilado de Cobre', 'Subpatellar Ring with Copper Yarn',
   'anillo-subrotuliano-cobre',
   'Anillo subrotuliano con hilado de cobre. Ortopedia blanda para soporte de la rótula con propiedades antimicóticas y bactericidas.',
   'Subpatellar ring with copper yarn. Soft orthopedic support for the kneecap with antifungal and bactericidal properties.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['rodilla', 'hilado-de-cobre']::text[]),

  ('Rodillera Abierta con Refuerzo Rotuliano', 'Open Knee Brace with Patellar Reinforcement',
   'rodillera-abierta-refuerzo-rotuliano',
   'Rodillera abierta con refuerzo rotuliano. Ortopedia blanda que proporciona soporte y estabilidad a la articulación de la rodilla.',
   'Open knee brace with patellar reinforcement. Soft orthopedic support providing stability to the knee joint.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['rodilla']::text[]),

  ('Rodillera Cerrada con Bandas en Espiral', 'Closed Knee Brace with Spiral Bands',
   'rodillera-cerrada-bandas-espiral',
   'Rodillera cerrada con bandas en espiral que proporcionan compresión y soporte lateral. Ortopedia blanda para estabilidad articular.',
   'Closed knee brace with spiral bands providing compression and lateral support. Soft orthopedic support for joint stability.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['rodilla']::text[]),

  ('Tobillera Cerrada con Bandas en Espiral', 'Closed Ankle Brace with Spiral Bands',
   'tobillera-cerrada-bandas-espiral',
   'Tobillera cerrada con bandas en espiral para soporte y compresión del tobillo. Ortopedia blanda con estabilización articular.',
   'Closed ankle brace with spiral bands for ankle support and compression. Soft orthopedic joint stabilization.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['tobillo']::text[]),

  ('Tobillera Abierta Universal con Cobre', 'Universal Open Ankle Brace with Copper',
   'tobillera-abierta-universal-cobre',
   'Tobillera abierta universal con hilado de cobre. Ortopedia blanda para soporte del tobillo con propiedades antimicóticas y bactericidas.',
   'Universal open ankle brace with copper yarn. Soft orthopedic ankle support with antifungal and bactericidal properties.',
   0, 0, 50, (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
   ARRAY[]::text[], false, true, 'Medivaric', ARRAY['tobillo', 'hilado-de-cobre']::text[]);
