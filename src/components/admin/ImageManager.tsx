"use client";

import React, { useState, useEffect } from "react";
import { Upload, Save, Image as ImageIcon, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { uploadSiteImage } from "@/lib/uploadUtils";

interface ImageManagerProps {
  type: "hero" | "about";
  title: string;
  description: string;
}

export default function ImageManager({
  type,
  title,
  description,
}: ImageManagerProps) {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get admin password
  const getAdminPassword = () => {
    return (
      localStorage.getItem("adminPassword") ||
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      "admin123"
    );
  };

  // Mendapatkan gambar saat ini
  useEffect(() => {
    fetchCurrentImage();
  }, [type]);

  const fetchCurrentImage = async () => {
    try {
      // GET request is now public, no admin auth needed
      const response = await fetch(`/api/admin/images?type=${type}`);
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setCurrentImage(data.imageUrl);
        } else {
          setCurrentImage(getDefaultImage());
        }
      } else {
        setCurrentImage(getDefaultImage());
      }
    } catch (error) {
      console.error("Error fetching current image:", error);
      setCurrentImage(getDefaultImage());
    } finally {
      setIsInitialized(true);
    }
  };

  const getDefaultImage = () => {
    const timestamp = new Date().getTime();
    return type === "hero"
      ? `/hero.jpg?v=${timestamp}`
      : `/about.jpg?v=${timestamp}`;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        title: "Error",
        text: "Silakan pilih file gambar terlebih dahulu",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Upload directly to Supabase storage
      const result = await uploadSiteImage(selectedFile, type);
      
      const timestamp = new Date().getTime();
      setCurrentImage(`${result.imageUrl}?v=${timestamp}`);
      setSelectedFile(null);
      setPreviewUrl("");

      Swal.fire({
        title: "Berhasil!",
        text: `Gambar ${
          type === "hero" ? "Hero" : "About"
        } berhasil diupload. Perubahan akan terlihat setelah refresh halaman.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Refresh Halaman",
        cancelButtonText: "OK",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      // Refresh current image preview
      fetchCurrentImage();
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Gagal mengupload gambar",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePreview = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {/* Gambar Saat Ini */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Gambar Saat Ini
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {!isInitialized ? (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-gray-500">Memuat gambar...</p>
              </div>
            </div>
          ) : currentImage ? (
            <img
              src={currentImage}
              alt={`Current ${type} image`}
              className="w-full h-48 object-cover rounded-lg"
              onError={() => {
                console.warn(`Failed to load image: ${currentImage}`);
                setCurrentImage("");
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Tidak ada gambar</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Upload Gambar Baru
        </h3>

        {!previewUrl ? (
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Klik untuk memilih gambar</p>
            <p className="text-sm text-gray-500">PNG, JPG, JPEG hingga 10MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-blue-200"
            />
            <button
              onClick={handleRemovePreview}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {selectedFile && (
        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isLoading ? "Mengupload..." : "Simpan Gambar"}
          </button>

          <button
            onClick={handleRemovePreview}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
}
