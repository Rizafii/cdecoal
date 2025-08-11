import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Untuk development, minimal headers
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/training/:path*.pdf",
          headers: [
            {
              key: "Content-Type",
              value: "application/pdf",
            },
          ],
        },
      ];
    }

    // Untuk production, headers keamanan penuh
    return [
      {
        source: "/training/:path*.pdf",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
