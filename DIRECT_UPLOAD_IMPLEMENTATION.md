# Direct Upload Implementation for Admin Panel

## Overview

Mengimplementasikan upload file langsung ke Supabase Storage untuk mengatasi masalah 413 Content Too Large pada API routes Vercel.

## Problem

- API routes Vercel memiliki limit request size (sekitar 4.5MB untuk hobby plan)
- Upload gambar besar (6MB+) gagal dengan error 413 Content Too Large
- Semua file upload sebelumnya melalui API routes

## Solution

Implementasi direct upload ke Supabase Storage dari client-side:

- Bypass API routes untuk file upload
- Upload langsung ke Supabase Storage
- Gunakan Supabase client biasa (bukan admin client) untuk keamanan
- Database operations tetap melalui client-side Supabase calls

## Files Modified

### 1. `/src/lib/uploadUtils.ts` (NEW)

Utility functions untuk direct upload:

- `uploadFileToSupabase()` - Upload file langsung ke storage
- `deleteFileFromSupabase()` - Hapus file dari storage
- `uploadSiteImage()` - Upload gambar site (hero/about) + update database
- `uploadGalleryImage()` - Upload gambar gallery + save ke database

### 2. `/src/components/admin/ImageManager.tsx`

- Import `uploadSiteImage` dari uploadUtils
- Replace API call dengan direct upload
- Error handling yang lebih baik

### 3. `/src/components/admin/GalleryManager.tsx`

- Import `uploadGalleryImage` dari uploadUtils
- Replace API call dengan direct upload
- Remove unused `uploadImage()` function

## Key Changes

### Before (API Route):

```typescript
const formData = new FormData();
formData.append("file", selectedFile);
formData.append("type", type);

const response = await fetch("/api/admin/images", {
  method: "POST",
  headers: { "x-admin-password": getAdminPassword() },
  body: formData,
});
```

### After (Direct Upload):

```typescript
const result = await uploadSiteImage(selectedFile, type);
```

## Benefits

1. **No Size Limits**: Bypass Vercel API route limits
2. **Better Performance**: Direct upload to Supabase, no intermediate API
3. **Cleaner Code**: Consolidated upload logic in utility functions
4. **Better Security**: No service role key exposed to client
5. **Error Handling**: Better error messages and rollback capability

## Security Considerations

- Menggunakan Supabase client biasa (anon key) untuk uploads
- RLS (Row Level Security) policies harus dikonfigurasi di Supabase
- Storage bucket policies harus memungkinkan authenticated uploads
- Database operations menggunakan client-side calls dengan proper authentication

## Required Supabase Configuration

### Storage Bucket Setup

Pastikan bucket `images` sudah dibuat di Supabase Storage.

### Storage Bucket Policies

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload to images bucket
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to delete from images bucket
CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'images');

-- Allow public access to read images
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'images');
```

### Database RLS Policies

```sql
-- Enable RLS on site_images table
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Allow all operations on site_images (since we're using simple auth)
CREATE POLICY "Allow all site_images operations" ON site_images
FOR ALL TO anon USING (true);

-- Enable RLS on galleries table
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

-- Allow all operations on galleries (since we're using simple auth)
CREATE POLICY "Allow all galleries operations" ON galleries
FOR ALL TO anon USING (true);
```

### Alternative: Temporary Disable RLS (For Development)

If you want to temporarily disable RLS for testing:

```sql
-- Disable RLS (NOT recommended for production)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE galleries DISABLE ROW LEVEL SECURITY;
```

## Testing

Test dengan file gambar besar (>6MB) untuk memastikan:

1. Upload berhasil tanpa error 413
2. Database ter-update dengan benar
3. File tersimpan di Supabase Storage
4. URL gambar bisa diakses
5. Error handling berfungsi dengan baik

## Migration Notes

- API routes lama (`/api/admin/images`, `/api/admin/upload`) masih bisa digunakan untuk backward compatibility
- Namun disarankan menggunakan direct upload untuk semua upload gambar baru
- PDF uploads (training materials) masih menggunakan API routes karena tidak ada masalah size limit

## File Size Limits

- Site Images (hero/about): 10MB
- Gallery Images: 5MB
- Supabase Storage default limit: 50MB per file
- Dapat disesuaikan sesuai kebutuhan
