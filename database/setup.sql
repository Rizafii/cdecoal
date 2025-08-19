-- SQL untuk membuat tabel galleries di Supabase
-- Jalankan di SQL Editor di dashboard Supabase

-- Buat tabel galleries
CREATE TABLE IF NOT EXISTS galleries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buat trigger untuk update updated_at otomatis
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_galleries_updated_at 
    BEFORE UPDATE ON galleries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Buat RLS (Row Level Security) policies
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

-- Policy untuk SELECT (semua user bisa melihat)
CREATE POLICY "Allow public read access on galleries" 
    ON galleries FOR SELECT 
    USING (true);

-- Policy untuk INSERT/UPDATE/DELETE (hanya untuk authenticated users)
CREATE POLICY "Allow authenticated users to manage galleries" 
    ON galleries FOR ALL 
    USING (auth.role() = 'authenticated');

-- Buat storage bucket untuk gambar (jika belum ada)
-- Ini dilakukan melalui UI Supabase Storage atau dengan RPC call

-- Grant permissions untuk storage bucket
-- Akan dilakukan melalui Storage policies di Supabase UI
