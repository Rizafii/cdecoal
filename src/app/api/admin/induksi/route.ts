import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface KategoriInduksi {
  id: string;
  title: string;
  minimal_nilai: number;
  display_order: number;
  soal_induksi?: SoalInduksi[];
}

export interface SoalInduksi {
  id: string;
  kategori_induksi_id: string;
  title: string;
  href: string;
  display_order: number;
}

// GET - Fetch semua kategori induksi dengan soal
export async function GET() {
  try {
    // Fetch kategori induksi dengan soal
    const { data: kategoriData, error: kategoriError } = await supabaseAdmin
      .from("kategori_induksi")
      .select(
        `
        *,
        soal_induksi (*)
      `
      )
      .order("display_order", { ascending: true });

    if (kategoriError) throw kategoriError;

    // Sort soal_induksi by display_order
    const sortedData = kategoriData?.map((kategori) => ({
      ...kategori,
      soal_induksi:
        kategori.soal_induksi?.sort(
          (a: any, b: any) => a.display_order - b.display_order
        ) || [],
    }));

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error("Error fetching induksi data:", error);
    return NextResponse.json(
      { error: "Failed to fetch induksi data" },
      { status: 500 }
    );
  }
}

// POST - Create new kategori induksi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, minimal_nilai, display_order } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("kategori_induksi")
      .insert([
        {
          title,
          minimal_nilai: minimal_nilai || 80,
          display_order: display_order || 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating kategori induksi:", error);
    return NextResponse.json(
      { error: "Failed to create kategori induksi" },
      { status: 500 }
    );
  }
}

// PUT - Update kategori induksi
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, minimal_nilai, display_order } = body;

    if (!id || !title) {
      return NextResponse.json(
        { error: "ID and title are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("kategori_induksi")
      .update({
        title,
        minimal_nilai: minimal_nilai || 80,
        display_order: display_order || 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating kategori induksi:", error);
    return NextResponse.json(
      { error: "Failed to update kategori induksi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete kategori induksi (akan cascade delete soal)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("kategori_induksi")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      message: "Kategori induksi deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting kategori induksi:", error);
    return NextResponse.json(
      { error: "Failed to delete kategori induksi" },
      { status: 500 }
    );
  }
}
