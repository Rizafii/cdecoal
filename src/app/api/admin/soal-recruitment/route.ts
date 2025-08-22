import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase client dengan service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Create new soal recruitment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, href, display_order, kategori_recruitment_id } = body;

    if (!title || !href || !kategori_recruitment_id) {
      return NextResponse.json(
        { error: "Title, href, and kategori_recruitment_id are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("soal_recruitment")
      .insert([
        {
          title,
          href,
          display_order: display_order || 0,
          kategori_recruitment_id,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating soal recruitment:", error);
    return NextResponse.json(
      { error: "Failed to create soal recruitment" },
      { status: 500 }
    );
  }
}

// PUT - Update soal recruitment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, href, display_order, kategori_recruitment_id } = body;

    if (!id || !title || !href || !kategori_recruitment_id) {
      return NextResponse.json(
        { error: "ID, title, href, and kategori_recruitment_id are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("soal_recruitment")
      .update({
        title,
        href,
        display_order: display_order || 0,
        kategori_recruitment_id,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating soal recruitment:", error);
    return NextResponse.json(
      { error: "Failed to update soal recruitment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete soal recruitment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("soal_recruitment")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      message: "Soal recruitment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting soal recruitment:", error);
    return NextResponse.json(
      { error: "Failed to delete soal recruitment" },
      { status: 500 }
    );
  }
}
