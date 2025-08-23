import { createClient } from "@supabase/supabase-js";

// Konfigurasi Supabase - pastikan untuk mengganti dengan URL dan API Key yang benar
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "your-supabase-url";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-supabase-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client dengan service role (untuk bypass RLS)
const supabaseServiceKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key";
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Tipe untuk Gallery
export interface Gallery {
  id?: string;
  title: string;
  image_url: string;
  image_path?: string;
  created_at?: string;
  updated_at?: string;
}
