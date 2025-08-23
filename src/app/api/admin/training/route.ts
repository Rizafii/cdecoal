import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export interface TrainingUnit {
  id: string;
  title: string;
  href?: string;
  file_path?: string;
  display_order: number;
  materi_items?: MateriItem[];
}

export interface MateriItem {
  id: string;
  training_unit_id: string;
  title: string;
  href: string;
  file_path?: string;
  display_order: number;
}

// GET - Fetch semua training units dengan materi items
export async function GET() {
  try {
    // Fetch training units dengan materi items
    const { data: trainingUnits, error: unitsError } = await supabaseAdmin
      .from("training_units")
      .select(
        `
        *,
        materi_items (*)
      `
      )
      .order("display_order", { ascending: true });

    if (unitsError) throw unitsError;

    // Sort materi_items by display_order
    const sortedData = trainingUnits?.map((unit) => ({
      ...unit,
      materi_items:
        unit.materi_items?.sort(
          (a: any, b: any) => a.display_order - b.display_order
        ) || [],
    }));

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error("Error fetching training data:", error);
    return NextResponse.json(
      { error: "Failed to fetch training data" },
      { status: 500 }
    );
  }
}

// POST - Create new training unit
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const href = formData.get("href") as string;
    const display_order =
      parseInt(formData.get("display_order") as string) || 0;
    const file = formData.get("file") as File | null;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let filePath = null;
    let finalHref = href;

    // Upload file jika ada
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `training-${Date.now()}.${fileExt}`;
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
      .from("training_units")
      .insert([
        {
          title,
          href: finalHref || null,
          file_path: filePath,
          display_order,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating training unit:", error);
    return NextResponse.json(
      { error: "Failed to create training unit" },
      { status: 500 }
    );
  }
}

// PUT - Update training unit
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
      .from("training_units")
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
      const fileName = `training-${Date.now()}.${fileExt}`;
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
      .from("training_units")
      .update({
        title,
        href: finalHref || null,
        file_path: filePath,
        display_order,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating training unit:", error);
    return NextResponse.json(
      { error: "Failed to update training unit" },
      { status: 500 }
    );
  }
}

// DELETE - Delete training unit (akan cascade delete materi items)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Get existing data to delete file
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("training_units")
      .select("file_path")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete file from storage if exists
    if (existing.file_path) {
      await supabaseAdmin.storage.from("images").remove([existing.file_path]);
    }

    const { error } = await supabaseAdmin
      .from("training_units")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Training unit deleted successfully" });
  } catch (error) {
    console.error("Error deleting training unit:", error);
    return NextResponse.json(
      { error: "Failed to delete training unit" },
      { status: 500 }
    );
  }
}
