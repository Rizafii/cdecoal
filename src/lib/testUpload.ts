// Test file to verify direct upload implementation
// This can be run in browser console to test upload functionality

async function testDirectUpload() {
  console.log("🚀 Testing direct upload implementation...");

  // Check if supabaseAdmin is available
  if (typeof window !== "undefined") {
    console.log("✅ Running in browser environment");

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    console.log("🔗 Supabase URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
    console.log(
      "🔑 Service Role Key:",
      serviceRoleKey ? "✅ Set" : "❌ Missing"
    );

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("❌ Missing required environment variables");
      return;
    }

    // Test admin auth
    const adminPassword =
      localStorage.getItem("adminPassword") ||
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      "admin123";
    console.log(
      "🔐 Admin auth:",
      adminPassword ? "✅ Available" : "❌ Missing"
    );

    console.log("✅ All checks passed! Ready to test uploads.");
    console.log("📝 To test:");
    console.log("1. Go to admin panel");
    console.log("2. Try uploading a large image (>6MB)");
    console.log("3. Check browser console for any errors");
    console.log("4. Verify image appears correctly");
  } else {
    console.log("❌ Not in browser environment");
  }
}

// Auto-run if in browser
if (typeof window !== "undefined") {
  testDirectUpload();
}

export default testDirectUpload;
