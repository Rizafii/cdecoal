import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin client dengan service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

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

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validasi file
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `galleries/${fileName}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload ke Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("images")
      .upload(filePath, buffer, {
        contentType: file.type,
        duplex: "half",
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabaseAdmin.storage
      .from("images")
      .getPublicUrl(filePath);

    return NextResponse.json({
      image_url: data.publicUrl,
      image_path: filePath,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
