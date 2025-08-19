import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Create new simper soal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { simper_category_id, title, href, display_order } = body;

    if (!simper_category_id || !title || !href) {
      return NextResponse.json(
        { error: "Simper category ID, title, and href are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("simper_soal")
      .insert([
        {
          simper_category_id,
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
    console.error("Error creating simper soal:", error);
    return NextResponse.json(
      { error: "Failed to create simper soal" },
      { status: 500 }
    );
  }
}

// PUT - Update simper soal
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
      .from("simper_soal")
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
    console.error("Error updating simper soal:", error);
    return NextResponse.json(
      { error: "Failed to update simper soal" },
      { status: 500 }
    );
  }
}

// DELETE - Delete simper soal
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("simper_soal")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Simper soal deleted successfully" });
  } catch (error) {
    console.error("Error deleting simper soal:", error);
    return NextResponse.json(
      { error: "Failed to delete simper soal" },
      { status: 500 }
    );
  }
}
