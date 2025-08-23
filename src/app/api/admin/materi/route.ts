import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Create new materi item
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const training_unit_id = formData.get("training_unit_id") as string;
    const title = formData.get("title") as string;
    const href = formData.get("href") as string;
    const display_order =
      parseInt(formData.get("display_order") as string) || 0;
    const file = formData.get("file") as File | null;

    if (!training_unit_id || !title) {
      return NextResponse.json(
        { error: "Training unit ID and title are required" },
        { status: 400 }
      );
    }

    let filePath = null;
    let finalHref = href;

    // Upload file jika ada
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `materi-${Date.now()}.${fileExt}`;
      const uploadPath = `training/${fileName}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("images")
        .upload(uploadPath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicData } = supabaseAdmin.storage
        .from("images")
        .getPublicUrl(uploadPath);

      filePath = uploadPath;
      finalHref = publicData.publicUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("materi_items")
      .insert([
        {
          training_unit_id,
          title,
          href: finalHref || "#",
          file_path: filePath,
          display_order,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating materi item:", error);
    return NextResponse.json(
      { error: "Failed to create materi item" },
      { status: 500 }
    );
  }
}

// PUT - Update materi item
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const href = formData.get("href") as string;
    const display_order =
      parseInt(formData.get("display_order") as string) || 0;
    const file = formData.get("file") as File | null;

    if (!id || !title) {
      return NextResponse.json(
        { error: "ID and title are required" },
        { status: 400 }
      );
    }

    // Get existing data
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("materi_items")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    let filePath = existing.file_path;
    let finalHref = href;

    // Upload new file if provided
    if (file) {
      // Delete old file if exists
      if (existing.file_path) {
        await supabaseAdmin.storage.from("images").remove([existing.file_path]);
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `materi-${Date.now()}.${fileExt}`;
      const uploadPath = `training/${fileName}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("images")
        .upload(uploadPath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicData } = supabaseAdmin.storage
        .from("images")
        .getPublicUrl(uploadPath);

      filePath = uploadPath;
      finalHref = publicData.publicUrl;
    }

    const { data, error } = await supabaseAdmin
      .from("materi_items")
      .update({
        title,
        href: finalHref || existing.href,
        file_path: filePath,
        display_order,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating materi item:", error);
    return NextResponse.json(
      { error: "Failed to update materi item" },
      { status: 500 }
    );
  }
}

// DELETE - Delete materi item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Get existing data to delete file
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("materi_items")
      .select("file_path")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete file from storage if exists
    if (existing.file_path) {
      await supabaseAdmin.storage.from("images").remove([existing.file_path]);
    }

    const { error } = await supabaseAdmin
      .from("materi_items")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Materi item deleted successfully" });
  } catch (error) {
    console.error("Error deleting materi item:", error);
    return NextResponse.json(
      { error: "Failed to delete materi item" },
      { status: 500 }
    );
  }
}
