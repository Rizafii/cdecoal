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
  Upload,
  FileText,
} from "lucide-react";

interface TrainingUnit {
  id: string;
  title: string;
  href?: string;
  file_path?: string;
  display_order: number;
  materi_items?: MateriItem[];
}

interface MateriItem {
  id: string;
  training_unit_id: string;
  title: string;
  href: string;
  file_path?: string;
  display_order: number;
}

export default function TrainingManager() {
  const [trainingUnits, setTrainingUnits] = useState<TrainingUnit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUnit, setEditingUnit] = useState<string | null>(null);
  const [editingMateri, setEditingMateri] = useState<string | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  // Form states
  const [unitForm, setUnitForm] = useState({
    title: "",
    href: "",
    display_order: 0,
    file: null as File | null,
  });

  const [materiForm, setMateriForm] = useState({
    title: "",
    href: "",
    display_order: 0,
    training_unit_id: "",
    file: null as File | null,
  });

  // Fetch training data
  const fetchTrainingData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/training");
      if (!response.ok) throw new Error("Failed to fetch training data");

      const data = await response.json();
      setTrainingUnits(data);
    } catch (error) {
      console.error("Error fetching training data:", error);
      alert("Error fetching training data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, []);

  // Create training unit
  const handleCreateUnit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", unitForm.title);
      formData.append("href", unitForm.href);
      formData.append("display_order", unitForm.display_order.toString());

      if (unitForm.file) {
        formData.append("file", unitForm.file);
      }

      const response = await fetch("/api/admin/training", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create training unit");

      setUnitForm({ title: "", href: "", display_order: 0, file: null });
      fetchTrainingData();
      alert("Training unit created successfully!");
    } catch (error) {
      console.error("Error creating training unit:", error);
      alert("Error creating training unit");
    }
  };

  // Update training unit
  const handleUpdateUnit = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", unitForm.title);
      formData.append("href", unitForm.href);
      formData.append("display_order", unitForm.display_order.toString());

      if (unitForm.file) {
        formData.append("file", unitForm.file);
      }

      const response = await fetch("/api/admin/training", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update training unit");

      setEditingUnit(null);
      setUnitForm({ title: "", href: "", display_order: 0, file: null });
      fetchTrainingData();
      alert("Training unit updated successfully!");
    } catch (error) {
      console.error("Error updating training unit:", error);
      alert("Error updating training unit");
    }
  };

  // Delete training unit
  const handleDeleteUnit = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this training unit? This will also delete all its materials."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/training?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete training unit");

      fetchTrainingData();
      alert("Training unit deleted successfully!");
    } catch (error) {
      console.error("Error deleting training unit:", error);
      alert("Error deleting training unit");
    }
  };

  // Create materi item
  const handleCreateMateri = async (training_unit_id: string) => {
    try {
      const formData = new FormData();
      formData.append("training_unit_id", training_unit_id);
      formData.append("title", materiForm.title);
      formData.append("href", materiForm.href);
      formData.append("display_order", materiForm.display_order.toString());

      if (materiForm.file) {
        formData.append("file", materiForm.file);
      }

      const response = await fetch("/api/admin/materi", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create materi item");

      setMateriForm({
        title: "",
        href: "",
        display_order: 0,
        training_unit_id: "",
        file: null,
      });
      fetchTrainingData();
      alert("Materi item created successfully!");
    } catch (error) {
      console.error("Error creating materi item:", error);
      alert("Error creating materi item");
    }
  };

  // Update materi item
  const handleUpdateMateri = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", materiForm.title);
      formData.append("href", materiForm.href);
      formData.append("display_order", materiForm.display_order.toString());

      if (materiForm.file) {
        formData.append("file", materiForm.file);
      }

      const response = await fetch("/api/admin/materi", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update materi item");

      setEditingMateri(null);
      setMateriForm({
        title: "",
        href: "",
        display_order: 0,
        training_unit_id: "",
        file: null,
      });
      fetchTrainingData();
      alert("Materi item updated successfully!");
    } catch (error) {
      console.error("Error updating materi item:", error);
      alert("Error updating materi item");
    }
  };

  // Delete materi item
  const handleDeleteMateri = async (id: string) => {
    if (!confirm("Are you sure you want to delete this materi item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/materi?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete materi item");

      fetchTrainingData();
      alert("Materi item deleted successfully!");
    } catch (error) {
      console.error("Error deleting materi item:", error);
      alert("Error deleting materi item");
    }
  };

  // Toggle expanded state for unit
  const toggleExpanded = (unitId: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
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
          Kelola Training Data
        </h2>
        <p className="text-gray-600">
          Kelola unit pelatihan dan materi pembelajaran
        </p>
      </div>

      {/* Add New Training Unit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingUnit ? "Edit Training Unit" : "Tambah Training Unit Baru"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Unit
            </label>
            <input
              type="text"
              value={unitForm.title}
              onChange={(e) =>
                setUnitForm({ ...unitForm, title: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan judul unit pelatihan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urutan Tampil
            </label>
            <input
              type="number"
              value={unitForm.display_order}
              onChange={(e) =>
                setUnitForm({
                  ...unitForm,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {editingUnit ? (
            <>
              <button
                onClick={() => handleUpdateUnit(editingUnit)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Unit
              </button>
              <button
                onClick={() => {
                  setEditingUnit(null);
                  setUnitForm({
                    title: "",
                    href: "",
                    display_order: 0,
                    file: null,
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
              onClick={handleCreateUnit}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Unit
            </button>
          )}
        </div>
      </div>

      {/* Training Units List */}
      <div className="space-y-4">
        {trainingUnits.map((unit) => (
          <div
            key={unit.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleExpanded(unit.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedUnits.has(unit.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {unit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Order: {unit.display_order} | Materials:{" "}
                      {unit.materi_items?.length || 0}
                    </p>
                    {unit.file_path && (
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <FileText className="w-4 h-4 mr-1" />
                        File tersedia
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingUnit(unit.id);
                      setUnitForm({
                        title: unit.title,
                        href: unit.href || "",
                        display_order: unit.display_order,
                        file: null,
                      });
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUnit(unit.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Materials Section */}
            {expandedUnits.has(unit.id) && (
              <div className="p-4 bg-gray-50">
                <h4 className="text-md font-semibold text-gray-800 mb-4">
                  Materi Items
                </h4>

                {/* Add New Material Form */}
                <div className="bg-white rounded-lg p-4 mb-4 border">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Tambah Materi Baru
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={
                        materiForm.training_unit_id === unit.id
                          ? materiForm.title
                          : ""
                      }
                      onChange={(e) =>
                        setMateriForm({
                          ...materiForm,
                          title: e.target.value,
                          training_unit_id: unit.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Judul materi"
                    />

                    <input
                      type="url"
                      value={
                        materiForm.training_unit_id === unit.id
                          ? materiForm.href
                          : ""
                      }
                      onChange={(e) =>
                        setMateriForm({
                          ...materiForm,
                          href: e.target.value,
                          training_unit_id: unit.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="URL atau kosongkan jika upload file"
                    />

                    <input
                      type="number"
                      value={
                        materiForm.training_unit_id === unit.id
                          ? materiForm.display_order
                          : 0
                      }
                      onChange={(e) =>
                        setMateriForm({
                          ...materiForm,
                          display_order: parseInt(e.target.value) || 0,
                          training_unit_id: unit.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Urutan"
                    />

                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setMateriForm({
                          ...materiForm,
                          file: e.target.files?.[0] || null,
                          training_unit_id: unit.id,
                        })
                      }
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={() => handleCreateMateri(unit.id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah Materi
                  </button>
                </div>

                {/* Materials List */}
                <div className="space-y-2">
                  {unit.materi_items?.map((materi) => (
                    <div
                      key={materi.id}
                      className="bg-white rounded border p-3"
                    >
                      {editingMateri === materi.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                          <input
                            type="text"
                            value={materiForm.title}
                            onChange={(e) =>
                              setMateriForm({
                                ...materiForm,
                                title: e.target.value,
                              })
                            }
                            className="p-2 border border-gray-300 rounded text-sm"
                            placeholder="Judul materi"
                          />
                          <input
                            type="url"
                            value={materiForm.href}
                            onChange={(e) =>
                              setMateriForm({
                                ...materiForm,
                                href: e.target.value,
                              })
                            }
                            className="p-2 border border-gray-300 rounded text-sm"
                            placeholder="URL"
                          />
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                              setMateriForm({
                                ...materiForm,
                                file: e.target.files?.[0] || null,
                              })
                            }
                            className="p-2 border border-gray-300 rounded text-sm"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateMateri(materi.id)}
                              className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                            >
                              <Save className="w-3 h-3" />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingMateri(null);
                                setMateriForm({
                                  title: "",
                                  href: "",
                                  display_order: 0,
                                  training_unit_id: "",
                                  file: null,
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
                              {materi.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              Order: {materi.display_order}
                            </div>
                            {materi.file_path && (
                              <div className="flex items-center text-sm text-green-600 mt-1">
                                <FileText className="w-3 h-3 mr-1" />
                                File tersedia
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingMateri(materi.id);
                                setMateriForm({
                                  title: materi.title,
                                  href: materi.href,
                                  display_order: materi.display_order,
                                  training_unit_id: materi.training_unit_id,
                                  file: null,
                                });
                              }}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 rounded border border-blue-600 hover:bg-blue-50 text-sm"
                            >
                              <Edit className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteMateri(materi.id)}
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

      {trainingUnits.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Belum ada training unit yang tersedia</p>
        </div>
      )}
    </div>
  );
}
