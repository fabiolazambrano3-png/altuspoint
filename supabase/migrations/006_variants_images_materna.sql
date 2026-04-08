-- ============================================================
-- Migration 006: Add variants (sizes/colors), images to compression
-- stockings, create Línea Materna category with products
-- ============================================================

-- ============================================================
-- PART 1: UPDATE IMAGES for existing products
-- ============================================================

-- === Compresión baja 8-15mmHg ===

-- Media para dama compresión Baja 8-15mmHg rodilla, transparente, puntera abierta
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg'
] WHERE id = '4cfd1eb6-a975-4a66-b2a2-9a2b3903e222';

-- Media para dama compresión Baja 8-15mmHg rodilla, transparente, puntera cerrada
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-BEIGE-OSCURO-600x600.jpg'
] WHERE id = '7be616d2-5b79-4900-8c32-54936a024aa3';

-- Media Miracle Socks con Hilado de Cobre 8-15mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-azul-600x600.jpg',
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-cafe-600x600.jpg',
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-Negro-600x600.jpg'
] WHERE id = 'ec903747-b3af-4432-a25a-0fa57d658965';

-- Media para dama compresión Baja 8-15mmHg cadera, transparente, puntera cerrada
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg'
] WHERE id = '253a3bac-b551-4f14-9850-0521211b7c9e';

-- Media para caballero compresión Baja 8-15mmHg, rodilla, acanalada
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-Negro-600x600.jpg'
] WHERE id = '082820d4-e1d1-4bb0-bd90-16f421062e12';

-- === Compresión media 15-20mmHg ===

-- Medias con cierre 15-20mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5121-zipper-beige-600x600.jpg'
] WHERE id = '02bf2e1e-f5db-43a7-82ea-f3cb6d150af4';

-- Media a la Cadera Punta Cerrada Opaca 15-20mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1221-negro-1-600x600.jpg',
  'https://medivaric.com.co/wp-content/uploads/2019/11/1221-beige-1-600x600.jpg'
] WHERE id = '3a4b78ab-e09b-4035-87ec-e8814565e079';

-- Media a la Cadera Dedos Libres Transparente 15-20mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg'
] WHERE id = 'ace876b3-c9a8-4417-ab2b-cba383ff677c';

-- Medias de Compresión Mediana al Muslo Punta Cerrada Opaca 15-20mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1221-negro-1-600x600.jpg'
] WHERE id = '68062346-4464-49b5-8eab-2920ef41b60c';

-- Muslo Punta Cerrada Transparente 15-20mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg'
] WHERE id = 'ac8d4870-a935-4395-9566-4e5c69478313';

-- Media a la Cadera Punta Cerrada Transparente 15-20mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg'
] WHERE id = 'ae13a592-974d-4645-97e9-71f7accfe93a';

-- Media rodilla puntera abierta transparente 15-20
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg'
] WHERE id = 'a38f2ef4-732d-4477-a011-57f34ec3901a';

-- Media rodilla puntera cerrada transparente 15-20 (dedos libres)
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-SAHARA-600x600.jpg',
  'https://medivaric.com.co/wp-content/uploads/2019/11/1129-BEIGE-OSCURO-600x600.jpg'
] WHERE id = '921025b5-dca8-469e-be4e-958de59d4402';

-- Medias con cierre rodilla 15-20
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5121-zipper-beige-600x600.jpg'
] WHERE id = '64b5e747-d3e2-4a5f-bd35-dd7408eb35d6';

-- Medias rodilla opaca 15-20
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2019/11/1221-negro-1-600x600.jpg',
  'https://medivaric.com.co/wp-content/uploads/2019/11/1221-beige-1-600x600.jpg'
] WHERE id = 'ca3efc64-d4f6-4822-9310-cb136510ce2c';

-- Media caballero compresión media 15-20
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-Negro-600x600.jpg'
] WHERE id = '5b255e66-c655-4c76-8014-0899feaa84a2';

-- === Compresión alta 20-30mmHg ===

-- Media Compresión Alta Calcetín 20-30mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2023/09/5232-sahara-2-600x600.jpg'
] WHERE id = '37e782e7-31c1-4b51-9248-7e4ccdd5ae53';

-- Media Compresión Alta Muslo Dedos Libres 20-30mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2023/09/5232-sahara-2-600x600.jpg'
] WHERE id = '8e5c7b74-7216-4c9a-bd39-44af38bc09a8';

-- Medias Compresión Alta Cadera Dedos Libres Opaca 20-30mmHg
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2023/09/5232-sahara-2-600x600.jpg'
] WHERE id = '8172e2df-3ec0-4bae-8146-8a82e57c3188';

-- === Deportivas ===

-- Pantorrillera de Compresión Deportiva Unisex
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/10/5655-pantorrillera-1-600x600.jpg'
] WHERE id = '96ef69f2-437d-4d02-a6cd-ac5d5b0b4262';

-- Pack x3 Calceta Running en Hilado con Cobre
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-azul-600x600.jpg'
] WHERE id = '4c2b4308-6a5c-4c34-a3b7-ba405f83fc17';

-- Pack x3 Tobillera Running en Hilado con Cobre
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-Negro-600x600.jpg'
] WHERE id = '735ce01e-f983-4d27-bbc3-f855a087b2f0';

-- === Diabéticos / Pie sensible ===

-- Media para Pie Sensible Unisex al Tobillo
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-Negro-600x600.jpg'
] WHERE id = '8d99c07b-37c1-42dc-b047-23cf09971f4d';

-- Media para Pie Sensible Unisex Caña Baja
UPDATE products SET images = ARRAY[
  'https://medivaric.com.co/wp-content/uploads/2022/02/5613-Negro-600x600.jpg'
] WHERE id = 'add83234-bc0a-4ce9-9aa7-9f85c41c16ea';


-- ============================================================
-- PART 2: ADD VARIANTS (sizes/colors) to existing products
-- ============================================================

-- Helper: We'll use DO blocks to insert variants for each product
-- Pattern: For each product, insert S/M/L/XL × each color

-- === Compresión baja 8-15mmHg ===

-- Media rodilla transparente puntera abierta 8-15 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'S - Sahara', 'S', 'Sahara', 'MV-CB-RA-S-SAH', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'M - Sahara', 'M', 'Sahara', 'MV-CB-RA-M-SAH', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'L - Sahara', 'L', 'Sahara', 'MV-CB-RA-L-SAH', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'XL - Sahara', 'XL', 'Sahara', 'MV-CB-RA-XL-SAH', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'S - Beige', 'S', 'Beige', 'MV-CB-RA-S-BEI', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'M - Beige', 'M', 'Beige', 'MV-CB-RA-M-BEI', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'L - Beige', 'L', 'Beige', 'MV-CB-RA-L-BEI', 10, 0, true),
('4cfd1eb6-a975-4a66-b2a2-9a2b3903e222', 'XL - Beige', 'XL', 'Beige', 'MV-CB-RA-XL-BEI', 10, 0, true);

-- Media rodilla transparente puntera cerrada 8-15 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('7be616d2-5b79-4900-8c32-54936a024aa3', 'S - Sahara', 'S', 'Sahara', 'MV-CB-RC-S-SAH', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'M - Sahara', 'M', 'Sahara', 'MV-CB-RC-M-SAH', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'L - Sahara', 'L', 'Sahara', 'MV-CB-RC-L-SAH', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'XL - Sahara', 'XL', 'Sahara', 'MV-CB-RC-XL-SAH', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'S - Beige', 'S', 'Beige', 'MV-CB-RC-S-BEI', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'M - Beige', 'M', 'Beige', 'MV-CB-RC-M-BEI', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'L - Beige', 'L', 'Beige', 'MV-CB-RC-L-BEI', 10, 0, true),
('7be616d2-5b79-4900-8c32-54936a024aa3', 'XL - Beige', 'XL', 'Beige', 'MV-CB-RC-XL-BEI', 10, 0, true);

-- Miracle Socks (Azul, Café, Negro)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('ec903747-b3af-4432-a25a-0fa57d658965', 'S - Azul', 'S', 'Azul', 'MV-MS-S-AZU', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'M - Azul', 'M', 'Azul', 'MV-MS-M-AZU', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'L - Azul', 'L', 'Azul', 'MV-MS-L-AZU', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'XL - Azul', 'XL', 'Azul', 'MV-MS-XL-AZU', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'S - Café', 'S', 'Café', 'MV-MS-S-CAF', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'M - Café', 'M', 'Café', 'MV-MS-M-CAF', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'L - Café', 'L', 'Café', 'MV-MS-L-CAF', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'XL - Café', 'XL', 'Café', 'MV-MS-XL-CAF', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'S - Negro', 'S', 'Negro', 'MV-MS-S-NEG', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'M - Negro', 'M', 'Negro', 'MV-MS-M-NEG', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'L - Negro', 'L', 'Negro', 'MV-MS-L-NEG', 10, 0, true),
('ec903747-b3af-4432-a25a-0fa57d658965', 'XL - Negro', 'XL', 'Negro', 'MV-MS-XL-NEG', 10, 0, true);

-- Media cadera transparente puntera cerrada 8-15 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('253a3bac-b551-4f14-9850-0521211b7c9e', 'S - Sahara', 'S', 'Sahara', 'MV-CB-CAD-S-SAH', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'M - Sahara', 'M', 'Sahara', 'MV-CB-CAD-M-SAH', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'L - Sahara', 'L', 'Sahara', 'MV-CB-CAD-L-SAH', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'XL - Sahara', 'XL', 'Sahara', 'MV-CB-CAD-XL-SAH', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'S - Beige', 'S', 'Beige', 'MV-CB-CAD-S-BEI', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'M - Beige', 'M', 'Beige', 'MV-CB-CAD-M-BEI', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'L - Beige', 'L', 'Beige', 'MV-CB-CAD-L-BEI', 10, 0, true),
('253a3bac-b551-4f14-9850-0521211b7c9e', 'XL - Beige', 'XL', 'Beige', 'MV-CB-CAD-XL-BEI', 10, 0, true);

-- Media caballero compresión Baja 8-15 (Negro, Gris)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'S - Negro', 'S', 'Negro', 'MV-CB-CAB-S-NEG', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'M - Negro', 'M', 'Negro', 'MV-CB-CAB-M-NEG', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'L - Negro', 'L', 'Negro', 'MV-CB-CAB-L-NEG', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'XL - Negro', 'XL', 'Negro', 'MV-CB-CAB-XL-NEG', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'S - Gris', 'S', 'Gris', 'MV-CB-CAB-S-GRI', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'M - Gris', 'M', 'Gris', 'MV-CB-CAB-M-GRI', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'L - Gris', 'L', 'Gris', 'MV-CB-CAB-L-GRI', 10, 0, true),
('082820d4-e1d1-4bb0-bd90-16f421062e12', 'XL - Gris', 'XL', 'Gris', 'MV-CB-CAB-XL-GRI', 10, 0, true);

-- === Compresión media 15-20mmHg ===

-- Medias con cierre 15-20 (Beige, Negro)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'S - Beige', 'S', 'Beige', 'MV-CM-ZR-S-BEI', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'M - Beige', 'M', 'Beige', 'MV-CM-ZR-M-BEI', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'L - Beige', 'L', 'Beige', 'MV-CM-ZR-L-BEI', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'XL - Beige', 'XL', 'Beige', 'MV-CM-ZR-XL-BEI', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'S - Negro', 'S', 'Negro', 'MV-CM-ZR-S-NEG', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'M - Negro', 'M', 'Negro', 'MV-CM-ZR-M-NEG', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'L - Negro', 'L', 'Negro', 'MV-CM-ZR-L-NEG', 10, 0, true),
('02bf2e1e-f5db-43a7-82ea-f3cb6d150af4', 'XL - Negro', 'XL', 'Negro', 'MV-CM-ZR-XL-NEG', 10, 0, true);

-- Media a la Cadera Punta Cerrada Opaca 15-20 (Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'S - Negro', 'S', 'Negro', 'MV-CM-CPO-S-NEG', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'M - Negro', 'M', 'Negro', 'MV-CM-CPO-M-NEG', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'L - Negro', 'L', 'Negro', 'MV-CM-CPO-L-NEG', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'XL - Negro', 'XL', 'Negro', 'MV-CM-CPO-XL-NEG', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'S - Beige', 'S', 'Beige', 'MV-CM-CPO-S-BEI', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'M - Beige', 'M', 'Beige', 'MV-CM-CPO-M-BEI', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'L - Beige', 'L', 'Beige', 'MV-CM-CPO-L-BEI', 10, 0, true),
('3a4b78ab-e09b-4035-87ec-e8814565e079', 'XL - Beige', 'XL', 'Beige', 'MV-CM-CPO-XL-BEI', 10, 0, true);

-- Media Cadera Dedos Libres Transparente 15-20 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'S - Sahara', 'S', 'Sahara', 'MV-CM-CDL-S-SAH', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'M - Sahara', 'M', 'Sahara', 'MV-CM-CDL-M-SAH', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'L - Sahara', 'L', 'Sahara', 'MV-CM-CDL-L-SAH', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'XL - Sahara', 'XL', 'Sahara', 'MV-CM-CDL-XL-SAH', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'S - Beige', 'S', 'Beige', 'MV-CM-CDL-S-BEI', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'M - Beige', 'M', 'Beige', 'MV-CM-CDL-M-BEI', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'L - Beige', 'L', 'Beige', 'MV-CM-CDL-L-BEI', 10, 0, true),
('ace876b3-c9a8-4417-ab2b-cba383ff677c', 'XL - Beige', 'XL', 'Beige', 'MV-CM-CDL-XL-BEI', 10, 0, true);

-- Muslo Punta Cerrada Opaca 15-20 (Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('68062346-4464-49b5-8eab-2920ef41b60c', 'S - Negro', 'S', 'Negro', 'MV-CM-MPO-S-NEG', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'M - Negro', 'M', 'Negro', 'MV-CM-MPO-M-NEG', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'L - Negro', 'L', 'Negro', 'MV-CM-MPO-L-NEG', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'XL - Negro', 'XL', 'Negro', 'MV-CM-MPO-XL-NEG', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'S - Beige', 'S', 'Beige', 'MV-CM-MPO-S-BEI', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'M - Beige', 'M', 'Beige', 'MV-CM-MPO-M-BEI', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'L - Beige', 'L', 'Beige', 'MV-CM-MPO-L-BEI', 10, 0, true),
('68062346-4464-49b5-8eab-2920ef41b60c', 'XL - Beige', 'XL', 'Beige', 'MV-CM-MPO-XL-BEI', 10, 0, true);

-- Muslo Punta Cerrada Transparente 15-20 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('ac8d4870-a935-4395-9566-4e5c69478313', 'S - Sahara', 'S', 'Sahara', 'MV-CM-MPT-S-SAH', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'M - Sahara', 'M', 'Sahara', 'MV-CM-MPT-M-SAH', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'L - Sahara', 'L', 'Sahara', 'MV-CM-MPT-L-SAH', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'XL - Sahara', 'XL', 'Sahara', 'MV-CM-MPT-XL-SAH', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'S - Beige', 'S', 'Beige', 'MV-CM-MPT-S-BEI', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'M - Beige', 'M', 'Beige', 'MV-CM-MPT-M-BEI', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'L - Beige', 'L', 'Beige', 'MV-CM-MPT-L-BEI', 10, 0, true),
('ac8d4870-a935-4395-9566-4e5c69478313', 'XL - Beige', 'XL', 'Beige', 'MV-CM-MPT-XL-BEI', 10, 0, true);

-- Cadera Punta Cerrada Transparente 15-20 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('ae13a592-974d-4645-97e9-71f7accfe93a', 'S - Sahara', 'S', 'Sahara', 'MV-CM-CPT-S-SAH', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'M - Sahara', 'M', 'Sahara', 'MV-CM-CPT-M-SAH', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'L - Sahara', 'L', 'Sahara', 'MV-CM-CPT-L-SAH', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'XL - Sahara', 'XL', 'Sahara', 'MV-CM-CPT-XL-SAH', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'S - Beige', 'S', 'Beige', 'MV-CM-CPT-S-BEI', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'M - Beige', 'M', 'Beige', 'MV-CM-CPT-M-BEI', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'L - Beige', 'L', 'Beige', 'MV-CM-CPT-L-BEI', 10, 0, true),
('ae13a592-974d-4645-97e9-71f7accfe93a', 'XL - Beige', 'XL', 'Beige', 'MV-CM-CPT-XL-BEI', 10, 0, true);

-- Media rodilla puntera abierta transparente 15-20 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'S - Sahara', 'S', 'Sahara', 'MV-CM-RPA-S-SAH', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'M - Sahara', 'M', 'Sahara', 'MV-CM-RPA-M-SAH', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'L - Sahara', 'L', 'Sahara', 'MV-CM-RPA-L-SAH', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'XL - Sahara', 'XL', 'Sahara', 'MV-CM-RPA-XL-SAH', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'S - Beige', 'S', 'Beige', 'MV-CM-RPA-S-BEI', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'M - Beige', 'M', 'Beige', 'MV-CM-RPA-M-BEI', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'L - Beige', 'L', 'Beige', 'MV-CM-RPA-L-BEI', 10, 0, true),
('a38f2ef4-732d-4477-a011-57f34ec3901a', 'XL - Beige', 'XL', 'Beige', 'MV-CM-RPA-XL-BEI', 10, 0, true);

-- Media rodilla puntera cerrada transparente 15-20 (Sahara, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('921025b5-dca8-469e-be4e-958de59d4402', 'S - Sahara', 'S', 'Sahara', 'MV-CM-RPC-S-SAH', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'M - Sahara', 'M', 'Sahara', 'MV-CM-RPC-M-SAH', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'L - Sahara', 'L', 'Sahara', 'MV-CM-RPC-L-SAH', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'XL - Sahara', 'XL', 'Sahara', 'MV-CM-RPC-XL-SAH', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'S - Beige', 'S', 'Beige', 'MV-CM-RPC-S-BEI', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'M - Beige', 'M', 'Beige', 'MV-CM-RPC-M-BEI', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'L - Beige', 'L', 'Beige', 'MV-CM-RPC-L-BEI', 10, 0, true),
('921025b5-dca8-469e-be4e-958de59d4402', 'XL - Beige', 'XL', 'Beige', 'MV-CM-RPC-XL-BEI', 10, 0, true);

-- Medias con cierre rodilla 15-20 (Beige, Negro)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'S - Beige', 'S', 'Beige', 'MV-CM-ZR2-S-BEI', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'M - Beige', 'M', 'Beige', 'MV-CM-ZR2-M-BEI', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'L - Beige', 'L', 'Beige', 'MV-CM-ZR2-L-BEI', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'XL - Beige', 'XL', 'Beige', 'MV-CM-ZR2-XL-BEI', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'S - Negro', 'S', 'Negro', 'MV-CM-ZR2-S-NEG', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'M - Negro', 'M', 'Negro', 'MV-CM-ZR2-M-NEG', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'L - Negro', 'L', 'Negro', 'MV-CM-ZR2-L-NEG', 10, 0, true),
('64b5e747-d3e2-4a5f-bd35-dd7408eb35d6', 'XL - Negro', 'XL', 'Negro', 'MV-CM-ZR2-XL-NEG', 10, 0, true);

-- Medias rodilla opaca 15-20 (Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'S - Negro', 'S', 'Negro', 'MV-CM-RO-S-NEG', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'M - Negro', 'M', 'Negro', 'MV-CM-RO-M-NEG', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'L - Negro', 'L', 'Negro', 'MV-CM-RO-L-NEG', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'XL - Negro', 'XL', 'Negro', 'MV-CM-RO-XL-NEG', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'S - Beige', 'S', 'Beige', 'MV-CM-RO-S-BEI', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'M - Beige', 'M', 'Beige', 'MV-CM-RO-M-BEI', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'L - Beige', 'L', 'Beige', 'MV-CM-RO-L-BEI', 10, 0, true),
('ca3efc64-d4f6-4822-9310-cb136510ce2c', 'XL - Beige', 'XL', 'Beige', 'MV-CM-RO-XL-BEI', 10, 0, true);

-- Media caballero compresión media 15-20 (Negro, Gris)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('5b255e66-c655-4c76-8014-0899feaa84a2', 'S - Negro', 'S', 'Negro', 'MV-CM-CAB-S-NEG', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'M - Negro', 'M', 'Negro', 'MV-CM-CAB-M-NEG', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'L - Negro', 'L', 'Negro', 'MV-CM-CAB-L-NEG', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'XL - Negro', 'XL', 'Negro', 'MV-CM-CAB-XL-NEG', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'S - Gris', 'S', 'Gris', 'MV-CM-CAB-S-GRI', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'M - Gris', 'M', 'Gris', 'MV-CM-CAB-M-GRI', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'L - Gris', 'L', 'Gris', 'MV-CM-CAB-L-GRI', 10, 0, true),
('5b255e66-c655-4c76-8014-0899feaa84a2', 'XL - Gris', 'XL', 'Gris', 'MV-CM-CAB-XL-GRI', 10, 0, true);

-- === Compresión alta 20-30mmHg ===

-- Media Compresión Alta Calcetín 20-30 (Sahara, Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'S - Sahara', 'S', 'Sahara', 'MV-CA-CALC-S-SAH', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'M - Sahara', 'M', 'Sahara', 'MV-CA-CALC-M-SAH', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'L - Sahara', 'L', 'Sahara', 'MV-CA-CALC-L-SAH', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'XL - Sahara', 'XL', 'Sahara', 'MV-CA-CALC-XL-SAH', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'S - Negro', 'S', 'Negro', 'MV-CA-CALC-S-NEG', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'M - Negro', 'M', 'Negro', 'MV-CA-CALC-M-NEG', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'L - Negro', 'L', 'Negro', 'MV-CA-CALC-L-NEG', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'XL - Negro', 'XL', 'Negro', 'MV-CA-CALC-XL-NEG', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'S - Beige', 'S', 'Beige', 'MV-CA-CALC-S-BEI', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'M - Beige', 'M', 'Beige', 'MV-CA-CALC-M-BEI', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'L - Beige', 'L', 'Beige', 'MV-CA-CALC-L-BEI', 10, 0, true),
('37e782e7-31c1-4b51-9248-7e4ccdd5ae53', 'XL - Beige', 'XL', 'Beige', 'MV-CA-CALC-XL-BEI', 10, 0, true);

-- Media Compresión Alta Muslo Dedos Libres 20-30 (Sahara, Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'S - Sahara', 'S', 'Sahara', 'MV-CA-MDL-S-SAH', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'M - Sahara', 'M', 'Sahara', 'MV-CA-MDL-M-SAH', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'L - Sahara', 'L', 'Sahara', 'MV-CA-MDL-L-SAH', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'XL - Sahara', 'XL', 'Sahara', 'MV-CA-MDL-XL-SAH', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'S - Negro', 'S', 'Negro', 'MV-CA-MDL-S-NEG', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'M - Negro', 'M', 'Negro', 'MV-CA-MDL-M-NEG', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'L - Negro', 'L', 'Negro', 'MV-CA-MDL-L-NEG', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'XL - Negro', 'XL', 'Negro', 'MV-CA-MDL-XL-NEG', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'S - Beige', 'S', 'Beige', 'MV-CA-MDL-S-BEI', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'M - Beige', 'M', 'Beige', 'MV-CA-MDL-M-BEI', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'L - Beige', 'L', 'Beige', 'MV-CA-MDL-L-BEI', 10, 0, true),
('8e5c7b74-7216-4c9a-bd39-44af38bc09a8', 'XL - Beige', 'XL', 'Beige', 'MV-CA-MDL-XL-BEI', 10, 0, true);

-- Medias Compresión Alta Cadera Dedos Libres Opaca 20-30 (Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'S - Negro', 'S', 'Negro', 'MV-CA-CDO-S-NEG', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'M - Negro', 'M', 'Negro', 'MV-CA-CDO-M-NEG', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'L - Negro', 'L', 'Negro', 'MV-CA-CDO-L-NEG', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'XL - Negro', 'XL', 'Negro', 'MV-CA-CDO-XL-NEG', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'S - Beige', 'S', 'Beige', 'MV-CA-CDO-S-BEI', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'M - Beige', 'M', 'Beige', 'MV-CA-CDO-M-BEI', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'L - Beige', 'L', 'Beige', 'MV-CA-CDO-L-BEI', 10, 0, true),
('8172e2df-3ec0-4bae-8146-8a82e57c3188', 'XL - Beige', 'XL', 'Beige', 'MV-CA-CDO-XL-BEI', 10, 0, true);

-- Medias Compresión Alta Rodilla 20-30 (Sahara, Negro, Beige)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('b25ff621-5525-4386-a169-674089002b27', 'S - Sahara', 'S', 'Sahara', 'MV-CA-ROD-S-SAH', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'M - Sahara', 'M', 'Sahara', 'MV-CA-ROD-M-SAH', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'L - Sahara', 'L', 'Sahara', 'MV-CA-ROD-L-SAH', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'XL - Sahara', 'XL', 'Sahara', 'MV-CA-ROD-XL-SAH', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'S - Negro', 'S', 'Negro', 'MV-CA-ROD-S-NEG', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'M - Negro', 'M', 'Negro', 'MV-CA-ROD-M-NEG', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'L - Negro', 'L', 'Negro', 'MV-CA-ROD-L-NEG', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'XL - Negro', 'XL', 'Negro', 'MV-CA-ROD-XL-NEG', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'S - Beige', 'S', 'Beige', 'MV-CA-ROD-S-BEI', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'M - Beige', 'M', 'Beige', 'MV-CA-ROD-M-BEI', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'L - Beige', 'L', 'Beige', 'MV-CA-ROD-L-BEI', 10, 0, true),
('b25ff621-5525-4386-a169-674089002b27', 'XL - Beige', 'XL', 'Beige', 'MV-CA-ROD-XL-BEI', 10, 0, true);

-- === Antiembólicas 18-23mmHg (Blanco) ===

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('8bab2302-ad2d-41f7-99cd-8aa01c8fc6c1', 'S - Blanco', 'S', 'Blanco', 'MV-AE-ROD-S-BLA', 10, 0, true),
('8bab2302-ad2d-41f7-99cd-8aa01c8fc6c1', 'M - Blanco', 'M', 'Blanco', 'MV-AE-ROD-M-BLA', 10, 0, true),
('8bab2302-ad2d-41f7-99cd-8aa01c8fc6c1', 'L - Blanco', 'L', 'Blanco', 'MV-AE-ROD-L-BLA', 10, 0, true),
('8bab2302-ad2d-41f7-99cd-8aa01c8fc6c1', 'XL - Blanco', 'XL', 'Blanco', 'MV-AE-ROD-XL-BLA', 10, 0, true),
('39ffd536-08f1-4a07-850c-eb9d24cb0aee', 'S - Blanco', 'S', 'Blanco', 'MV-AE-MUS-S-BLA', 10, 0, true),
('39ffd536-08f1-4a07-850c-eb9d24cb0aee', 'M - Blanco', 'M', 'Blanco', 'MV-AE-MUS-M-BLA', 10, 0, true),
('39ffd536-08f1-4a07-850c-eb9d24cb0aee', 'L - Blanco', 'L', 'Blanco', 'MV-AE-MUS-L-BLA', 10, 0, true),
('39ffd536-08f1-4a07-850c-eb9d24cb0aee', 'XL - Blanco', 'XL', 'Blanco', 'MV-AE-MUS-XL-BLA', 10, 0, true),
('e152d9da-d175-4649-b9ce-13845632bbf1', 'S - Blanco', 'S', 'Blanco', 'MV-AE-CAD-S-BLA', 10, 0, true),
('e152d9da-d175-4649-b9ce-13845632bbf1', 'M - Blanco', 'M', 'Blanco', 'MV-AE-CAD-M-BLA', 10, 0, true),
('e152d9da-d175-4649-b9ce-13845632bbf1', 'L - Blanco', 'L', 'Blanco', 'MV-AE-CAD-L-BLA', 10, 0, true),
('e152d9da-d175-4649-b9ce-13845632bbf1', 'XL - Blanco', 'XL', 'Blanco', 'MV-AE-CAD-XL-BLA', 10, 0, true);

-- === Deportivas ===

-- Pantorrillera Deportiva (Negro)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('96ef69f2-437d-4d02-a6cd-ac5d5b0b4262', 'S - Negro', 'S', 'Negro', 'MV-DEP-PAN-S-NEG', 10, 0, true),
('96ef69f2-437d-4d02-a6cd-ac5d5b0b4262', 'M - Negro', 'M', 'Negro', 'MV-DEP-PAN-M-NEG', 10, 0, true),
('96ef69f2-437d-4d02-a6cd-ac5d5b0b4262', 'L - Negro', 'L', 'Negro', 'MV-DEP-PAN-L-NEG', 10, 0, true),
('96ef69f2-437d-4d02-a6cd-ac5d5b0b4262', 'XL - Negro', 'XL', 'Negro', 'MV-DEP-PAN-XL-NEG', 10, 0, true);

-- Pack x3 Calceta Running (Negro)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('4c2b4308-6a5c-4c34-a3b7-ba405f83fc17', 'S - Negro', 'S', 'Negro', 'MV-DEP-CAL-S-NEG', 10, 0, true),
('4c2b4308-6a5c-4c34-a3b7-ba405f83fc17', 'M - Negro', 'M', 'Negro', 'MV-DEP-CAL-M-NEG', 10, 0, true),
('4c2b4308-6a5c-4c34-a3b7-ba405f83fc17', 'L - Negro', 'L', 'Negro', 'MV-DEP-CAL-L-NEG', 10, 0, true),
('4c2b4308-6a5c-4c34-a3b7-ba405f83fc17', 'XL - Negro', 'XL', 'Negro', 'MV-DEP-CAL-XL-NEG', 10, 0, true);

-- Pack x3 Tobillera Running (Negro)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('735ce01e-f983-4d27-bbc3-f855a087b2f0', 'S - Negro', 'S', 'Negro', 'MV-DEP-TOB-S-NEG', 10, 0, true),
('735ce01e-f983-4d27-bbc3-f855a087b2f0', 'M - Negro', 'M', 'Negro', 'MV-DEP-TOB-M-NEG', 10, 0, true),
('735ce01e-f983-4d27-bbc3-f855a087b2f0', 'L - Negro', 'L', 'Negro', 'MV-DEP-TOB-L-NEG', 10, 0, true),
('735ce01e-f983-4d27-bbc3-f855a087b2f0', 'XL - Negro', 'XL', 'Negro', 'MV-DEP-TOB-XL-NEG', 10, 0, true);

-- Medias Deportiva con Cobre (Negro/Azul, Negro/Gris, Negro/Rojo)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'S - Negro/Azul', 'S', 'Negro/Azul', 'MV-DEP-COB-S-AZU', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'M - Negro/Azul', 'M', 'Negro/Azul', 'MV-DEP-COB-M-AZU', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'L - Negro/Azul', 'L', 'Negro/Azul', 'MV-DEP-COB-L-AZU', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'XL - Negro/Azul', 'XL', 'Negro/Azul', 'MV-DEP-COB-XL-AZU', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'S - Negro/Gris', 'S', 'Negro/Gris', 'MV-DEP-COB-S-GRI', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'M - Negro/Gris', 'M', 'Negro/Gris', 'MV-DEP-COB-M-GRI', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'L - Negro/Gris', 'L', 'Negro/Gris', 'MV-DEP-COB-L-GRI', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'XL - Negro/Gris', 'XL', 'Negro/Gris', 'MV-DEP-COB-XL-GRI', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'S - Negro/Rojo', 'S', 'Negro/Rojo', 'MV-DEP-COB-S-ROJ', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'M - Negro/Rojo', 'M', 'Negro/Rojo', 'MV-DEP-COB-M-ROJ', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'L - Negro/Rojo', 'L', 'Negro/Rojo', 'MV-DEP-COB-L-ROJ', 10, 0, true),
('2f0894ac-6953-4e32-bf18-8e6bb066c1ca', 'XL - Negro/Rojo', 'XL', 'Negro/Rojo', 'MV-DEP-COB-XL-ROJ', 10, 0, true);

-- === Diabéticos / Pie sensible (Negro, Beige, Blanco) ===

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'S - Negro', 'S', 'Negro', 'MV-PS-TOB-S-NEG', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'M - Negro', 'M', 'Negro', 'MV-PS-TOB-M-NEG', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'L - Negro', 'L', 'Negro', 'MV-PS-TOB-L-NEG', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'XL - Negro', 'XL', 'Negro', 'MV-PS-TOB-XL-NEG', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'S - Beige', 'S', 'Beige', 'MV-PS-TOB-S-BEI', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'M - Beige', 'M', 'Beige', 'MV-PS-TOB-M-BEI', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'L - Beige', 'L', 'Beige', 'MV-PS-TOB-L-BEI', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'XL - Beige', 'XL', 'Beige', 'MV-PS-TOB-XL-BEI', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'S - Blanco', 'S', 'Blanco', 'MV-PS-TOB-S-BLA', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'M - Blanco', 'M', 'Blanco', 'MV-PS-TOB-M-BLA', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'L - Blanco', 'L', 'Blanco', 'MV-PS-TOB-L-BLA', 10, 0, true),
('8d99c07b-37c1-42dc-b047-23cf09971f4d', 'XL - Blanco', 'XL', 'Blanco', 'MV-PS-TOB-XL-BLA', 10, 0, true);

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'S - Negro', 'S', 'Negro', 'MV-PS-CB-S-NEG', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'M - Negro', 'M', 'Negro', 'MV-PS-CB-M-NEG', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'L - Negro', 'L', 'Negro', 'MV-PS-CB-L-NEG', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'XL - Negro', 'XL', 'Negro', 'MV-PS-CB-XL-NEG', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'S - Beige', 'S', 'Beige', 'MV-PS-CB-S-BEI', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'M - Beige', 'M', 'Beige', 'MV-PS-CB-M-BEI', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'L - Beige', 'L', 'Beige', 'MV-PS-CB-L-BEI', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'XL - Beige', 'XL', 'Beige', 'MV-PS-CB-XL-BEI', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'S - Blanco', 'S', 'Blanco', 'MV-PS-CB-S-BLA', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'M - Blanco', 'M', 'Blanco', 'MV-PS-CB-M-BLA', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'L - Blanco', 'L', 'Blanco', 'MV-PS-CB-L-BLA', 10, 0, true),
('add83234-bc0a-4ce9-9aa7-9f85c41c16ea', 'XL - Blanco', 'XL', 'Blanco', 'MV-PS-CB-XL-BLA', 10, 0, true);

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'S - Negro', 'S', 'Negro', 'MV-PS-GEN-S-NEG', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'M - Negro', 'M', 'Negro', 'MV-PS-GEN-M-NEG', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'L - Negro', 'L', 'Negro', 'MV-PS-GEN-L-NEG', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'XL - Negro', 'XL', 'Negro', 'MV-PS-GEN-XL-NEG', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'S - Beige', 'S', 'Beige', 'MV-PS-GEN-S-BEI', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'M - Beige', 'M', 'Beige', 'MV-PS-GEN-M-BEI', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'L - Beige', 'L', 'Beige', 'MV-PS-GEN-L-BEI', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'XL - Beige', 'XL', 'Beige', 'MV-PS-GEN-XL-BEI', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'S - Blanco', 'S', 'Blanco', 'MV-PS-GEN-S-BLA', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'M - Blanco', 'M', 'Blanco', 'MV-PS-GEN-M-BLA', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'L - Blanco', 'L', 'Blanco', 'MV-PS-GEN-L-BLA', 10, 0, true),
('0507201c-6654-497b-a0aa-a2bcdf1dd86d', 'XL - Blanco', 'XL', 'Blanco', 'MV-PS-GEN-XL-BLA', 10, 0, true);


-- ============================================================
-- PART 3: CREATE LÍNEA MATERNA CATEGORY + PRODUCTS
-- ============================================================

-- Create Línea Materna as top-level category
INSERT INTO categories (id, name_es, name_en, slug, description_es, description_en, image_url, display_order)
VALUES (
  'f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
  'Línea Materna',
  'Maternity Line',
  'linea-materna',
  'Productos Copper Mom para mamás con hilado de cobre',
  'Copper Mom products for mothers with copper thread',
  '',
  5
);

-- Move existing Short Materno to Línea Materna and update info
UPDATE products SET
  category_id = 'f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
  name_es = 'Short Materno con Hilado de Cobre',
  name_en = 'Maternity Short with Copper Thread',
  description_es = 'Short materno Copper Mom con hilado de cobre. La tela ayuda a disminuir la intensidad de las estrías y líneas de la piel. Ideal para el período de gestación.',
  description_en = 'Copper Mom maternity short with copper thread. The fabric helps reduce the intensity of stretch marks and skin lines. Ideal for the gestation period.',
  images = ARRAY['https://medivaric.com.co/wp-content/uploads/2021/04/0522-VER-600x968.jpg'],
  brand = 'Medivaric'
WHERE id = '82d049b7-4735-4e8f-8b9b-29cd02a13971';

-- Add variants for Short Materno (Beige, S-M / L-XL)
INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('82d049b7-4735-4e8f-8b9b-29cd02a13971', 'S-M - Beige', 'S-M', 'Beige', 'MV-MAT-SH-SM-BEI', 10, 0, true),
('82d049b7-4735-4e8f-8b9b-29cd02a13971', 'L-XL - Beige', 'L-XL', 'Beige', 'MV-MAT-SH-LXL-BEI', 10, 0, true);

-- Create Leggins Materno
INSERT INTO products (id, name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku)
VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'Leggins Materno con Hilado de Cobre',
  'Maternity Leggings with Copper Thread',
  'leggins-materno-cobre',
  'Leggins para embarazadas Copper Mom con hilado de cobre. La tela mejora la apariencia y sensación de la piel. Brinda soporte abdominal cómodo durante el embarazo.',
  'Copper Mom maternity leggings with copper thread. The fabric improves skin appearance and feel. Provides comfortable abdominal support during pregnancy.',
  0, 0, 30,
  'f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
  ARRAY['https://medivaric.com.co/wp-content/uploads/2021/04/0530-materno-camisillaa-1-600x968.jpg'],
  false, true, 'Medivaric', 'MV-MAT-LEG'
);

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'S-M - Negro', 'S-M', 'Negro', 'MV-MAT-LEG-SM-NEG', 10, 0, true),
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'L-XL - Negro', 'L-XL', 'Negro', 'MV-MAT-LEG-LXL-NEG', 10, 0, true),
('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', '2XL-3XL - Negro', '2XL-3XL', 'Negro', 'MV-MAT-LEG-2XL3XL-NEG', 10, 0, true);

-- Create Camiseta para Lactancia
INSERT INTO products (id, name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku)
VALUES (
  'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  'Camiseta para Lactancia con Hilado de Cobre',
  'Nursing Top with Copper Thread',
  'camiseta-lactancia-cobre',
  'Camiseta para lactancia Copper Mom con hilado de cobre. Soporte interno de busto y apertura práctica para amamantar. Ayuda a disminuir la intensidad de las estrías.',
  'Copper Mom nursing top with copper thread. Internal bust support and practical opening for breastfeeding. Helps reduce the intensity of stretch marks.',
  0, 0, 20,
  'f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
  ARRAY['https://medivaric.com.co/wp-content/uploads/2021/04/0530-VER-600x968.jpg'],
  false, true, 'Medivaric', 'MV-MAT-LAC'
);

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'S-M - Beige', 'S-M', 'Beige', 'MV-MAT-LAC-SM-BEI', 10, 0, true),
('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'L-XL - Beige', 'L-XL', 'Beige', 'MV-MAT-LAC-LXL-BEI', 10, 0, true);

-- Create Camisilla Tirantes Materna
INSERT INTO products (id, name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku)
VALUES (
  'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  'Camisilla Tirantes Materna con Hilado de Cobre',
  'Maternity Tank Top with Copper Thread',
  'camisilla-tirantes-materna-cobre',
  'Camisilla de tirantes materna Copper Mom con hilado de cobre. Tela hecha con nanopartículas de cobre que controla proliferación de olores y manchas en la prenda. Ideal para uso diario durante el embarazo.',
  'Copper Mom maternity tank top with copper thread. Fabric made with copper nanoparticles that controls odor and stain proliferation. Ideal for daily use during pregnancy.',
  0, 0, 20,
  'f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
  ARRAY['https://medivaric.com.co/wp-content/uploads/2021/04/0524-VER-600x968.jpg'],
  false, true, 'Medivaric', 'MV-MAT-CAM'
);

INSERT INTO product_variants (product_id, name, size, color, sku_variant, stock, price_diff_usd, active) VALUES
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'S-M - Beige', 'S-M', 'Beige', 'MV-MAT-CAM-SM-BEI', 10, 0, true),
('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'L-XL - Beige', 'L-XL', 'Beige', 'MV-MAT-CAM-LXL-BEI', 10, 0, true);


-- ============================================================
-- PART 4: Add Línea Materna to i18n constants (handled in code)
-- ============================================================
-- Note: i18n keys for the new category will be added in the Next.js code
