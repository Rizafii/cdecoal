import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin client dengan service role key untuk bypass RLS
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

// GET - Ambil semua galleries
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("galleries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}

// POST - Tambah gallery baru
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, image_url, image_path } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { error: "Title and image_url are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("galleries")
      .insert([{ title, image_url, image_path }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error adding gallery:", error);
    return NextResponse.json(
      { error: "Failed to add gallery" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus gallery
export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("galleries")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery" },
      { status: 500 }
    );
  }
}
