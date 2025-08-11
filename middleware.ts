import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Untuk development, skip semua pembatasan PDF
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // Proteksi untuk file PDF di folder training (hanya untuk production)
  if (pathname.startsWith("/training/") && pathname.endsWith(".pdf")) {
    const referer = request.headers.get("referer");
    const host = request.headers.get("host");

    // Jika ada referer dari domain yang sama, izinkan
    if (referer && referer.includes(host || "")) {
      const response = NextResponse.next();
      response.headers.set("X-Content-Type-Options", "nosniff");
      return response;
    }

    // Jika tidak memenuhi kondisi, blokir
    return new NextResponse("Unauthorized", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/training/:path*.pdf"],
};
