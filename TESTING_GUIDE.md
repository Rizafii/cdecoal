# Testing Guide for Direct Upload Implementation

## Test Cases for Image Upload

### 1. Hero Image Upload (Large Files)
- **Tujuan**: Test upload gambar hero berukuran besar (>6MB)
- **Steps**:
  1. Login ke admin panel
  2. Pilih tab "Kelola Gambar"
  3. Upload gambar hero dengan ukuran 6-10MB
  4. Verify upload berhasil tanpa error 413
  5. Check gambar muncul di halaman utama

### 2. About Image Upload (Large Files)
- **Tujuan**: Test upload gambar about berukuran besar (>6MB)
- **Steps**:
  1. Login ke admin panel
  2. Pilih tab "Kelola Gambar"
  3. Upload gambar about dengan ukuran 6-10MB
  4. Verify upload berhasil tanpa error 413
  5. Check gambar muncul di halaman about

### 3. Gallery Image Upload
- **Tujuan**: Test upload gambar galeri
- **Steps**:
  1. Login ke admin panel
  2. Pilih tab "Galeri"
  3. Tambah gambar baru dengan judul
  4. Upload gambar dengan ukuran <5MB
  5. Verify gambar muncul di galeri

### 4. Large Gallery Image Upload
- **Tujuan**: Test upload gambar galeri berukuran besar
- **Steps**:
  1. Login ke admin panel
  2. Pilih tab "Galeri"
  3. Coba upload gambar >5MB
  4. Verify muncul error message "Ukuran file harus kurang dari 5MB"

### 5. Gallery Image Delete
- **Tujuan**: Test hapus gambar galeri
- **Steps**:
  1. Login ke admin panel
  2. Pilih tab "Galeri"
  3. Hapus salah satu gambar galeri
  4. Verify gambar terhapus dari database dan storage

## Expected Results

### Before Implementation (Old Behavior)
- ❌ Upload gambar 6MB gagal dengan error 413 Content Too Large
- ❌ Request URL: https://cdecoal.vercel.app/api/admin/images
- ❌ Status Code: 413

### After Implementation (New Behavior)
- ✅ Upload gambar 6-10MB berhasil tanpa error
- ✅ File langsung upload ke Supabase Storage
- ✅ Database ter-update dengan URL gambar baru
- ✅ Gambar lama terhapus otomatis dari storage
- ✅ Error handling yang lebih baik dengan pesan yang jelas

## Error Scenarios to Test

### 1. Invalid File Types
- Upload file non-image (PDF, DOCX, etc.)
- Expected: Error "File harus berupa gambar"

### 2. File Size Limits
- Upload gambar >10MB untuk site images
- Expected: Error "Ukuran file terlalu besar. Maksimal 10MB"
- Upload gambar >5MB untuk gallery
- Expected: Error "Ukuran file harus kurang dari 5MB"

### 3. Network Issues
- Test dengan koneksi internet lambat
- Expected: Upload progress indicator, proper error handling

### 4. Authentication Issues
- Test tanpa admin authentication
- Expected: Error "Unauthorized access"

## Verification Checklist

- [ ] No more 413 Content Too Large errors
- [ ] Large images (6-10MB) upload successfully
- [ ] Database properly updated with new image URLs
- [ ] Old images automatically deleted from storage
- [ ] Gallery images upload and delete properly
- [ ] Error messages are user-friendly
- [ ] File type validation works
- [ ] File size validation works
- [ ] Network browser console shows no JavaScript errors
- [ ] Images display correctly on frontend

## Performance Comparison

### Before (API Route Upload)
- Request limit: ~4.5MB (Vercel limit)
- Workflow: Client → API Route → Supabase Storage
- Potential failures: API route timeout, size limits

### After (Direct Upload)
- Request limit: 50MB (Supabase default)
- Workflow: Client → Supabase Storage (direct)
- Benefits: Faster uploads, no intermediate API, better reliability

## Monitoring

### Check Supabase Dashboard
1. Go to Supabase Storage dashboard
2. Verify files are being uploaded to correct buckets:
   - `images/site-images/` for hero/about images
   - `images/galleries/` for gallery images
3. Check file sizes and URLs

### Check Database
1. Verify `site_images` table updates correctly
2. Verify `galleries` table gets new entries
3. Check `image_url` and `image_path` fields are populated

### Browser Developer Tools
1. Network tab: No failed requests to `/api/admin/images` (POST)
2. Console: No JavaScript errors
3. Application tab: Check localStorage for admin auth

## Rollback Plan

If issues occur, revert to API route uploads by:
1. Restore original `ImageManager.tsx` and `GalleryManager.tsx`
2. Remove `uploadUtils.ts`
3. Keep API routes as backup
4. Deploy previous version

## Success Criteria

✅ **Primary Goal**: Upload gambar 6MB+ berhasil tanpa error 413
✅ **Secondary Goals**:
- Better user experience with direct uploads
- Proper error handling and validation
- Automatic cleanup of old files
- Maintained security and authentication
