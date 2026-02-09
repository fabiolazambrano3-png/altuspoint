-- AltusPoint Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  state TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_es TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_es TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  price_usd DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_bs DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'payment_uploaded', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bank_transfer', 'pago_movil', 'zelle', 'paypal', 'crypto')),
  payment_proof_url TEXT,
  total_usd DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_bs DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_address TEXT NOT NULL DEFAULT '',
  shipping_city TEXT NOT NULL DEFAULT '',
  shipping_state TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store Settings (payment info, etc.)
CREATE TABLE store_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user sign up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile, admins can read all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories: anyone can read
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);

-- Products: anyone can read active products
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (active = true);

-- Orders: users can read their own, create their own
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: users can read their own order items
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can create order items" ON order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Store Settings: anyone can read
CREATE POLICY "Anyone can view store settings" ON store_settings FOR SELECT USING (true);

-- Seed initial categories
INSERT INTO categories (name_es, name_en, slug, description_es, description_en) VALUES
  ('Equipos Médicos', 'Medical Equipment', 'equipos-medicos', 'Equipos de diagnóstico y tratamiento', 'Diagnostic and treatment equipment'),
  ('Material Quirúrgico', 'Surgical Supplies', 'material-quirurgico', 'Instrumental y material para cirugía', 'Instruments and supplies for surgery'),
  ('Insumos Médicos', 'Medical Supplies', 'insumos-medicos', 'Consumibles y material desechable', 'Consumables and disposable materials');

-- Seed store settings (payment info - UPDATE WITH REAL VALUES)
INSERT INTO store_settings (key, value) VALUES
  ('bank_name', 'Banco de Venezuela'),
  ('bank_account_type', 'Corriente'),
  ('bank_account_number', 'XXXX-XXXX-XX-XXXXXXXXXX'),
  ('bank_rif', 'J-XXXXXXXXX'),
  ('bank_holder', 'AltusPoint C.A.'),
  ('pago_movil_phone', '0412-XXXXXXX'),
  ('pago_movil_bank_code', '0102'),
  ('pago_movil_id', 'J-XXXXXXXXX'),
  ('zelle_email', 'pagos@altuspoint.com'),
  ('zelle_holder', 'AltusPoint LLC'),
  ('crypto_network', 'Binance Smart Chain (BEP20)'),
  ('crypto_wallet', '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'),
  ('crypto_currency', 'USDT'),
  ('whatsapp_number', '+58412XXXXXXX'),
  ('store_email', 'info@altuspoint.com');

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(featured) WHERE active = true;
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
