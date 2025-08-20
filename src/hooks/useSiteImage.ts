"use client";

import { useState, useEffect } from "react";

interface SiteImage {
  id: string;
  type: string;
  image_url: string;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export function useSiteImage(type: "hero" | "about") {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImage = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // No need for admin header on GET request - it should be public
      const response = await fetch(`/api/admin/images?type=${type}`);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const data = await response.json();

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        // Fallback ke gambar default jika tidak ada di database
        setImageUrl(type === "hero" ? "/hero.jpg" : "/about.jpg");
      }
    } catch (err) {
      console.error(`Error fetching ${type} image:`, err);
      setError(err instanceof Error ? err.message : "Unknown error");
      // Fallback ke gambar default jika ada error
      setImageUrl(type === "hero" ? "/hero.jpg" : "/about.jpg");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [type]);

  // Function untuk refresh gambar (dipanggil setelah upload)
  const refreshImage = () => {
    fetchImage();
  };

  return { imageUrl, isLoading, error, refreshImage };
}
