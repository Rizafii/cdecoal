-- Setup untuk tabel kategori_recruitment
CREATE TABLE IF NOT EXISTS kategori_recruitment (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    minimal_nilai INTEGER DEFAULT 80,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Setup untuk tabel soal_recruitment
CREATE TABLE IF NOT EXISTS soal_recruitment (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    kategori_recruitment_id UUID NOT NULL REFERENCES kategori_recruitment(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    href TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_kategori_recruitment_display_order ON kategori_recruitment(display_order);
CREATE INDEX IF NOT EXISTS idx_soal_recruitment_kategori_id ON soal_recruitment(kategori_recruitment_id);
CREATE INDEX IF NOT EXISTS idx_soal_recruitment_display_order ON soal_recruitment(display_order);

-- Enable RLS (Row Level Security)
ALTER TABLE kategori_recruitment ENABLE ROW LEVEL SECURITY;
ALTER TABLE soal_recruitment ENABLE ROW LEVEL SECURITY;

-- Create policies untuk public read access
CREATE POLICY "Enable read access for all users" ON kategori_recruitment FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON soal_recruitment FOR SELECT USING (true);

-- Create policies untuk authenticated insert/update/delete
CREATE POLICY "Enable insert for authenticated users only" ON kategori_recruitment FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON kategori_recruitment FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON kategori_recruitment FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON soal_recruitment FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON soal_recruitment FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON soal_recruitment FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO kategori_recruitment (title, minimal_nilai, display_order) VALUES
('Tes Psikologi', 80, 1),
('Tes Teknis', 85, 2),
('Wawancara', 75, 3);

INSERT INTO soal_recruitment (kategori_recruitment_id, title, href, display_order) VALUES
((SELECT id FROM kategori_recruitment WHERE title = 'Tes Psikologi'), 'Tes Kepribadian', 'https://forms.google.com/sample-psikologi', 1),
((SELECT id FROM kategori_recruitment WHERE title = 'Tes Teknis'), 'Tes Kompetensi Teknis', 'https://forms.google.com/sample-teknis', 1),
((SELECT id FROM kategori_recruitment WHERE title = 'Wawancara'), 'Formulir Pendaftaran Interview', 'https://forms.google.com/sample-interview', 1);
