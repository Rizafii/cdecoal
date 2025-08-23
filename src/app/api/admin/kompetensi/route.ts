import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export interface KategoriKompetensi {
  id: string;
  title: string;
  display_order: number;
  soal_kompetensi?: SoalKompetensi[];
}

export interface SoalKompetensi {
  id: string;
  kategori_kompetensi_id: string;
  title: string;
  href: string;
  display_order: number;
}

// GET - Fetch semua kategori kompetensi dengan soal
export async function GET() {
  try {
    // Fetch kategori kompetensi dengan soal
    const { data: kategoriData, error: kategoriError } = await supabaseAdmin
      .from("kategori_kompetensi")
      .select(
        `
        *,
        soal_kompetensi (*)
      `
      )
      .order("display_order", { ascending: true });

    if (kategoriError) throw kategoriError;

    // Sort soal_kompetensi by display_order
    const sortedData = kategoriData?.map((kategori) => ({
      ...kategori,
      soal_kompetensi:
        kategori.soal_kompetensi?.sort(
          (a: any, b: any) => a.display_order - b.display_order
        ) || [],
    }));

    return NextResponse.json(sortedData || []);
  } catch (error) {
    console.error("Error fetching kategori kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to fetch kategori kompetensi" },
      { status: 500 }
    );
  }
}

// POST - Create kategori kompetensi
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, display_order } = body;

    const { data, error } = await supabaseAdmin
      .from("kategori_kompetensi")
      .insert([{ title, display_order }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating kategori kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to create kategori kompetensi" },
      { status: 500 }
    );
  }
}

// PUT - Update kategori kompetensi
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, display_order } = body;

    const { data, error } = await supabaseAdmin
      .from("kategori_kompetensi")
      .update({ title, display_order })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating kategori kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to update kategori kompetensi" },
      { status: 500 }
    );
  }
}

// DELETE - Delete kategori kompetensi
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // First delete all soal_kompetensi related to this kategori
    await supabaseAdmin
      .from("soal_kompetensi")
      .delete()
      .eq("kategori_kompetensi_id", id);

    // Then delete the kategori
    const { error } = await supabaseAdmin
      .from("kategori_kompetensi")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting kategori kompetensi:", error);
    return NextResponse.json(
      { error: "Failed to delete kategori kompetensi" },
      { status: 500 }
    );
  }
}
