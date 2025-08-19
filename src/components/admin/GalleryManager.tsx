"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Upload, Image as ImageIcon, X } from "lucide-react";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setError("Gagal memuat data gallery");
    } finally {
      setIsLoading(false);
    }
  };

  // Upload gambar ke API
  const uploadImage = async (
    file: File
  ): Promise<{ image_url: string; image_path: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      headers: {
        "x-admin-password": getAdminPassword(),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }

    return await response.json();
  };

  // Tambah gallery baru
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      setError("Mohon lengkapi semua field");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Upload gambar
      const { image_url, image_path } = await uploadImage(formData.image);

      // Simpan ke database melalui API
      const response = await fetch("/api/admin/galleries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": getAdminPassword(),
        },
        body: JSON.stringify({
          title: formData.title,
          image_url,
          image_path,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add gallery");
      }

      setSuccess("Gallery berhasil ditambahkan!");
      setFormData({ title: "", image: null });
      setShowAddForm(false);
      fetchGalleries();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding gallery:", error);
      setError(`Gagal menambahkan gallery: ${error}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Hapus gallery
  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus gallery ini?")) return;

    try {
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

      setSuccess("Gallery berhasil dihapus!");
      fetchGalleries();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error deleting gallery:", error);
      setError(`Gagal menghapus gallery: ${error}`);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Ukuran file maksimal 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setError("");
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Kelola Gallery</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Gallery
        </button>
      </div>

      {/* Error & Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tambah Gallery Baru</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGallery} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Gallery
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul gallery"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.image
                        ? formData.image.name
                        : "Klik untuk upload gambar"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Maksimal 5MB (JPG, PNG, GIF)
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isUploading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {galleries.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada gallery yang ditambahkan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <img
                src={gallery.image_url}
                alt={gallery.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {gallery.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {new Date(gallery.created_at || "").toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                  <button
                    onClick={() => handleDeleteGallery(gallery.id!)}
                    className="text-red-600 hover:text-red-700 transition-colors"
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
