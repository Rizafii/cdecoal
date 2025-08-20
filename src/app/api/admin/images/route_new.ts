import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin client dengan service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Verifikasi admin password
function verifyAdmin(request: NextRequest) {
  const adminPassword = request.headers.get("x-admin-password");
  const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
  return adminPassword === expectedPassword;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type || !["hero", "about"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    // Get image data from database
    const { data, error } = await supabaseAdmin
      .from("site_images")
      .select("*")
      .eq("type", type)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({
        imageUrl: null,
        message: "Image not found",
      });
    }

    return NextResponse.json({
      imageUrl: data.image_url,
      imagePath: data.image_path,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!type || !["hero", "about"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    // Validasi file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, JPG, and PNG are allowed" },
        { status: 400 }
      );
    }

    // Batasi ukuran file (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum 10MB allowed" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `site-images/${fileName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Check if there's an existing image to delete
    const { data: existingImage } = await supabaseAdmin
      .from("site_images")
      .select("image_path")
      .eq("type", type)
      .single();

    // Upload new image to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
        duplex: "half",
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from("images")
      .getPublicUrl(filePath);

    // Delete old image from storage if exists
    if (existingImage?.image_path) {
      await supabaseAdmin.storage
        .from("images")
        .remove([existingImage.image_path]);
    }

    // Update or insert image record in database
    const { error: dbError } = await supabaseAdmin.from("site_images").upsert(
      {
        type,
        image_url: urlData.publicUrl,
        image_path: filePath,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "type",
      }
    );

    if (dbError) throw dbError;

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: urlData.publicUrl,
      imagePath: filePath,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
