-- Tabla para brochures por línea de producto (no por producto individual)
CREATE TABLE IF NOT EXISTS line_brochures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_es TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  category_slug TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  brochure_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX idx_line_brochures_active ON line_brochures (active, display_order);
CREATE INDEX idx_line_brochures_slug ON line_brochures (category_slug);

-- RLS
ALTER TABLE line_brochures ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "line_brochures_public_read" ON line_brochures
  FOR SELECT USING (true);

-- CRUD solo para admins autenticados
CREATE POLICY "line_brochures_admin_insert" ON line_brochures
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "line_brochures_admin_update" ON line_brochures
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "line_brochures_admin_delete" ON line_brochures
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_line_brochures_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_line_brochures_updated_at
  BEFORE UPDATE ON line_brochures
  FOR EACH ROW
  EXECUTE FUNCTION update_line_brochures_updated_at();
