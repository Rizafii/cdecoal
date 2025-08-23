import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export interface SimperCategory {
  id: string;
  kategori: string;
  unit: string;
  minimal_nilai: number;
  display_order: number;
  simper_soal?: SimperSoal[];
}

export interface SimperSoal {
  id: string;
  simper_category_id: string;
  title: string;
  href: string;
  display_order: number;
}

// GET - Fetch semua simper categories dengan soal
export async function GET() {
  try {
    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from("simper_categories")
      .select(
        `
        *,
        simper_soal (*)
      `
      )
      .order("display_order", { ascending: true });

    if (categoriesError) throw categoriesError;

    // Sort soal by display_order
    const sortedData = categories?.map((category) => ({
      ...category,
      simper_soal:
        category.simper_soal?.sort(
          (a: any, b: any) => a.display_order - b.display_order
        ) || [],
    }));

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error("Error fetching simper data:", error);
    return NextResponse.json(
      { error: "Failed to fetch simper data" },
      { status: 500 }
    );
  }
}

// POST - Create new simper category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kategori, unit, minimal_nilai, display_order } = body;

    if (!kategori || !unit) {
      return NextResponse.json(
        { error: "Kategori and unit are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("simper_categories")
      .insert([
        {
          kategori,
          unit,
          minimal_nilai: minimal_nilai || 80,
          display_order: display_order || 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating simper category:", error);
    return NextResponse.json(
      { error: "Failed to create simper category" },
      { status: 500 }
    );
  }
}

// PUT - Update simper category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, kategori, unit, minimal_nilai, display_order } = body;

    if (!id || !kategori || !unit) {
      return NextResponse.json(
        { error: "ID, kategori, and unit are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("simper_categories")
      .update({
        kategori,
        unit,
        minimal_nilai: minimal_nilai || 80,
        display_order: display_order || 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating simper category:", error);
    return NextResponse.json(
      { error: "Failed to update simper category" },
      { status: 500 }
    );
  }
}

// DELETE - Delete simper category (akan cascade delete soal)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("simper_categories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({
      message: "Simper category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting simper category:", error);
    return NextResponse.json(
      { error: "Failed to delete simper category" },
      { status: 500 }
    );
  }
}
