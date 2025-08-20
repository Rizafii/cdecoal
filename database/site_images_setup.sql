-- Tabel untuk menyimpan gambar website (Hero, About, dll)
CREATE TABLE IF NOT EXISTS site_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL UNIQUE, -- 'hero', 'about', dll
  image_url TEXT NOT NULL,
  image_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_site_images_type ON site_images(type);

-- Trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_images_updated_at 
    BEFORE UPDATE ON site_images 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Kebijakan Row Level Security (RLS)
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Policy untuk membaca data (public bisa akses)
CREATE POLICY "Enable read access for all users" ON site_images
    FOR SELECT USING (true);

-- Policy untuk insert/update/delete (hanya service role)
CREATE POLICY "Enable all access for service role" ON site_images
    FOR ALL USING (auth.role() = 'service_role');

-- Comment untuk dokumentasi
COMMENT ON TABLE site_images IS 'Tabel untuk menyimpan gambar-gambar website seperti Hero section, About section, dll';
COMMENT ON COLUMN site_images.type IS 'Jenis gambar: hero, about, dll';
COMMENT ON COLUMN site_images.image_url IS 'URL publik gambar dari Supabase Storage';
COMMENT ON COLUMN site_images.image_path IS 'Path gambar di Supabase Storage untuk keperluan delete';
