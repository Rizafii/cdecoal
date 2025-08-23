"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Upload, Image as ImageIcon, X, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { uploadGalleryImage, deleteFileFromSupabase } from "@/lib/uploadUtils";

// Interface untuk Gallery
interface Gallery {
  id?: string;
  title: string;
  image_url: string;
  image_path?: string;
  created_at?: string;
  updated_at?: string;
}

export default function GalleryManager() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Get admin password from localStorage or prompt
  const getAdminPassword = () => {
    return (
      localStorage.getItem("adminPassword") ||
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      "admin123"
    );
  };

  // Fetch galleries dari API
  const fetchGalleries = async () => {
    try {
      const response = await fetch("/api/admin/galleries", {
        headers: {
          "x-admin-password": getAdminPassword(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch galleries");
      }

      const result = await response.json();
      setGalleries(result.data || []);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal memuat data gallery",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Tambah gallery baru
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      Swal.fire({
        title: "Peringatan!",
        text: "Mohon lengkapi semua field",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload image directly to Supabase and save to database
      const newGallery = await uploadGalleryImage(
        formData.image,
        formData.title
      );

      await Swal.fire({
        title: "Berhasil!",
        text: "Gallery berhasil ditambahkan!",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({ title: "", image: null });
      setPreviewUrl(null);
      setShowAddForm(false);
      fetchGalleries();
    } catch (error) {
      console.error("Error adding gallery:", error);
      Swal.fire({
        title: "Error!",
        text:
          error instanceof Error ? error.message : "Gagal menambahkan gallery",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Hapus gallery
  const handleDeleteGallery = async (id: string) => {
    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus gallery ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      // Find the gallery to get its image_path
      const galleryToDelete = galleries.find((g) => g.id === id);

      // Delete from database first
      const response = await fetch(`/api/admin/galleries?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": getAdminPassword(),
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete gallery");
      }

      // Delete file from storage if image_path exists
      if (galleryToDelete?.image_path) {
        try {
          await deleteFileFromSupabase(galleryToDelete.image_path);
        } catch (storageError) {
          console.warn("Failed to delete file from storage:", storageError);
          // Don't throw error here as database deletion was successful
        }
      }

      await Swal.fire({
        title: "Berhasil!",
        text: "Gallery berhasil dihapus!",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
      });

      fetchGalleries();
    } catch (error) {
      console.error("Error deleting gallery:", error);
      Swal.fire({
        title: "Error!",
        text:
          error instanceof Error ? error.message : "Gagal menghapus gallery",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        Swal.fire({
          title: "File Terlalu Besar!",
          text: "Ukuran file maksimal 5MB",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          title: "Format File Salah!",
          text: "File harus berupa gambar (JPG, PNG, GIF)",
          icon: "warning",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Kelola Galeri
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Kelola foto-foto galeri website
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="sm:inline">Tambah Galeri</span>
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Tambah Galeri Baru
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Upload foto baru ke galeri
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setPreviewUrl(null);
                  setFormData({ title: "", image: null });
                }}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGallery} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Judul Galeri
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan judul galeri"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Gambar
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="space-y-3">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md"
                        />
                        <p className="text-sm text-green-600 font-medium">
                          {formData.image?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Klik untuk ganti gambar
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">
                          Klik untuk upload gambar
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Maksimal 5MB (JPG, PNG, GIF)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setPreviewUrl(null);
                    setFormData({ title: "", image: null });
                  }}
                  className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {galleries.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada galeri
          </h3>
          <p className="text-gray-500">
            Mulai dengan menambahkan foto pertama ke galeri
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={gallery.image_url}
                  alt={gallery.title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => window.open(gallery.image_url, "_blank")}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                  {gallery.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {new Date(gallery.created_at || "").toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <button
                    onClick={() => handleDeleteGallery(gallery.id!)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 sm:p-2 rounded-lg transition-all duration-200"
                    title="Hapus galeri"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
