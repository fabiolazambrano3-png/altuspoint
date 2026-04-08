-- =====================================================
-- Migration 003: Product Variants table
-- =====================================================

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  size TEXT DEFAULT '',
  color TEXT DEFAULT '',
  sku_variant TEXT DEFAULT '',
  stock INTEGER NOT NULL DEFAULT 0,
  price_diff_usd DECIMAL(10,2) NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_variants_product ON product_variants(product_id);

-- RLS
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Public can read active variants
CREATE POLICY "Anyone can view active variants" ON product_variants FOR SELECT USING (active = true);

-- Admins can CRUD
CREATE POLICY "Admins can insert variants" ON product_variants FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Admins can update variants" ON product_variants FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Admins can delete variants" ON product_variants FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Admins can view all variants" ON product_variants FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
