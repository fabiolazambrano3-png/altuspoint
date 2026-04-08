-- Add brochure_url column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS brochure_url TEXT DEFAULT NULL;

-- Create storage bucket for product brochures (PDFs)
INSERT INTO storage.buckets (id, name, public) VALUES ('product-brochures', 'product-brochures', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to brochures
CREATE POLICY "Public read brochures" ON storage.objects FOR SELECT USING (bucket_id = 'product-brochures');

-- Allow authenticated admins to upload/delete brochures
CREATE POLICY "Admin upload brochures" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-brochures');
CREATE POLICY "Admin delete brochures" ON storage.objects FOR DELETE USING (bucket_id = 'product-brochures');
