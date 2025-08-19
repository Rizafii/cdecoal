# Setup Gallery Admin dengan Supabase

## Langkah-langkah Setup

### 1. Setup Environment Variables

Buat file `.env.local` di root project dan tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### 2. Setup Database di Supabase

1. Buka dashboard Supabase
2. Pergi ke SQL Editor
3. Jalankan script dari file `database/setup.sql`

### 3. Setup Storage di Supabase

1. Buka Storage di dashboard Supabase
2. Buat bucket baru dengan nama `images`
3. Set bucket sebagai public
4. Atur policies untuk bucket:

```sql
-- Policy untuk upload (authenticated users)
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Policy untuk public access
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Policy untuk delete (authenticated users)
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### 4. Akses Admin Panel

1. Buka `/admin` di browser
2. Masukkan password admin (default: `admin123`)
3. Klik tab "Gallery" untuk mengelola gallery

### 5. Menambahkan Gallery ke Homepage

Untuk menampilkan gallery di homepage, tambahkan komponen `GallerySection` ke file `src/app/page.tsx`:

```tsx
import GallerySection from "@/components/GallerySection";

// Tambahkan di dalam component
<GallerySection />;
```

## Fitur Gallery Admin

- ✅ Upload gambar ke Supabase Storage
- ✅ Simpan metadata ke Supabase Database
- ✅ Preview gambar sebelum upload
- ✅ Validasi file (ukuran max 5MB, hanya gambar)
- ✅ Hapus gallery (gambar + data)
- ✅ Responsive design
- ✅ Loading states dan error handling

## Struktur Database

### Tabel `galleries`

- `id` (UUID, Primary Key)
- `title` (VARCHAR, Judul gallery)
- `image_url` (TEXT, URL publik gambar)
- `image_path` (TEXT, Path file di storage)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Komponen yang Dibuat

1. `src/lib/supabase.ts` - Konfigurasi Supabase client
2. `src/components/admin/GalleryManager.tsx` - Komponen untuk mengelola gallery
3. `src/components/admin/AdminDashboard.tsx` - Dashboard admin dengan navigasi
4. `src/components/GallerySection.tsx` - Komponen untuk menampilkan gallery di frontend
5. `database/setup.sql` - Script SQL untuk setup database

## Keamanan

- Row Level Security (RLS) diaktifkan
- Hanya authenticated users yang bisa mengelola gallery
- Public dapat melihat gallery
- Password protection untuk admin panel
