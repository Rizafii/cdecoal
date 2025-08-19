# Setup Gallery Admin & Training Manager dengan Supabase

## Langkah-langkah Setup

### 1. Setup Environment Variables

Buat file `.env.local` di root project dan tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
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
3. Pilih tab yang diinginkan:
   - **Gallery**: Kelola gambar gallery
   - **Training Data**: Kelola unit pelatihan dan materi

### 5. Menambahkan Gallery ke Homepage

Untuk menampilkan gallery di homepage, tambahkan komponen `GallerySection` ke file `src/app/page.tsx`:

```tsx
import GallerySection from "@/components/GallerySection";

// Tambahkan di dalam component
<GallerySection />;
```

## Fitur Admin Panel

### Gallery Manager

- ✅ Upload gambar ke Supabase Storage
- ✅ Simpan metadata ke Supabase Database
- ✅ Preview gambar sebelum upload
- ✅ Validasi file (ukuran max 5MB, hanya gambar)
- ✅ Hapus gallery (gambar + data)
- ✅ Responsive design
- ✅ Loading states dan error handling

### Training Manager

- ✅ Kelola unit pelatihan dengan CRUD operations
- ✅ Upload file PDF untuk setiap unit/materi
- ✅ Kelola materi items untuk setiap unit
- ✅ Urutan tampil (display order)
- ✅ File upload ke Supabase Storage
- ✅ Hapus file otomatis saat update/delete
- ✅ Expandable interface untuk materi
- ✅ PDF viewer integration

## Struktur Database

### Tabel `galleries`

- `id` (UUID, Primary Key)
- `title` (VARCHAR, Judul gallery)
- `image_url` (TEXT, URL publik gambar)
- `image_path` (TEXT, Path file di storage)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabel `training_units`

- `id` (UUID, Primary Key)
- `title` (VARCHAR, Judul unit)
- `href` (TEXT, URL eksternal atau otomatis dari file)
- `file_path` (TEXT, Path file PDF di storage)
- `display_order` (INTEGER, Urutan tampil)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabel `materi_items`

- `id` (UUID, Primary Key)
- `training_unit_id` (UUID, Foreign Key ke training_units)
- `title` (VARCHAR, Judul materi)
- `href` (TEXT, URL eksternal atau otomatis dari file)
- `file_path` (TEXT, Path file PDF di storage)
- `display_order` (INTEGER, Urutan tampil)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Komponen yang Dibuat

### Backend API

1. `/api/admin/galleries` - CRUD untuk gallery
2. `/api/admin/upload` - Upload file gambar
3. `/api/admin/training` - CRUD untuk training units
4. `/api/admin/materi` - CRUD untuk materi items

### Frontend Components

1. `src/lib/supabase.ts` - Konfigurasi Supabase client
2. `src/components/admin/GalleryManager.tsx` - Kelola gallery
3. `src/components/admin/TrainingManager.tsx` - Kelola training data
4. `src/components/admin/AdminDashboard.tsx` - Dashboard admin
5. `src/components/GallerySection.tsx` - Display gallery di frontend
6. `src/components/DynamicTrainingSection.tsx` - Display training data di frontend

### Database Schema

7. `database/setup.sql` - Script SQL untuk setup database

## Cara Penggunaan Training Manager

### Menambah Unit Pelatihan

1. Masuk ke tab "Training Data" di admin panel
2. Isi form "Tambah Training Unit Baru":
   - **Judul Unit**: Nama unit pelatihan
   - **URL Link**: Link eksternal (opsional jika upload file)
   - **Urutan Tampil**: Angka untuk mengurutkan (0 = paling atas)
   - **Upload File PDF**: File PDF yang akan otomatis digunakan sebagai link
3. Klik "Tambah Unit"

### Menambah Materi ke Unit

1. Expand unit pelatihan yang ingin ditambah materi
2. Isi form "Tambah Materi Baru":
   - **Judul materi**: Nama materi
   - **URL**: Link eksternal (opsional jika upload file)
   - **Urutan**: Angka untuk mengurutkan materi
   - **Upload File PDF**: File PDF materi
3. Klik "Tambah Materi"

### Fitur File Upload

- File PDF otomatis diupload ke Supabase Storage
- URL publik otomatis di-generate dan disimpan ke database
- File lama otomatis dihapus saat update atau delete
- File dapat diakses langsung via URL atau melalui PDF viewer

## Keamanan

- Row Level Security (RLS) diaktifkan untuk semua tabel
- Service Role Key digunakan untuk operasi admin melalui API
- Hanya admin yang dapat mengakses panel admin (password protected)
- Public dapat melihat gallery dan training data
- File storage menggunakan public bucket untuk akses mudah
