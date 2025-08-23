# Setup Sistem Admin Soal TKG (Kompetensi)

## Langkah-langkah Setup

### 1. Setup Database

Jalankan script SQL untuk membuat tabel database:

```sql
-- Jalankan file: database/kompetensi_setup.sql
-- Atau copy paste script berikut ke Supabase SQL Editor:

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
```

### 2. Konfigurasi Environment Variables

Pastikan environment variables berikut sudah di set di `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Akses Admin Panel

1. Buka halaman admin: `http://localhost:3000/admin`
2. Masukkan password admin
3. Klik tab "Soal TKG" di sidebar

## Fitur Yang Tersedia

### Dashboard Admin - Tab "Soal TKG"

#### Kelola Kategori:

- ✅ Tambah kategori baru
- ✅ Edit kategori yang sudah ada
- ✅ Hapus kategori (akan menghapus semua soal dalam kategori)
- ✅ Atur urutan tampil kategori

#### Kelola Soal:

- ✅ Tambah soal baru dalam kategori
- ✅ Edit soal yang sudah ada
- ✅ Hapus soal individual
- ✅ Atur urutan tampil soal
- ✅ Set URL/link untuk setiap soal

#### Fitur UI:

- ✅ Interface yang responsif
- ✅ Expand/collapse kategori
- ✅ Konfirmasi sebelum hapus
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

### Halaman Public - Soal TKG

#### Halaman: `/pelatihan/kompetensi`

- ✅ Menampilkan data dari database
- ✅ Fallback ke data statis jika database error
- ✅ Loading state yang responsif
- ✅ Interface yang clean dan user-friendly
- ✅ Link eksternal untuk setiap soal

## Struktur File Yang Dibuat

```
src/
├── app/
│   ├── api/admin/
│   │   ├── kompetensi/route.ts          # API untuk CRUD kategori
│   │   └── soal-kompetensi/route.ts     # API untuk CRUD soal
│   └── pelatihan/kompetensi/
│       ├── data.ts                      # Data handler & fallback
│       └── page.tsx                     # Halaman public (updated)
├── components/admin/
│   ├── KompetensiManager.tsx            # Admin component
│   └── AdminDashboard.tsx               # Updated dengan menu baru
└── database/
    └── kompetensi_setup.sql             # Script setup database
```

## API Endpoints

### Kategori Kompetensi (`/api/admin/kompetensi`)

- `GET` - Ambil semua kategori dengan soal
- `POST` - Buat kategori baru
- `PUT` - Update kategori
- `DELETE` - Hapus kategori (cascade ke soal)

### Soal Kompetensi (`/api/admin/soal-kompetensi`)

- `POST` - Buat soal baru
- `PUT` - Update soal
- `DELETE` - Hapus soal

## Cara Penggunaan

### 1. Menambah Kategori Baru

1. Masuk ke admin panel → tab "Soal TKG"
2. Isi form "Tambah Kategori Baru"
3. Masukkan judul dan urutan tampil
4. Klik "Tambah Kategori"

### 2. Menambah Soal

1. Expand kategori yang diinginkan (klik chevron)
2. Isi form "Tambah Soal Baru"
3. Masukkan judul soal, URL, dan urutan
4. Klik "Tambah"

### 3. Edit/Hapus

- Gunakan icon Edit (pensil) untuk mengubah
- Gunakan icon Hapus (trash) untuk menghapus
- Konfirmasi akan muncul sebelum penghapusan

## Data Default

Sistem akan memuat data dari database. Jika database tidak tersedia atau error, akan menggunakan data fallback:

- Latihan Soal Safety (2 soal)
- Latihan Soal Operasional (2 soal)
- Latihan Soal Lainnya (kosong)

## Notes

- Sistem menggunakan UUID untuk ID
- Foreign key cascade: hapus kategori akan hapus semua soalnya
- Data diurutkan berdasarkan `display_order`
- URL soal bisa berupa link eksternal atau internal
- Responsive design untuk mobile dan desktop
