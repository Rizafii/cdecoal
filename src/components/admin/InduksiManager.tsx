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
  Award,
  ExternalLink,
} from "lucide-react";

interface KategoriInduksi {
  id: string;
  title: string;
  minimal_nilai: number;
  display_order: number;
  soal_induksi?: SoalInduksi[];
}

interface SoalInduksi {
  id: string;
  kategori_induksi_id: string;
  title: string;
  href: string;
  display_order: number;
}

export default function InduksiManager() {
  const [kategoriList, setKategoriList] = useState<KategoriInduksi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingKategori, setEditingKategori] = useState<string | null>(null);
  const [editingSoal, setEditingSoal] = useState<string | null>(null);
  const [expandedKategori, setExpandedKategori] = useState<Set<string>>(
    new Set()
  );

  // Form states
  const [kategoriForm, setKategoriForm] = useState({
    title: "",
    minimal_nilai: 80,
    display_order: 0,
  });

  const [soalForm, setSoalForm] = useState({
    title: "",
    href: "",
    display_order: 0,
    kategori_induksi_id: "",
  });

  // Fetch induksi data
  const fetchInduksiData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/induksi");
      if (!response.ok) throw new Error("Failed to fetch induksi data");

      const data = await response.json();
      setKategoriList(data);
    } catch (error) {
      console.error("Error fetching induksi data:", error);
      alert("Error fetching induksi data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInduksiData();
  }, []);

  // Create kategori
  const handleCreateKategori = async () => {
    try {
      const response = await fetch("/api/admin/induksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kategoriForm),
      });

      if (!response.ok) throw new Error("Failed to create kategori");

      setKategoriForm({ title: "", minimal_nilai: 80, display_order: 0 });
      fetchInduksiData();
      alert("Kategori created successfully!");
    } catch (error) {
      console.error("Error creating kategori:", error);
      alert("Error creating kategori");
    }
  };

  // Update kategori
  const handleUpdateKategori = async (id: string) => {
    try {
      const response = await fetch("/api/admin/induksi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...kategoriForm }),
      });

      if (!response.ok) throw new Error("Failed to update kategori");

      setEditingKategori(null);
      setKategoriForm({ title: "", minimal_nilai: 80, display_order: 0 });
      fetchInduksiData();
      alert("Kategori updated successfully!");
    } catch (error) {
      console.error("Error updating kategori:", error);
      alert("Error updating kategori");
    }
  };

  // Delete kategori
  const handleDeleteKategori = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this kategori? This will also delete all its soal."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/induksi?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete kategori");

      fetchInduksiData();
      alert("Kategori deleted successfully!");
    } catch (error) {
      console.error("Error deleting kategori:", error);
      alert("Error deleting kategori");
    }
  };

  // Create soal
  const handleCreateSoal = async (kategori_induksi_id: string) => {
    try {
      const response = await fetch("/api/admin/soal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...soalForm, kategori_induksi_id }),
      });

      if (!response.ok) throw new Error("Failed to create soal");

      setSoalForm({
        title: "",
        href: "",
        display_order: 0,
        kategori_induksi_id: "",
      });
      fetchInduksiData();
      alert("Soal created successfully!");
    } catch (error) {
      console.error("Error creating soal:", error);
      alert("Error creating soal");
    }
  };

  // Update soal
  const handleUpdateSoal = async (id: string) => {
    try {
      const response = await fetch("/api/admin/soal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...soalForm }),
      });

      if (!response.ok) throw new Error("Failed to update soal");

      setEditingSoal(null);
      setSoalForm({
        title: "",
        href: "",
        display_order: 0,
        kategori_induksi_id: "",
      });
      fetchInduksiData();
      alert("Soal updated successfully!");
    } catch (error) {
      console.error("Error updating soal:", error);
      alert("Error updating soal");
    }
  };

  // Delete soal
  const handleDeleteSoal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this soal?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/soal?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete soal");

      fetchInduksiData();
      alert("Soal deleted successfully!");
    } catch (error) {
      console.error("Error deleting soal:", error);
      alert("Error deleting soal");
    }
  };

  // Toggle expanded state for kategori
  const toggleExpanded = (kategoriId: string) => {
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
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Kelola Data Induksi
        </h2>
        <p className="text-gray-600">
          Kelola kategori induksi dan soal-soal ujian
        </p>
      </div>

      {/* Add New Kategori Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingKategori
            ? "Edit Kategori Induksi"
            : "Tambah Kategori Induksi Baru"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Kategori
            </label>
            <input
              type="text"
              value={kategoriForm.title}
              onChange={(e) =>
                setKategoriForm({ ...kategoriForm, title: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan judul kategori"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nilai Minimal
            </label>
            <input
              type="number"
              value={kategoriForm.minimal_nilai}
              onChange={(e) =>
                setKategoriForm({
                  ...kategoriForm,
                  minimal_nilai: parseInt(e.target.value) || 80,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {editingKategori ? (
            <>
              <button
                onClick={() => handleUpdateKategori(editingKategori)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Kategori
              </button>
              <button
                onClick={() => {
                  setEditingKategori(null);
                  setKategoriForm({
                    title: "",
                    minimal_nilai: 80,
                    display_order: 0,
                  });
                }}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            </>
          ) : (
            <button
              onClick={handleCreateKategori}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Kategori
            </button>
          )}
        </div>
      </div>

      {/* Kategori List */}
      <div className="space-y-4">
        {kategoriList.map((kategori) => (
          <div
            key={kategori.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleExpanded(kategori.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedKategori.has(kategori.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {kategori.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>Order: {kategori.display_order}</span>
                      <span>Soal: {kategori.soal_induksi?.length || 0}</span>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Minimal: {kategori.minimal_nilai}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingKategori(kategori.id);
                      setKategoriForm({
                        title: kategori.title,
                        minimal_nilai: kategori.minimal_nilai,
                        display_order: kategori.display_order,
                      });
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteKategori(kategori.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Soal Section */}
            {expandedKategori.has(kategori.id) && (
              <div className="p-4 bg-gray-50">
                <h4 className="text-md font-semibold text-gray-800 mb-4">
                  Soal Items
                </h4>

                {/* Add New Soal Form */}
                <div className="bg-white rounded-lg p-4 mb-4 border">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Tambah Soal Baru
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      value={
                        soalForm.kategori_induksi_id === kategori.id
                          ? soalForm.title
                          : ""
                      }
                      onChange={(e) =>
                        setSoalForm({
                          ...soalForm,
                          title: e.target.value,
                          kategori_induksi_id: kategori.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Judul soal"
                    />

                    <input
                      type="url"
                      value={
                        soalForm.kategori_induksi_id === kategori.id
                          ? soalForm.href
                          : ""
                      }
                      onChange={(e) =>
                        setSoalForm({
                          ...soalForm,
                          href: e.target.value,
                          kategori_induksi_id: kategori.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="URL soal (Google Form, dll)"
                    />

                    <input
                      type="number"
                      value={
                        soalForm.kategori_induksi_id === kategori.id
                          ? soalForm.display_order
                          : 0
                      }
                      onChange={(e) =>
                        setSoalForm({
                          ...soalForm,
                          display_order: parseInt(e.target.value) || 0,
                          kategori_induksi_id: kategori.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Urutan"
                    />
                  </div>

                  <button
                    onClick={() => handleCreateSoal(kategori.id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Soal
                  </button>
                </div>

                {/* Soal List */}
                <div className="space-y-2">
                  {kategori.soal_induksi?.map((soal) => (
                    <div key={soal.id} className="bg-white rounded border p-3">
                      {editingSoal === soal.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                          <input
                            type="text"
                            value={soalForm.title}
                            onChange={(e) =>
                              setSoalForm({
                                ...soalForm,
                                title: e.target.value,
                              })
                            }
                            className="p-2 border border-gray-300 rounded text-sm"
                            placeholder="Judul soal"
                          />
                          <input
                            type="url"
                            value={soalForm.href}
                            onChange={(e) =>
                              setSoalForm({ ...soalForm, href: e.target.value })
                            }
                            className="p-2 border border-gray-300 rounded text-sm"
                            placeholder="URL soal"
                          />
                          <input
                            type="number"
                            value={soalForm.display_order}
                            onChange={(e) =>
                              setSoalForm({
                                ...soalForm,
                                display_order: parseInt(e.target.value) || 0,
                              })
                            }
                            className="p-2 border border-gray-300 rounded text-sm"
                            placeholder="Urutan"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateSoal(soal.id)}
                              className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                            >
                              <Save className="w-3 h-3" />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingSoal(null);
                                setSoalForm({
                                  title: "",
                                  href: "",
                                  display_order: 0,
                                  kategori_induksi_id: "",
                                });
                              }}
                              className="flex items-center gap-1 bg-gray-600 text-white px-2 py-1 rounded text-sm hover:bg-gray-700"
                            >
                              <X className="w-3 h-3" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">
                              {soal.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              Order: {soal.display_order}
                            </div>
                            <a
                              href={soal.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {soal.href}
                            </a>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingSoal(soal.id);
                                setSoalForm({
                                  title: soal.title,
                                  href: soal.href,
                                  display_order: soal.display_order,
                                  kategori_induksi_id: soal.kategori_induksi_id,
                                });
                              }}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 rounded border border-blue-600 hover:bg-blue-50 text-sm"
                            >
                              <Edit className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSoal(soal.id)}
                              className="flex items-center gap-1 text-red-600 hover:text-red-800 px-2 py-1 rounded border border-red-600 hover:bg-red-50 text-sm"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {kategoriList.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">
            Belum ada kategori induksi yang tersedia
          </p>
        </div>
      )}
    </div>
  );
}
