"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  FileText,
} from "lucide-react";
import Swal from "sweetalert2";

interface KategoriKompetensi {
  id: string;
  title: string;
  display_order: number;
  soal_kompetensi?: SoalKompetensi[];
}

interface SoalKompetensi {
  id: string;
  kategori_kompetensi_id: string;
  title: string;
  href: string;
  display_order: number;
}

export default function KompetensiManager() {
  const [kategoriList, setKategoriList] = useState<KategoriKompetensi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingKategori, setEditingKategori] = useState<string | null>(null);
  const [editingSoal, setEditingSoal] = useState<string | null>(null);
  const [expandedKategori, setExpandedKategori] = useState<Set<string>>(
    new Set()
  );

  // Form states
  const [kategoriForm, setKategoriForm] = useState({
    title: "",
    display_order: 0,
  });

  const [soalForm, setSoalForm] = useState({
    title: "",
    href: "",
    display_order: 0,
    kategori_kompetensi_id: "",
  });

  // Fetch kompetensi data
  const fetchKompetensiData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/kompetensi");
      if (!response.ok) throw new Error("Failed to fetch kompetensi data");

      const data = await response.json();
      setKategoriList(data);
    } catch (error) {
      console.error("Error fetching kompetensi data:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal memuat data kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKompetensiData();
  }, []);

  // Create kategori
  const handleCreateKategori = async () => {
    try {
      const response = await fetch("/api/admin/kompetensi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kategoriForm),
      });

      if (!response.ok) throw new Error("Failed to create kategori");

      setKategoriForm({ title: "", display_order: 0 });
      fetchKompetensiData();

      await Swal.fire({
        title: "Berhasil!",
        text: "Kategori kompetensi berhasil dibuat!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      console.error("Error creating kategori:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal membuat kategori kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Update kategori
  const handleUpdateKategori = async (kategori: KategoriKompetensi) => {
    try {
      const response = await fetch("/api/admin/kompetensi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kategori),
      });

      if (!response.ok) throw new Error("Failed to update kategori");

      setEditingKategori(null);
      fetchKompetensiData();

      await Swal.fire({
        title: "Berhasil!",
        text: "Kategori kompetensi berhasil diperbarui!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      console.error("Error updating kategori:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal memperbarui kategori kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Delete kategori
  const handleDeleteKategori = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Hapus Kategori?",
        text: "Semua soal dalam kategori ini akan ikut terhapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (!result.isConfirmed) return;

      const response = await fetch(`/api/admin/kompetensi?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete kategori");

      fetchKompetensiData();

      await Swal.fire({
        title: "Terhapus!",
        text: "Kategori kompetensi berhasil dihapus!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      console.error("Error deleting kategori:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus kategori kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Create soal
  const handleCreateSoal = async () => {
    try {
      const response = await fetch("/api/admin/soal-kompetensi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(soalForm),
      });

      if (!response.ok) throw new Error("Failed to create soal");

      setSoalForm({
        title: "",
        href: "",
        display_order: 0,
        kategori_kompetensi_id: "",
      });
      fetchKompetensiData();

      await Swal.fire({
        title: "Berhasil!",
        text: "Soal kompetensi berhasil dibuat!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      console.error("Error creating soal:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal membuat soal kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Update soal
  const handleUpdateSoal = async (soal: SoalKompetensi) => {
    try {
      const response = await fetch("/api/admin/soal-kompetensi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(soal),
      });

      if (!response.ok) throw new Error("Failed to update soal");

      setEditingSoal(null);
      fetchKompetensiData();

      await Swal.fire({
        title: "Berhasil!",
        text: "Soal kompetensi berhasil diperbarui!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      console.error("Error updating soal:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal memperbarui soal kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Delete soal
  const handleDeleteSoal = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Hapus Soal?",
        text: "Soal ini akan dihapus permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (!result.isConfirmed) return;

      const response = await fetch(`/api/admin/soal-kompetensi?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete soal");

      fetchKompetensiData();

      await Swal.fire({
        title: "Terhapus!",
        text: "Soal kompetensi berhasil dihapus!",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      console.error("Error deleting soal:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal menghapus soal kompetensi",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const toggleKategoriExpanded = (kategoriId: string) => {
    const newExpanded = new Set(expandedKategori);
    if (newExpanded.has(kategoriId)) {
      newExpanded.delete(kategoriId);
    } else {
      newExpanded.add(kategoriId);
    }
    setExpandedKategori(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2 text-gray-600">Memuat data kompetensi...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Kelola Soal TKG
            </h1>
            <p className="text-sm text-gray-500">
              Atur kategori dan soal kompetensi
            </p>
          </div>
        </div>
      </div>

      {/* Create Kategori Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Tambah Kategori Baru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Kategori
            </label>
            <input
              type="text"
              value={kategoriForm.title}
              onChange={(e) =>
                setKategoriForm({ ...kategoriForm, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan judul kategori"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urutan Tampil
            </label>
            <input
              type="number"
              value={kategoriForm.display_order}
              onChange={(e) =>
                setKategoriForm({
                  ...kategoriForm,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreateKategori}
              disabled={!kategoriForm.title.trim()}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kategori</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kategori List */}
      <div className="space-y-4">
        {kategoriList.map((kategori) => (
          <div
            key={kategori.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Kategori Header */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              {editingKategori === kategori.id ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={kategori.title}
                      onChange={(e) =>
                        setKategoriList(
                          kategoriList.map((k) =>
                            k.id === kategori.id
                              ? { ...k, title: e.target.value }
                              : k
                          )
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={kategori.display_order}
                      onChange={(e) =>
                        setKategoriList(
                          kategoriList.map((k) =>
                            k.id === kategori.id
                              ? {
                                  ...k,
                                  display_order: parseInt(e.target.value) || 0,
                                }
                              : k
                          )
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateKategori(kategori)}
                      className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan</span>
                    </button>
                    <button
                      onClick={() => setEditingKategori(null)}
                      className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Batal</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {kategori.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {kategori.soal_kompetensi?.length || 0} soal tersedia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleKategoriExpanded(kategori.id)}
                      className="text-gray-600 hover:text-gray-900 p-2"
                    >
                      {expandedKategori.has(kategori.id) ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setEditingKategori(kategori.id)}
                      className="text-blue-600 hover:text-blue-700 p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteKategori(kategori.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Kategori Content */}
            {expandedKategori.has(kategori.id) && (
              <div className="p-6">
                {/* Add Soal Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Tambah Soal Baru
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <input
                        type="text"
                        value={
                          soalForm.kategori_kompetensi_id === kategori.id
                            ? soalForm.title
                            : ""
                        }
                        onChange={(e) =>
                          setSoalForm({
                            ...soalForm,
                            title: e.target.value,
                            kategori_kompetensi_id: kategori.id,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Judul soal"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={
                          soalForm.kategori_kompetensi_id === kategori.id
                            ? soalForm.href
                            : ""
                        }
                        onChange={(e) =>
                          setSoalForm({
                            ...soalForm,
                            href: e.target.value,
                            kategori_kompetensi_id: kategori.id,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="URL soal"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={
                          soalForm.kategori_kompetensi_id === kategori.id
                            ? soalForm.display_order
                            : 0
                        }
                        onChange={(e) =>
                          setSoalForm({
                            ...soalForm,
                            display_order: parseInt(e.target.value) || 0,
                            kategori_kompetensi_id: kategori.id,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Urutan"
                      />
                    </div>
                    <div>
                      <button
                        onClick={handleCreateSoal}
                        disabled={
                          !soalForm.title.trim() ||
                          !soalForm.href.trim() ||
                          soalForm.kategori_kompetensi_id !== kategori.id
                        }
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Soal List */}
                <div className="space-y-3">
                  {kategori.soal_kompetensi?.map((soal) => (
                    <div
                      key={soal.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      {editingSoal === soal.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <input
                              type="text"
                              value={soal.title}
                              onChange={(e) =>
                                setKategoriList(
                                  kategoriList.map((k) =>
                                    k.id === kategori.id
                                      ? {
                                          ...k,
                                          soal_kompetensi:
                                            k.soal_kompetensi?.map((s) =>
                                              s.id === soal.id
                                                ? {
                                                    ...s,
                                                    title: e.target.value,
                                                  }
                                                : s
                                            ),
                                        }
                                      : k
                                  )
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          <div>
                            <input
                              type="url"
                              value={soal.href}
                              onChange={(e) =>
                                setKategoriList(
                                  kategoriList.map((k) =>
                                    k.id === kategori.id
                                      ? {
                                          ...k,
                                          soal_kompetensi:
                                            k.soal_kompetensi?.map((s) =>
                                              s.id === soal.id
                                                ? { ...s, href: e.target.value }
                                                : s
                                            ),
                                        }
                                      : k
                                  )
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              value={soal.display_order}
                              onChange={(e) =>
                                setKategoriList(
                                  kategoriList.map((k) =>
                                    k.id === kategori.id
                                      ? {
                                          ...k,
                                          soal_kompetensi:
                                            k.soal_kompetensi?.map((s) =>
                                              s.id === soal.id
                                                ? {
                                                    ...s,
                                                    display_order:
                                                      parseInt(
                                                        e.target.value
                                                      ) || 0,
                                                  }
                                                : s
                                            ),
                                        }
                                      : k
                                  )
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUpdateSoal(soal)}
                              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center space-x-1"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingSoal(null)}
                              className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 flex items-center space-x-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm font-medium text-green-600">
                              {soal.display_order}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">
                                {soal.title}
                              </h5>
                              <a
                                href={soal.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                              >
                                <span>{soal.href}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingSoal(soal.id)}
                              className="text-blue-600 hover:text-blue-700 p-2"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSoal(soal.id)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {!kategori.soal_kompetensi?.length && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Belum ada soal dalam kategori ini</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {!kategoriList.length && (
          <div className="text-center py-12 text-gray-500">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">
              Belum ada kategori kompetensi
            </p>
            <p>Mulai dengan menambahkan kategori baru di atas</p>
          </div>
        )}
      </div>
    </div>
  );
}
