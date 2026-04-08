-- Add missing columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create index on SKU for lookups
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- CAT-1: EQUIPOS MÉDICOS (1 product)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Monitor de Signos Vitales Omni II',
  'Omni II Vital Signs Monitor',
  'monitor-signos-vitales-omni-ii',
  'Monitor multiparámetro con pantalla táctil para medición de signos vitales. Incluye sensores de SpO2, ECG, presión arterial no invasiva y temperatura. Pantalla LCD de alta resolución. Ideal para uso hospitalario y clínico.',
  'Multi-parameter touchscreen monitor for vital signs measurement. Includes SpO2, ECG, non-invasive blood pressure and temperature sensors. High-resolution LCD display. Ideal for hospital and clinical use.',
  1250.00, 45000.00, 15,
  (SELECT id FROM categories WHERE slug = 'equipos-medicos'),
  ARRAY['/images/products/monitor-omni-ii.jpeg'],
  true, true, 'Infinium Medical', 'INF-OMNI2',
  ARRAY['monitor', 'signos-vitales', 'pantalla-tactil']
);

-- CAT-2: MATERIAL QUIRÚRGICO (6 products)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Guantes Estériles Gammex Non-Latex',
  'Gammex Non-Latex Sterile Gloves',
  'guantes-esteriles-gammex-non-latex',
  'Guantes quirúrgicos estériles sin látex de alta calidad. Libre de polvo, excelente sensibilidad táctil y resistencia. Ideales para cirugías y procedimientos donde se requiere máxima protección.',
  'High-quality latex-free sterile surgical gloves. Powder-free, excellent tactile sensitivity and resistance. Ideal for surgeries and procedures requiring maximum protection.',
  22.00, 792.00, 300,
  (SELECT id FROM categories WHERE slug = 'material-quirurgico'),
  ARRAY['/images/products/guantes-gammex.png'],
  false, true, 'Ansell', 'ANS-GMNL',
  ARRAY['guantes', 'esteril', 'sin-latex']
),
(
  'Bata Estéril Quirúrgica Alta Protección',
  'High Protection Sterile Surgical Gown',
  'bata-esteril-quirurgica-alta-proteccion',
  'Bata estéril para cirujano con máxima protección. Material de barrera avanzado que protege contra fluidos y agentes infecciosos. Confección ergonómica para comodidad durante procedimientos prolongados.',
  'Sterile surgical gown with maximum protection. Advanced barrier material that protects against fluids and infectious agents. Ergonomic construction for comfort during prolonged procedures.',
  35.00, 1260.00, 150,
  (SELECT id FROM categories WHERE slug = 'material-quirurgico'),
  ARRAY['/images/products/bata-quirurgica.png'],
  false, true, 'Mölnlycke', 'MOL-BATA-AP',
  ARRAY['bata', 'esteril', 'alta-proteccion']
),
(
  'Malla de Prolene para Hernia',
  'Prolene Hernia Mesh',
  'malla-prolene-hernia',
  'Malla quirúrgica de polipropileno para reparación de hernias. Material biocompatible, resistente y flexible. Disponible en varios tamaños para diferentes aplicaciones quirúrgicas.',
  'Polypropylene surgical mesh for hernia repair. Biocompatible, resistant and flexible material. Available in various sizes for different surgical applications.',
  95.00, 3420.00, 80,
  (SELECT id FROM categories WHERE slug = 'material-quirurgico'),
  ARRAY['/images/products/malla-prolene.png'],
  false, true, 'Ethicon', 'ETH-PROL-M',
  ARRAY['malla', 'hernia', 'prolene']
),
(
  'Engrapadora Quirúrgica Lineal',
  'Linear Surgical Stapler',
  'engrapadora-quirurgica-lineal',
  'Engrapadora quirúrgica lineal para procedimientos de resección y anastomosis. Diseño ergonómico con mecanismo de disparo suave. Grapas de titanio de alta calidad para una hemostasia segura.',
  'Linear surgical stapler for resection and anastomosis procedures. Ergonomic design with smooth firing mechanism. High-quality titanium staples for secure hemostasis.',
  185.00, 6660.00, 40,
  (SELECT id FROM categories WHERE slug = 'material-quirurgico'),
  ARRAY['/images/products/engrapadora-quirurgica.png'],
  true, true, 'Ethicon', 'ETH-STAP-L',
  ARRAY['engrapadora', 'cirugia', 'lineal']
),
(
  'Trocar Laparoscópico 12mm',
  '12mm Laparoscopic Trocar',
  'trocar-laparoscopico-12mm',
  'Trocar para cirugía laparoscópica de 12mm. Diseño con válvula universal para minimizar la fuga de gas. Punta con sistema de seguridad para reducir el riesgo de lesiones.',
  '12mm trocar for laparoscopic surgery. Universal valve design to minimize gas leakage. Tip with safety system to reduce the risk of injuries.',
  68.00, 2448.00, 60,
  (SELECT id FROM categories WHERE slug = 'material-quirurgico'),
  ARRAY['/images/products/trocar-laparoscopico.png'],
  false, true, 'Ethicon', 'ETH-TROC-12',
  ARRAY['trocar', 'laparoscopia', '12mm']
),
(
  'Kit de Lencería Quirúrgica de Bioseguridad',
  'Surgical Biosafety Drape Kit',
  'kit-lenceria-quirurgica-bioseguridad',
  'Kit completo de bioseguridad quirúrgica con productos de alta calidad que brindan protección al equipo quirúrgico en cirugías de alto riesgo. Incluye campos, compresas y sábanas estériles.',
  'Complete surgical biosafety kit with high-quality products that provide protection to the surgical team in high-risk surgeries. Includes drapes, pads and sterile sheets.',
  48.00, 1728.00, 100,
  (SELECT id FROM categories WHERE slug = 'material-quirurgico'),
  ARRAY['/images/products/kit-lenceria-quirurgica.jpeg'],
  false, true, 'AltusPoint', 'AP-KIT-BIO',
  ARRAY['lenceria', 'bioseguridad', 'kit']
);

-- CAT-3: MEDIAS ANTIEMBÓLICAS (10 products)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Medias Antiembólicas Rodilla 18-23mmHg',
  'Knee Anti-Embolism Stockings 18-23mmHg',
  'medias-antiembolicas-rodilla-18-23mmhg',
  'Medias antiembólicas de compresión graduada decreciente 18-23mmHg. Banda elástica delicada autoajustable, protección antibacteriana de larga duración, orificio de inspección para evaluación médica. 80% Poliamida, 20% Elastano.',
  'Anti-embolism stockings with graduated decreasing compression 18-23mmHg. Delicate self-adjusting elastic band, long-lasting antibacterial protection, inspection hole for medical evaluation. 80% Polyamide, 20% Elastane.',
  14.00, 504.00, 200,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-antiembolicas-rodilla.png'],
  true, true, 'Medivaric', '4463p',
  ARRAY['medias', 'antiembolicas', 'rodilla', '18-23mmHg']
),
(
  'Medias Antiembólicas Muslo 18-23mmHg',
  'Thigh Anti-Embolism Stockings 18-23mmHg',
  'medias-antiembolicas-muslo-18-23mmhg',
  'Medias antiembólicas hasta el muslo con compresión graduada 18-23mmHg. Ideales para postoperatorio y prevención de trombosis venosa profunda. Banda de silicona en el muslo para sujeción segura.',
  'Thigh-high anti-embolism stockings with graduated compression 18-23mmHg. Ideal for post-operative and deep venous thrombosis prevention. Silicone band on thigh for secure hold.',
  18.00, 648.00, 150,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-antiembolicas-muslo.png'],
  false, true, 'Medivaric', 'MV-AE-MU',
  ARRAY['medias', 'antiembolicas', 'muslo', '18-23mmHg']
),
(
  'Medias Antiembólicas Cadera 18-23mmHg',
  'Hip Anti-Embolism Stockings 18-23mmHg',
  'medias-antiembolicas-cadera-18-23mmhg',
  'Medias antiembólicas hasta la cadera con compresión graduada 18-23mmHg. Máxima cobertura para pacientes encamados o con cirugías de cadera y miembros inferiores.',
  'Hip-high anti-embolism stockings with graduated compression 18-23mmHg. Maximum coverage for bedridden patients or those with hip and lower limb surgeries.',
  22.00, 792.00, 100,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-antiembolicas-cadera.png'],
  false, true, 'Medivaric', 'MV-AE-CA',
  ARRAY['medias', 'antiembolicas', 'cadera', '18-23mmHg']
),
(
  'Medias de Compresión Baja Rodilla 8-15mmHg Transparente',
  'Low Compression Knee Stockings 8-15mmHg Transparent',
  'medias-compresion-baja-rodilla-8-15mmhg',
  'Medias de compresión baja transparente hasta la rodilla. Compresión graduada 8-15mmHg, ideales para prevención diaria, viajes largos y piernas cansadas. Diseño estético y discreto.',
  'Transparent low compression knee-high stockings. Graduated compression 8-15mmHg, ideal for daily prevention, long trips and tired legs. Aesthetic and discreet design.',
  12.00, 432.00, 250,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-compresion-baja.png'],
  false, true, 'Medivaric', 'MV-CB-ROD',
  ARRAY['medias', 'compresion-baja', 'transparente', '8-15mmHg']
),
(
  'Medias de Compresión Media Rodilla 15-20mmHg Transparente',
  'Medium Compression Knee Stockings 15-20mmHg Transparent',
  'medias-compresion-media-rodilla-15-20mmhg',
  'Medias terapéuticas de compresión media 15-20mmHg. Solución estética y terapéutica para insuficiencia venosa, várices y piernas cansadas. Costura plana y suave en la punta, plantilla de circulación. Certificación INVIMA, ISO y FDA.',
  'Therapeutic medium compression stockings 15-20mmHg. Aesthetic and therapeutic solution for venous insufficiency, varicose veins and tired legs. Flat and soft seam at toe, circulation insole. INVIMA, ISO and FDA certified.',
  13.00, 468.00, 300,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-compresion-media.png'],
  true, true, 'Medivaric', '1123',
  ARRAY['medias', 'compresion-media', 'transparente', '15-20mmHg']
),
(
  'Medias de Compresión Alta Rodilla 20-30mmHg',
  'High Compression Knee Stockings 20-30mmHg',
  'medias-compresion-alta-rodilla-20-30mmhg',
  'Medias de compresión alta 20-30mmHg hasta la rodilla, opacas con dedos libres. Para tratamiento de insuficiencia venosa moderada a severa, post-escleroterapia y linfedema leve.',
  'High compression stockings 20-30mmHg knee-high, opaque with open toe. For treatment of moderate to severe venous insufficiency, post-sclerotherapy and mild lymphedema.',
  16.00, 576.00, 120,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-compresion-alta.png'],
  false, true, 'Medivaric', 'MV-CA-ROD',
  ARRAY['medias', 'compresion-alta', 'opaca', '20-30mmHg']
),
(
  'Medias de Compresión Deportiva con Cobre 18-23mmHg',
  'Copper Sport Compression Socks 18-23mmHg',
  'medias-compresion-deportiva-cobre',
  'Medias de compresión deportiva con hilado de cobre 18-23mmHg. Propiedades antibacterianas, mejora la circulación y reduce la inflamación. Ideales para deportistas y personas activas.',
  'Sport compression socks with copper yarn 18-23mmHg. Antibacterial properties, improves circulation and reduces inflammation. Ideal for athletes and active people.',
  15.00, 540.00, 180,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-deportiva-cobre.png'],
  false, true, 'Medivaric', 'MV-DEP-CU',
  ARRAY['medias', 'deportiva', 'cobre', 'compresion']
),
(
  'Calcetín Caballero Compresión Media 15-20mmHg',
  'Men''s Medium Compression Dress Socks 15-20mmHg',
  'calcetin-caballero-compresion-media',
  'Calcetín de vestir para caballero con compresión graduada 15-20mmHg. Diseño de rombos elegante, ideal para uso diario en oficina. Mejora la circulación sin sacrificar el estilo.',
  'Men''s dress sock with graduated compression 15-20mmHg. Elegant diamond pattern design, ideal for daily office use. Improves circulation without sacrificing style.',
  14.00, 504.00, 200,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/calcetin-caballero.jpeg'],
  false, true, 'Medivaric', 'MV-CAB-CM',
  ARRAY['calcetin', 'caballero', 'compresion-media', 'vestir']
),
(
  'Medias Viajero Travel Socks 15-20mmHg',
  'Travel Socks 15-20mmHg',
  'medias-viajero-travel-socks',
  'Medias de compresión unisex especialmente diseñadas para viajes largos. Compresión graduada 15-20mmHg que previene la hinchazón y fatiga de piernas durante vuelos y trayectos prolongados.',
  'Unisex compression socks specially designed for long trips. Graduated compression 15-20mmHg that prevents swelling and leg fatigue during flights and long journeys.',
  14.00, 504.00, 150,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-viajero.png'],
  false, true, 'Medivaric', 'MV-TRAVEL',
  ARRAY['medias', 'viajero', 'unisex', 'travel']
),
(
  'Medias para Pie Diabético / Sensible',
  'Diabetic / Sensitive Foot Socks',
  'medias-pie-diabetico-sensible',
  'Medias unisex sin compresión para pie sensible y diabético. Sin costuras que irriten, tejido suave y transpirable. Protección y confort para pacientes con neuropatía periférica.',
  'Unisex non-compression socks for sensitive and diabetic feet. Seamless design that won''t irritate, soft and breathable fabric. Protection and comfort for patients with peripheral neuropathy.',
  10.00, 360.00, 200,
  (SELECT id FROM categories WHERE slug = 'medias-antiembolicas'),
  ARRAY['/images/products/medias-diabetico.png'],
  false, true, 'Medivaric', 'MV-DIAB',
  ARRAY['medias', 'diabetico', 'pie-sensible', 'sin-compresion']
);

-- CAT-4: CIRUGÍA PLÁSTICA Y POST-QUIRÚRGICO (6 products)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Faja Post-quirúrgica Ajustable con Hilado de Cobre',
  'Adjustable Post-Surgical Girdle with Copper Yarn',
  'faja-postquirurgica-ajustable-cobre',
  'Faja post-quirúrgica ajustable con hilado de cobre para procedimientos estéticos (liposucción, abdominoplastia, lipoláser). Sistema de cierre con 4 líneas de ganchos, moldeado glúteo preformado, cierre perineal con cremallera. Forro interno: 48% hilado de cobre, 46% poliamida, 6% elastano.',
  'Adjustable post-surgical girdle with copper yarn for aesthetic procedures (liposuction, abdominoplasty, lipolaser). 4-hook closure system, pre-formed gluteal shaping, perineal zipper closure. Inner lining: 48% copper yarn, 46% polyamide, 6% elastane.',
  65.00, 2340.00, 50,
  (SELECT id FROM categories WHERE slug = 'cirugia-plastica'),
  ARRAY['/images/products/faja-postquirurgica-ajustable.png'],
  true, true, 'Medivaric', 'F126p',
  ARRAY['faja', 'postquirurgica', 'cobre', 'liposuccion']
),
(
  'Faja Post-quirúrgica Strapless con Cobre',
  'Strapless Post-Surgical Girdle with Copper',
  'faja-postquirurgica-strapless-cobre',
  'Faja post-quirúrgica sin tirantes con hilado de cobre. Diseño strapless ideal para procedimientos en el abdomen y espalda. Propiedades antibacterianas del cobre para una recuperación más rápida.',
  'Strapless post-surgical girdle with copper yarn. Strapless design ideal for abdomen and back procedures. Antibacterial copper properties for faster recovery.',
  60.00, 2160.00, 40,
  (SELECT id FROM categories WHERE slug = 'cirugia-plastica'),
  ARRAY['/images/products/faja-strapless.png'],
  false, true, 'Medivaric', 'MV-FJ-STRAP',
  ARRAY['faja', 'strapless', 'postquirurgica', 'cobre']
),
(
  'Brassier Post-quirúrgico con Hilado de Cobre',
  'Post-Surgical Bra with Copper Yarn',
  'brassier-postquirurgico-cobre',
  'Brassier post-quirúrgico ajustable con hilado de cobre. Diseñado para recuperación después de cirugías de mama. Soporte firme pero cómodo con propiedades regenerativas del cobre.',
  'Adjustable post-surgical bra with copper yarn. Designed for recovery after breast surgeries. Firm but comfortable support with regenerative copper properties.',
  45.00, 1620.00, 60,
  (SELECT id FROM categories WHERE slug = 'cirugia-plastica'),
  ARRAY['/images/products/brassier-postquirurgico.png'],
  false, true, 'Medivaric', 'MV-BRAS-CU',
  ARRAY['brassier', 'postquirurgico', 'cobre', 'mama']
),
(
  'Mentonera Post-quirúrgica con Cobre',
  'Post-Surgical Chin Strap with Copper',
  'mentonera-postquirurgica-cobre',
  'Mentonera de compresión con hilado de cobre para post-operatorio de cirugías faciales. Ideal para mentoplastia, liposucción de papada y lifting facial.',
  'Compression chin strap with copper yarn for post-operative facial surgeries. Ideal for mentoplasty, chin liposuction and face lift.',
  28.00, 1008.00, 45,
  (SELECT id FROM categories WHERE slug = 'cirugia-plastica'),
  ARRAY['/images/products/mentonera-postquirurgica.png'],
  false, true, 'Medivaric', 'MV-MENT-CU',
  ARRAY['mentonera', 'facial', 'postquirurgico', 'cobre']
),
(
  'Tabla Post-quirúrgica MDF con Cobre',
  'Post-Surgical MDF Board with Copper',
  'tabla-postquirurgica-mdf-cobre',
  'Tabla post-quirúrgica de MDF con hilado de cobre para uso debajo de la faja. Ayuda a mantener la presión uniforme y previene fibrosis después de liposucción.',
  'Post-surgical MDF board with copper yarn for use under the girdle. Helps maintain uniform pressure and prevents fibrosis after liposuction.',
  18.00, 648.00, 70,
  (SELECT id FROM categories WHERE slug = 'cirugia-plastica'),
  ARRAY['/images/products/tabla-postquirurgica.png'],
  false, true, 'Medivaric', 'MV-TABLA-CU',
  ARRAY['tabla', 'postquirurgica', 'mdf', 'cobre']
),
(
  'Short Materno Copper Mom',
  'Copper Mom Maternity Short',
  'short-materno-copper-mom',
  'Short de soporte materno con hilado de cobre de la línea Copper Mom. Soporte para vientre durante el embarazo, mejora circulación y reduce hinchazón. Propiedades antibacterianas naturales del cobre.',
  'Maternity support short with copper yarn from the Copper Mom line. Belly support during pregnancy, improves circulation and reduces swelling. Natural antibacterial copper properties.',
  35.00, 1260.00, 40,
  (SELECT id FROM categories WHERE slug = 'cirugia-plastica'),
  ARRAY['/images/products/short-materno.jpeg'],
  false, true, 'Medivaric', 'MV-MAT-SHORT',
  ARRAY['materno', 'embarazo', 'cobre', 'copper-mom']
);

-- CAT-5: ÓRTESIS Y REHABILITACIÓN (7 products)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Brace de Muñeca con Hilado de Cobre',
  'Copper Yarn Wrist Brace',
  'brace-muneca-cobre',
  'Muñequera con hilado de cobre para soporte y recuperación efectiva. Reduce inflamación y promueve circulación. Ideal para síndrome de túnel carpiano y lesiones de muñeca.',
  'Copper yarn wrist brace for effective support and recovery. Reduces inflammation and promotes circulation. Ideal for carpal tunnel syndrome and wrist injuries.',
  16.00, 576.00, 80,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/brace-muneca.jpg'],
  false, true, 'Medivaric', 'MV-ORT-MU',
  ARRAY['muñequera', 'brace', 'cobre', 'tunel-carpiano']
),
(
  'Soporte de Codo con Hilado de Cobre',
  'Copper Yarn Elbow Support',
  'soporte-codo-cobre',
  'Codera con hilado de cobre para alivio de dolor articular. Compresión suave que reduce la inflamación, ideal para codo de tenista y bursitis.',
  'Copper yarn elbow support for joint pain relief. Gentle compression that reduces inflammation, ideal for tennis elbow and bursitis.',
  9.00, 324.00, 100,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/soporte-codo.jpg'],
  false, true, 'Medivaric', 'MV-ORT-CO',
  ARRAY['codera', 'cobre', 'codo-de-tenista']
),
(
  'Estabilizador de Rodilla con Cobre',
  'Copper Knee Stabilizer',
  'estabilizador-rodilla-cobre',
  'Estabilizador de rodilla con hilado de cobre para máximo soporte lateral. Ideal para lesiones de ligamentos, rehabilitación post-operatoria y estabilidad durante actividades físicas.',
  'Copper yarn knee stabilizer for maximum lateral support. Ideal for ligament injuries, post-operative rehabilitation and stability during physical activities.',
  24.00, 864.00, 70,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/estabilizador-rodilla.jpg'],
  true, true, 'Medivaric', 'MV-ORT-ESTAB',
  ARRAY['rodillera', 'estabilizador', 'cobre', 'rehabilitacion']
),
(
  'Brace de Rodilla con Articulación Libre',
  'Free-Joint Knee Brace',
  'brace-rodilla-articulacion-libre',
  'Brace de rodilla con articulación libre y hilado de cobre. Permite rango de movimiento controlado para rehabilitación progresiva. Soportes laterales metálicos para estabilidad.',
  'Knee brace with free joint and copper yarn. Allows controlled range of motion for progressive rehabilitation. Metal lateral supports for stability.',
  25.00, 900.00, 50,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/brace-rodilla.jpg'],
  false, true, 'Medivaric', 'MV-ORT-BR-ART',
  ARRAY['brace', 'rodilla', 'articulacion', 'cobre']
),
(
  'Brace Postoperatorio para Rodilla',
  'Postoperative Knee Brace',
  'brace-postoperatorio-rodilla',
  'Brace post-operatorio de rodilla con sistema de bloqueo angular ajustable. Para rehabilitación después de cirugía de ligamento cruzado, menisco o reemplazo de rodilla.',
  'Postoperative knee brace with adjustable angular locking system. For rehabilitation after cruciate ligament, meniscus or knee replacement surgery.',
  115.00, 4140.00, 25,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/brace-postoperatorio.jpg'],
  false, true, 'Medivaric', 'MV-ORT-POST',
  ARRAY['brace', 'postoperatorio', 'rodilla', 'rehabilitacion']
),
(
  'Tobillera Estabilizadora con Cobre',
  'Copper Ankle Stabilizer',
  'tobillera-estabilizadora-cobre',
  'Estabilizador de tobillo con hilado de cobre. Soporte firme para esguinces, tendinitis y recuperación post-lesión. Propiedades antiinflamatorias del cobre.',
  'Copper yarn ankle stabilizer. Firm support for sprains, tendonitis and post-injury recovery. Anti-inflammatory copper properties.',
  19.00, 684.00, 90,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/tobillera-estabilizadora.jpg'],
  false, true, 'Medivaric', 'MV-ORT-TOB',
  ARRAY['tobillera', 'estabilizador', 'cobre', 'esguince']
),
(
  'Soporte para Fascitis Plantar con Gel',
  'Plantar Fasciitis Support with Gel',
  'soporte-fascitis-plantar-gel',
  'Soporte para fascitis plantar con almohadilla de gel y hilado de cobre. Alivio de dolor en el talón y arco del pie. Uso diario discreto dentro del calzado.',
  'Plantar fasciitis support with gel pad and copper yarn. Relief for heel and arch pain. Discreet daily use inside footwear.',
  9.00, 324.00, 120,
  (SELECT id FROM categories WHERE slug = 'ortesis-rehabilitacion'),
  ARRAY['/images/products/fascitis-plantar.jpg'],
  false, true, 'Medivaric', 'MV-ORT-FP',
  ARRAY['fascitis', 'plantar', 'gel', 'cobre']
);

-- CAT-6: DESINFECCIÓN Y LIMPIEZA (5 products)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Desinfectante de Superficies Exeol Floor',
  'Exeol Floor Surface Disinfectant',
  'desinfectante-superficies-exeol-floor',
  'Desinfectante ultraconcentrado de superficies para pisos y paredes hospitalarias. Fórmula francesa de alto rendimiento que combina eficacia, ecología y tecnicidad. Uso en áreas críticas.',
  'Ultra-concentrated surface disinfectant for hospital floors and walls. French high-performance formula combining effectiveness, ecology and technicality. Use in critical areas.',
  42.00, 1512.00, 100,
  (SELECT id FROM categories WHERE slug = 'desinfeccion-limpieza'),
  ARRAY['/images/products/exeol-floor.png'],
  false, true, 'Exeol', 'EX-FLOOR',
  ARRAY['desinfectante', 'pisos', 'paredes', 'hospital']
),
(
  'Jabón Multi-enzimático Exeol 4E',
  'Exeol 4E Multi-enzymatic Soap',
  'jabon-multienzimatico-exeol-4e',
  'Jabón multi-enzimático con 4 enzimas para limpieza de instrumental médico. Elimina eficazmente residuos orgánicos de instrumentos quirúrgicos antes de la esterilización.',
  'Multi-enzymatic soap with 4 enzymes for medical instrument cleaning. Effectively removes organic residue from surgical instruments before sterilization.',
  38.00, 1368.00, 80,
  (SELECT id FROM categories WHERE slug = 'desinfeccion-limpieza'),
  ARRAY['/images/products/exeol-4e.png'],
  false, true, 'Exeol', 'EX-4E',
  ARRAY['jabon', 'multienzimatico', 'instrumental', 'limpieza']
),
(
  'Detergente Desinfectante Exeol Surf Optimal',
  'Exeol Surf Optimal Disinfectant Detergent',
  'detergente-desinfectante-exeol-surf-optimal',
  'Detergente desinfectante sin alcohol para superficies, mobiliario y equipos médicos. Fórmula suave pero efectiva, no daña superficies delicadas. Ideal para limpieza diaria hospitalaria.',
  'Alcohol-free disinfectant detergent for surfaces, furniture and medical equipment. Gentle but effective formula that does not damage delicate surfaces. Ideal for daily hospital cleaning.',
  36.00, 1296.00, 90,
  (SELECT id FROM categories WHERE slug = 'desinfeccion-limpieza'),
  ARRAY['/images/products/exeol-surf-optimal.png'],
  false, true, 'Exeol', 'EX-SURF',
  ARRAY['detergente', 'desinfectante', 'sin-alcohol', 'superficies']
),
(
  'Glutaraldehído 2% – Desinfectante de Alto Nivel (GTA 2%)',
  '2% Glutaraldehyde – High-Level Disinfectant (GTA 2%)',
  'glutaraldehido-2-desinfectante-alto-nivel',
  'Desinfectante de alto nivel a base de glutaraldehído al 2%. Ideal para sistemas de endoscopia, dispositivos médicos termosensibles e instrumental quirúrgico que no puede ser autoclavado.',
  '2% glutaraldehyde-based high-level disinfectant. Ideal for endoscopy systems, thermosensitive medical devices and surgical instruments that cannot be autoclaved.',
  55.00, 1980.00, 50,
  (SELECT id FROM categories WHERE slug = 'desinfeccion-limpieza'),
  ARRAY['/images/products/glutaraldehido-gta2.png'],
  true, true, 'Exeol', 'EX-GTA2',
  ARRAY['glutaraldehido', 'desinfectante', 'alto-nivel', 'endoscopia']
),
(
  'Jabón Antiséptico con Clorhexidina al 4%',
  'Antiseptic Soap with 4% Chlorhexidine',
  'jabon-antiseptico-clorhexidina-4',
  'Jabón con gluconato de clorhexidina al 4% para lavado de manos quirúrgico. Amplio espectro antimicrobiano con efecto residual prolongado. Uso hospitalario profesional.',
  'Soap with 4% chlorhexidine gluconate for surgical hand washing. Broad antimicrobial spectrum with prolonged residual effect. Professional hospital use.',
  18.00, 648.00, 120,
  (SELECT id FROM categories WHERE slug = 'desinfeccion-limpieza'),
  ARRAY['/images/products/clorhexidina-jabon.png'],
  false, true, 'Wescohex', 'WQ-CHX4',
  ARRAY['jabon', 'clorhexidina', 'antiseptico', 'quirurgico']
);

-- CAT-7: GASES MEDICINALES (1 product)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Proyecto de Sistema de Gases Medicinales (Consultar)',
  'Medical Gas System Project (Inquire)',
  'proyecto-sistema-gases-medicinales',
  'Elaboración de proyectos de Sistemas de Gases Medicinales, Vacío Médico Quirúrgico y WAGD bajo norma NFPA-99. Incluye suministro e instalación de tuberías, manifolds, válvulas, alarmas, tomas de gases medicinales de pared. Equipos OHIO Medical (fabricación americana).',
  'Design of Medical Gas Systems, Surgical Medical Vacuum and WAGD projects under NFPA-99 standard. Includes supply and installation of piping, manifolds, valves, alarms, wall medical gas outlets. OHIO Medical equipment (American made).',
  0.00, 0.00, 999,
  (SELECT id FROM categories WHERE slug = 'gases-medicinales'),
  ARRAY['/images/products/ohio-medical-gases.png'],
  true, true, 'OHIO Medical', 'OHIO-PROJ',
  ARRAY['gases', 'medicinales', 'proyecto', 'NFPA-99', 'instalacion']
);

-- CAT-8: CUIDADO DE HERIDAS (4 products)
INSERT INTO products (name_es, name_en, slug, description_es, description_en, price_usd, price_bs, stock, category_id, images, featured, active, brand, sku, tags) VALUES
(
  'Apósitos para Ostomía Hollister',
  'Hollister Ostomy Dressings',
  'apositos-ostomia-hollister',
  'Productos para cuidado de ostomía marca Hollister. Sistema de barrera cutánea que protege la piel periestomal. Diseñados para máximo confort y seguridad del paciente ostomizado.',
  'Hollister ostomy care products. Skin barrier system that protects peristomal skin. Designed for maximum comfort and safety of the ostomy patient.',
  28.00, 1008.00, 80,
  (SELECT id FROM categories WHERE slug = 'cuidado-heridas'),
  ARRAY['/images/products/hollister-ostomy.jpeg'],
  false, true, 'Hollister', 'HOL-OSTM',
  ARRAY['ostomia', 'aposito', 'barrera-cutanea']
),
(
  'Apósitos Cutimed para Cuidado de Heridas',
  'Cutimed Wound Care Dressings',
  'apositos-cutimed-cuidado-heridas',
  'Apósitos avanzados para cuidado de heridas marca ESSIT/Cutimed. Tecnología de absorción superior para manejo de heridas crónicas y agudas. Promueven un ambiente húmedo óptimo para la cicatrización.',
  'Advanced wound care dressings by ESSIT/Cutimed. Superior absorption technology for chronic and acute wound management. Promote an optimal moist environment for healing.',
  22.00, 792.00, 100,
  (SELECT id FROM categories WHERE slug = 'cuidado-heridas'),
  ARRAY['/images/products/cutimed-wound-care.png'],
  false, true, 'Cutimed/ESSIT', 'CUT-WOUND',
  ARRAY['aposito', 'heridas', 'cutimed', 'cicatrizacion']
),
(
  'Apósito Estéril Leukomed T Plus Skin Sensitive',
  'Leukomed T Plus Skin Sensitive Sterile Dressing',
  'aposito-esteril-leukomed-t-plus',
  'Apósito estéril transparente con adhesivo suave para pieles sensibles. Permite monitoreo visual de la herida sin necesidad de retiro. Barrera impermeable contra bacterias y agua.',
  'Sterile transparent dressing with gentle adhesive for sensitive skin. Allows visual wound monitoring without removal. Waterproof barrier against bacteria and water.',
  8.00, 288.00, 200,
  (SELECT id FROM categories WHERE slug = 'cuidado-heridas'),
  ARRAY['/images/products/leukomed-aposito.png'],
  false, true, 'Leukoplast', 'LEU-TPSS',
  ARRAY['aposito', 'esteril', 'transparente', 'piel-sensible']
),
(
  'Rollos de Papel para Esterilización (Vapor y Óxido de Etileno)',
  'Sterilization Paper Rolls (Steam & Ethylene Oxide)',
  'rollos-papel-esterilizacion',
  'Rollos de papel Pergut para esterilización por vapor y óxido de etileno. Material resistente que garantiza la esterilidad del instrumental empaquetado hasta su uso. Indicador de proceso incluido.',
  'Pergut paper rolls for steam and ethylene oxide sterilization. Resistant material that guarantees sterility of packaged instruments until use. Process indicator included.',
  15.00, 540.00, 150,
  (SELECT id FROM categories WHERE slug = 'cuidado-heridas'),
  ARRAY['/images/products/rollos-esterilizacion.png'],
  false, true, 'BolsaPlast Medical', 'BPM-ROLL',
  ARRAY['esterilizacion', 'papel', 'pergut', 'vapor']
);
