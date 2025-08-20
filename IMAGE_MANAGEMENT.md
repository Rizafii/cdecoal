# Fitur Kelola Gambar Website

## Gambaran Umum

Fitur ini memungkinkan admin untuk mengelola gambar-gambar penting di website seperti:

- **Hero Section**: Gambar latar belakang utama di halaman depan
- **About Section**: Gambar yang ditampilkan di bagian tentang kami

## Cara Penggunaan

### 1. Akses Admin Dashboard

- Buka `/admin` di browser
- Masukkan password admin
- Pilih menu "Kelola Gambar"

### 2. Upload Gambar Baru

1. Pilih jenis gambar (Hero atau About)
2. Klik area upload atau drag & drop file
3. Pilih file gambar (JPG, PNG, JPEG, max 10MB)
4. Klik "Simpan Gambar"
5. Setelah berhasil, pilih "Refresh Halaman" untuk melihat perubahan

### 3. Melihat Perubahan

- Gambar akan langsung terlihat di preview admin
- Untuk melihat di halaman utama, refresh browser

## Struktur Teknis

### Database

- Tabel: `site_images`
- Columns: `id`, `type`, `image_url`, `image_path`, `created_at`, `updated_at`
- Policy: Public read, service role untuk write

### Storage

- Bucket: `images`
- Folder: `site-images/`
- Format nama: `{type}-{timestamp}.{ext}`

### API Endpoints

- `GET /api/admin/images?type={type}` - Public, untuk mendapatkan URL gambar
- `POST /api/admin/images` - Protected, untuk upload gambar baru

### Components

- `ImageManager.tsx` - Interface admin untuk upload
- `useSiteImage.ts` - Hook untuk mengambil gambar di frontend
- `Hero.tsx` & `About.tsx` - Menggunakan gambar dari database

## Fitur

- ✅ Upload file ke Supabase Storage
- ✅ Auto delete gambar lama saat upload baru
- ✅ Fallback ke gambar default jika tidak ada di database
- ✅ Preview gambar sebelum upload
- ✅ Validasi file type dan size
- ✅ Professional skeleton loading dengan pulse animation
- ✅ Error handling
- ✅ Responsive design

## Loading States

Sistem menggunakan skeleton component yang profesional dengan:

- **Multi-layer pulse animation** dengan delay yang berbeda
- **Gradient background** untuk efek yang halus
- **Concentric circles** sebagai placeholder icon
- **Wave-like animation** untuk experience yang smooth

### Skeleton Components

- `Skeleton.tsx` - Base skeleton component dengan multiple animation layers
- `ImageSkeleton.tsx` - Specialized untuk gambar dengan icon placeholder
- Digunakan di Hero dan About sections saat loading gambar dari Supabase

## Catatan

- Gambar default masih tersedia di `/public/hero.jpg` dan `/public/about.jpg`
- Sistem akan fallback ke gambar default jika:
  - Belum ada gambar yang diupload
  - Terjadi error saat mengambil data
  - Supabase tidak tersedia
