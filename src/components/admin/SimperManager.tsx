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
  Truck,
} from "lucide-react";
import Swal from "sweetalert2";

interface SimperCategory {
  id: string;
  kategori: string;
  unit: string;
  minimal_nilai: number;
  display_order: number;
  simper_soal?: SimperSoal[];
}

interface SimperSoal {
  id: string;
  simper_category_id: string;
  title: string;
  href: string;
  display_order: number;
}

export default function SimperManager() {
  const [categories, setCategories] = useState<SimperCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSoal, setEditingSoal] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    kategori: "",
    unit: "",
    minimal_nilai: 80,
    display_order: 0,
  });

  const [soalForm, setSoalForm] = useState({
    title: "",
    href: "",
    display_order: 0,
    simper_category_id: "",
  });

  // Fetch simper data
  const fetchSimperData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/simper");
      if (!response.ok) throw new Error("Failed to fetch simper data");

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching simper data:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal memuat data SIMPER",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSimperData();
  }, []);

  // Create category
  const handleCreateCategory = async () => {
    try {
      const response = await fetch("/api/admin/simper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });

      if (!response.ok) throw new Error("Failed to create category");

      setCategoryForm({
        kategori: "",
        unit: "",
        minimal_nilai: 80,
        display_order: 0,
      });
      fetchSimperData();

      await Swal.fire({
        title: "Berhasil!",
        text: "Kategori SIMPER berhasil dibuat!",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal membuat kategori SIMPER",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // Update category
  const handleUpdateCategory = async (id: string) => {
    try {
      const response = await fetch("/api/admin/simper", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...categoryForm }),
      });

      if (!response.ok) throw new Error("Failed to update category");

      setEditingCategory(null);
      setCategoryForm({
        kategori: "",
        unit: "",
        minimal_nilai: 80,
        display_order: 0,
      });
      fetchSimperData();
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This will also delete all its soal."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/simper?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete category");

      fetchSimperData();
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    }
  };

  // Create soal
  const handleCreateSoal = async (simper_category_id: string) => {
    try {
      const response = await fetch("/api/admin/simper-soal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...soalForm, simper_category_id }),
      });

      if (!response.ok) throw new Error("Failed to create soal");

      setSoalForm({
        title: "",
        href: "",
        display_order: 0,
        simper_category_id: "",
      });
      fetchSimperData();
      alert("Soal created successfully!");
    } catch (error) {
      console.error("Error creating soal:", error);
      alert("Error creating soal");
    }
  };

  // Update soal
  const handleUpdateSoal = async (id: string) => {
    try {
      const response = await fetch("/api/admin/simper-soal", {
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
        simper_category_id: "",
      });
      fetchSimperData();
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
      const response = await fetch(`/api/admin/simper-soal?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete soal");

      fetchSimperData();
      alert("Soal deleted successfully!");
    } catch (error) {
      console.error("Error deleting soal:", error);
      alert("Error deleting soal");
    }
  };

  // Toggle expanded state for category
  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 sm:h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Kelola Data SIMPER
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Kelola kategori dan soal tes SIMPER
        </p>
      </div>

      {/* Add New Category Form */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          {editingCategory
            ? "Edit Kategori SIMPER"
            : "Tambah Kategori SIMPER Baru"}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <input
              type="text"
              value={categoryForm.kategori}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, kategori: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: WAJIB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <input
              type="text"
              value={categoryForm.unit}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, unit: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: SIMPER OFF HIGHWAY TRUCK 773"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimal Nilai
            </label>
            <input
              type="number"
              value={categoryForm.minimal_nilai}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
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
              value={categoryForm.display_order}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {editingCategory ? (
            <>
              <button
                onClick={() => handleUpdateCategory(editingCategory)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Kategori
              </button>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryForm({
                    kategori: "",
                    unit: "",
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
              onClick={handleCreateCategory}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Kategori
            </button>
          )}
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleExpanded(category.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedCategories.has(category.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {category.kategori} - {category.unit}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-gray-600">
                        Order: {category.display_order} | Soal:{" "}
                        {category.simper_soal?.length || 0}
                      </p>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-gray-600">
                          Minimal: {category.minimal_nilai}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category.id);
                      setCategoryForm({
                        kategori: category.kategori,
                        unit: category.unit,
                        minimal_nilai: category.minimal_nilai,
                        display_order: category.display_order,
                      });
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Soal Section */}
            {expandedCategories.has(category.id) && (
              <div className="p-4 bg-gray-50">
                <h4 className="text-md font-semibold text-gray-800 mb-4">
                  Soal SIMPER
                </h4>

                {/* Add New Soal Form */}
                <div className="bg-white rounded-lg p-4 mb-4 border">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Tambah Soal Baru
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={
                        soalForm.simper_category_id === category.id
                          ? soalForm.title
                          : ""
                      }
                      onChange={(e) =>
                        setSoalForm({
                          ...soalForm,
                          title: e.target.value,
                          simper_category_id: category.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Judul soal"
                    />

                    <input
                      type="url"
                      value={
                        soalForm.simper_category_id === category.id
                          ? soalForm.href
                          : ""
                      }
                      onChange={(e) =>
                        setSoalForm({
                          ...soalForm,
                          href: e.target.value,
                          simper_category_id: category.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="URL Google Form"
                    />

                    <input
                      type="number"
                      value={
                        soalForm.simper_category_id === category.id
                          ? soalForm.display_order
                          : 0
                      }
                      onChange={(e) =>
                        setSoalForm({
                          ...soalForm,
                          display_order: parseInt(e.target.value) || 0,
                          simper_category_id: category.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Urutan"
                    />
                  </div>

                  <button
                    onClick={() => handleCreateSoal(category.id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Soal
                  </button>
                </div>

                {/* Soal List */}
                <div className="space-y-2">
                  {category.simper_soal?.map((soal) => (
                    <div key={soal.id} className="bg-white rounded border p-3">
                      {editingSoal === soal.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
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
                            placeholder="URL"
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
                                  simper_category_id: "",
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
                              Buka Form
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
                                  simper_category_id: soal.simper_category_id,
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

      {categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">
            Belum ada kategori SIMPER yang tersedia
          </p>
        </div>
      )}
    </div>
  );
}
