import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Create new soal induksi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kategori_induksi_id, title, href, display_order } = body;

    if (!kategori_induksi_id || !title || !href) {
      return NextResponse.json(
        { error: "Kategori ID, title, and href are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("soal_induksi")
      .insert([
        {
          kategori_induksi_id,
          title,
          href,
          display_order: display_order || 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating soal induksi:", error);
    return NextResponse.json(
      { error: "Failed to create soal induksi" },
      { status: 500 }
    );
  }
}

// PUT - Update soal induksi
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, href, display_order } = body;

    if (!id || !title || !href) {
      return NextResponse.json(
        { error: "ID, title, and href are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("soal_induksi")
      .update({
        title,
        href,
        display_order: display_order || 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating soal induksi:", error);
    return NextResponse.json(
      { error: "Failed to update soal induksi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete soal induksi
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("soal_induksi")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Soal induksi deleted successfully" });
  } catch (error) {
    console.error("Error deleting soal induksi:", error);
    return NextResponse.json(
      { error: "Failed to delete soal induksi" },
      { status: 500 }
    );
  }
}
