-- Setup tabel untuk soal kompetensi/TKG

-- Tabel kategori_kompetensi
CREATE TABLE IF NOT EXISTS kategori_kompetensi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel soal_kompetensi  
CREATE TABLE IF NOT EXISTS soal_kompetensi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kategori_kompetensi_id UUID NOT NULL REFERENCES kategori_kompetensi(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    href TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_kategori_kompetensi_display_order ON kategori_kompetensi(display_order);
CREATE INDEX IF NOT EXISTS idx_soal_kompetensi_kategori_id ON soal_kompetensi(kategori_kompetensi_id);
CREATE INDEX IF NOT EXISTS idx_soal_kompetensi_display_order ON soal_kompetensi(display_order);

-- Trigger untuk updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger ke tabel kategori_kompetensi
DROP TRIGGER IF EXISTS update_kategori_kompetensi_updated_at ON kategori_kompetensi;
CREATE TRIGGER update_kategori_kompetensi_updated_at 
    BEFORE UPDATE ON kategori_kompetensi 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger ke tabel soal_kompetensi
DROP TRIGGER IF EXISTS update_soal_kompetensi_updated_at ON soal_kompetensi;
CREATE TRIGGER update_soal_kompetensi_updated_at 
    BEFORE UPDATE ON soal_kompetensi 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert data contoh
INSERT INTO kategori_kompetensi (title, display_order) VALUES
('Latihan Soal Safety', 1),
('Latihan Soal Operasional', 2),
('Latihan Soal Lainnya', 3)
ON CONFLICT DO NOTHING;

-- Insert soal contoh (ambil ID dari kategori yang baru dibuat)
DO $$
DECLARE
    safety_id UUID;
    operasional_id UUID;
BEGIN
    -- Get kategori IDs
    SELECT id INTO safety_id FROM kategori_kompetensi WHERE title = 'Latihan Soal Safety';
    SELECT id INTO operasional_id FROM kategori_kompetensi WHERE title = 'Latihan Soal Operasional';
    
    -- Insert soal untuk Safety
    IF safety_id IS NOT NULL THEN
        INSERT INTO soal_kompetensi (kategori_kompetensi_id, title, href, display_order) VALUES
        (safety_id, 'Soal Safety Dasar', '/kompetensi/soal/safety-1', 1),
        (safety_id, 'Soal Safety Lanjutan', '/kompetensi/soal/safety-2', 2)
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Insert soal untuk Operasional
    IF operasional_id IS NOT NULL THEN
        INSERT INTO soal_kompetensi (kategori_kompetensi_id, title, href, display_order) VALUES
        (operasional_id, 'Soal Operasional 1', '/kompetensi/soal/op-1', 1),
        (operasional_id, 'Soal Operasional 2', '/kompetensi/soal/op-2', 2)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
