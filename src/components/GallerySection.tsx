"use client";

import React, { useState, useEffect } from "react";
import { supabase, Gallery } from "@/lib/supabase";
import { X } from "lucide-react";

export default function GallerySection() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

  // Fetch galleries dari database
  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGalleries(data || []);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-lg text-gray-600">
              Dokumentasi kegiatan dan fasilitas kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
                <div className="mt-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600">
            Dokumentasi kegiatan dan fasilitas kami
          </p>
        </div>

        {galleries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada gallery yang tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(gallery)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={gallery.image_url}
                    alt={gallery.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-medium text-lg">
                      {gallery.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal untuk preview gambar */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h3 className="text-white text-xl font-medium">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
