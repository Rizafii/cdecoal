import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export interface SoalKompetensi {
  id: string;
  kategori_kompetensi_id: string;
  title: string;
  href: string;
  display_order: number;
}

// POST - Create soal kompetensi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kategori_kompetensi_id, title, href, display_order } = body;

    const { data, error } = await supabaseAdmin
      .from("soal_kompetensi")
      .insert([{ kategori_kompetensi_id, title, href, display_order }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating soal kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to create soal kompetensi" },
      { status: 500 }
    );
  }
}

// PUT - Update soal kompetensi
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, href, display_order } = body;

    const { data, error } = await supabaseAdmin
      .from("soal_kompetensi")
      .update({ title, href, display_order })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating soal kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to update soal kompetensi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete soal kompetensi
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("soal_kompetensi")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting soal kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to delete soal kompetensi" },
      { status: 500 }
    );
  }
}
