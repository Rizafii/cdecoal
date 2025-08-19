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

-- =======================
-- TRAINING DATA TABLES
-- =======================

-- Buat tabel training_units (unit pelatihan)
CREATE TABLE IF NOT EXISTS training_units (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    href TEXT, -- untuk training unit yang hanya berupa link
    file_path TEXT, -- path file PDF di Supabase Storage
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buat tabel materi_items (sub materi dalam unit pelatihan)
CREATE TABLE IF NOT EXISTS materi_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    training_unit_id UUID REFERENCES training_units(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    href TEXT NOT NULL,
    file_path TEXT, -- path file PDF di Supabase Storage
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger untuk update updated_at pada training_units
CREATE TRIGGER update_training_units_updated_at 
    BEFORE UPDATE ON training_units 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk update updated_at pada materi_items
CREATE TRIGGER update_materi_items_updated_at 
    BEFORE UPDATE ON materi_items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS untuk training_units
ALTER TABLE training_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on training_units" 
    ON training_units FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated users to manage training_units" 
    ON training_units FOR ALL 
    USING (auth.role() = 'authenticated');

-- RLS untuk materi_items
ALTER TABLE materi_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on materi_items" 
    ON materi_items FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated users to manage materi_items" 
    ON materi_items FOR ALL 
    USING (auth.role() = 'authenticated');

-- =======================
-- INDUKSI DATA TABLES
-- =======================

-- Buat tabel kategori_induksi (kategori soal induksi)
CREATE TABLE IF NOT EXISTS kategori_induksi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    minimal_nilai INTEGER NOT NULL DEFAULT 80,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Buat tabel soal_induksi (soal dalam kategori induksi)
CREATE TABLE IF NOT EXISTS soal_induksi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kategori_induksi_id UUID REFERENCES kategori_induksi(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    href TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger untuk update updated_at pada kategori_induksi
CREATE TRIGGER update_kategori_induksi_updated_at 
    BEFORE UPDATE ON kategori_induksi 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk update updated_at pada soal_induksi
CREATE TRIGGER update_soal_induksi_updated_at 
    BEFORE UPDATE ON soal_induksi 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS untuk kategori_induksi
ALTER TABLE kategori_induksi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on kategori_induksi" 
    ON kategori_induksi FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated users to manage kategori_induksi" 
    ON kategori_induksi FOR ALL 
    USING (auth.role() = 'authenticated');

-- RLS untuk soal_induksi
ALTER TABLE soal_induksi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on soal_induksi" 
    ON soal_induksi FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated users to manage soal_induksi" 
    ON soal_induksi FOR ALL 
    USING (auth.role() = 'authenticated');
