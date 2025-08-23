import { supabase } from "./supabase";

export interface UploadResult {
  imageUrl: string;
  imagePath: string;
}

/**
 * Check if user has admin privileges
 * For now, this is a simple check but can be expanded with proper authentication
 */
function checkAdminAuth(): boolean {
  const adminPassword = localStorage.getItem("adminPassword") || 
                       process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 
                       "admin123";
  return Boolean(adminPassword);
}

/**
 * Upload file directly to Supabase storage (client-side)
 * @param file - File to upload
 * @param folder - Storage folder (e.g., 'galleries', 'site-images')
 * @param fileName - Custom filename (optional)
 * @returns Promise with upload result
 */
export async function uploadFileToSupabase(
  file: File,
  folder: string,
  fileName?: string
): Promise<UploadResult> {
  try {
    // Simple admin check
    if (!checkAdminAuth()) {
      throw new Error("Unauthorized access");
    }

    // Validasi file
    if (!file.type.startsWith("image/")) {
      throw new Error("File harus berupa gambar");
    }

    // Generate filename if not provided
    const fileExt = file.name.split(".").pop() || "jpg";
    const finalFileName = fileName || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${finalFileName}`;

    // Upload to Supabase Storage using regular client (not admin client)
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Gagal upload file: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return {
      imageUrl: urlData.publicUrl,
      imagePath: filePath,
    };
  } catch (error) {
    console.error("Error in uploadFileToSupabase:", error);
    throw error;
  }
}

/**
 * Delete file from Supabase storage
 * @param imagePath - Path of the image to delete
 */
export async function deleteFileFromSupabase(imagePath: string): Promise<void> {
  try {
    if (!checkAdminAuth()) {
      throw new Error("Unauthorized access");
    }

    const { error } = await supabase.storage
      .from("images")
      .remove([imagePath]);

    if (error) {
      console.error("Delete error:", error);
      throw new Error(`Gagal hapus file: ${error.message}`);
    }
  } catch (error) {
    console.error("Error in deleteFileFromSupabase:", error);
    throw error;
  }
}

/**
 * Upload site image (hero/about) directly to Supabase
 * @param file - Image file
 * @param type - Image type ('hero' or 'about')
 * @returns Promise with upload result
 */
export async function uploadSiteImage(
  file: File,
  type: "hero" | "about"
): Promise<UploadResult> {
  try {
    // Validasi file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Tipe file tidak valid. Hanya JPEG, JPG, dan PNG yang diizinkan");
    }

    // Batasi ukuran file (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error("Ukuran file terlalu besar. Maksimal 10MB");
    }

    // Check for existing image to delete later
    const { data: existingImage } = await supabase
      .from("site_images")
      .select("image_path")
      .eq("type", type)
      .single();

    // Generate unique filename
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    
    // Upload new image
    const uploadResult = await uploadFileToSupabase(file, "site-images", fileName);

    // Update database
    const { error: dbError } = await supabase.from("site_images").upsert(
      {
        type,
        image_url: uploadResult.imageUrl,
        image_path: uploadResult.imagePath,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "type",
      }
    );

    if (dbError) {
      // If database update fails, delete the uploaded file
      await deleteFileFromSupabase(uploadResult.imagePath);
      throw new Error(`Gagal update database: ${dbError.message}`);
    }

    // Delete old image from storage if exists
    if (existingImage?.image_path) {
      try {
        await deleteFileFromSupabase(existingImage.image_path);
      } catch (error) {
        console.warn("Failed to delete old image:", error);
        // Don't throw error here as the new image was already uploaded successfully
      }
    }

    return uploadResult;
  } catch (error) {
    console.error("Error in uploadSiteImage:", error);
    throw error;
  }
}

/**
 * Upload gallery image directly to Supabase and save to database
 * @param file - Image file
 * @param title - Gallery title
 * @returns Promise with upload result
 */
export async function uploadGalleryImage(
  file: File,
  title: string
): Promise<{ id: string; title: string; image_url: string; image_path: string }> {
  try {
    // Validasi file
    if (file.size > 5 * 1024 * 1024) { // 5MB
      throw new Error("Ukuran file harus kurang dari 5MB");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("File harus berupa gambar");
    }

    // Upload image
    const uploadResult = await uploadFileToSupabase(file, "galleries");

    // Save to database
    const { data, error: dbError } = await supabase
      .from("galleries")
      .insert({
        title,
        image_url: uploadResult.imageUrl,
        image_path: uploadResult.imagePath,
      })
      .select()
      .single();

    if (dbError) {
      // If database insert fails, delete the uploaded file
      await deleteFileFromSupabase(uploadResult.imagePath);
      throw new Error(`Gagal simpan ke database: ${dbError.message}`);
    }

    return {
      id: data.id,
      title: data.title,
      image_url: data.image_url,
      image_path: data.image_path,
    };
  } catch (error) {
    console.error("Error in uploadGalleryImage:", error);
    throw error;
  }
}
