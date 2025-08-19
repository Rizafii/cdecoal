"use client";

import React, { useState, useEffect } from "react";
import PDFViewer from "@/components/PDFViewer";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  BookOpen,
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

export default function DynamicTrainingSection() {
  const [trainingUnits, setTrainingUnits] = useState<TrainingUnit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    src: string;
    title: string;
  }>({
    isOpen: false,
    src: "",
    title: "",
  });

  // Fetch training data from API
  const fetchTrainingData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/training");
      if (!response.ok) throw new Error("Failed to fetch training data");

      const data = await response.json();
      setTrainingUnits(data);
    } catch (error) {
      console.error("Error fetching training data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingData();
  }, []);

  const openPDF = (src: string, title: string) => {
    setPdfViewer({
      isOpen: true,
      src,
      title,
    });
  };

  const closePDF = () => {
    setPdfViewer({
      isOpen: false,
      src: "",
      title: "",
    });
  };

  const handleMateriClick = (materi: MateriItem, e: React.MouseEvent) => {
    e.preventDefault();

    // Jika href adalah PDF, buka dengan PDF viewer
    if (materi.href.endsWith(".pdf")) {
      openPDF(materi.href, materi.title);
    } else if (materi.href !== "#") {
      // Jika bukan PDF dan bukan placeholder, buka di tab baru
      window.open(materi.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleUnitClick = (unit: TrainingUnit, e: React.MouseEvent) => {
    e.preventDefault();

    // Jika unit memiliki href dan bukan placeholder
    if (unit.href && unit.href !== "#") {
      if (unit.href.endsWith(".pdf")) {
        openPDF(unit.href, unit.title);
      } else {
        window.open(unit.href, "_blank", "noopener,noreferrer");
      }
    }
  };

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
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {trainingUnits.map((unit) => {
          // Jika unit memiliki materi items, tampilkan sebagai expandable card
          if (unit.materi_items && unit.materi_items.length > 0) {
            return (
              <div
                key={unit.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <button
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
                  onClick={() => toggleExpanded(unit.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {unit.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                          {unit.materi_items.length} materi
                        </span>
                        {unit.file_path && (
                          <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full font-medium">
                            File utama
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {unit.href && unit.href !== "#" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnitClick(unit, e);
                        }}
                        className="flex items-center gap-1 text-green-600 hover:text-green-800 px-3 py-1 rounded border border-green-200 hover:bg-green-50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Buka
                      </button>
                    )}
                    <div
                      className={`transform transition-transform duration-200 ${
                        expandedUnits.has(unit.id) ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </button>

                {expandedUnits.has(unit.id) && (
                  <div className="border-t border-gray-100">
                    <div className="p-6 pt-4">
                      <div className="space-y-3">
                        {unit.materi_items
                          .sort((a, b) => a.display_order - b.display_order)
                          .map((materi, index) => (
                            <div
                              key={materi.id}
                              onClick={(e) => handleMateriClick(materi, e)}
                              className={`group flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-150 ${
                                materi.href === "#"
                                  ? "bg-gray-50 hover:bg-gray-100 cursor-not-allowed opacity-75"
                                  : materi.href.endsWith(".pdf")
                                  ? "bg-blue-50 hover:bg-blue-100"
                                  : "bg-gray-50 hover:bg-green-50"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-8 h-8 border rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-150 ${
                                    materi.href === "#"
                                      ? "bg-gray-200 border-gray-300 text-gray-500"
                                      : materi.href.endsWith(".pdf")
                                      ? "bg-blue-100 border-blue-200 text-blue-600 group-hover:bg-blue-200"
                                      : "bg-white border-gray-200 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 group-hover:border-green-200"
                                  }`}
                                >
                                  {materi.href.endsWith(".pdf") ? (
                                    <FileText className="w-4 h-4" />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <span
                                  className={`font-medium transition-colors duration-150 ${
                                    materi.href === "#"
                                      ? "text-gray-500"
                                      : materi.href.endsWith(".pdf")
                                      ? "text-blue-700 group-hover:text-blue-800"
                                      : "text-gray-700 group-hover:text-green-700"
                                  }`}
                                >
                                  {materi.title}
                                </span>
                                {materi.href.endsWith(".pdf") && (
                                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                                    PDF
                                  </span>
                                )}
                                {materi.href === "#" && (
                                  <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                                    Segera Hadir
                                  </span>
                                )}
                                {materi.file_path && (
                                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                                    File tersedia
                                  </span>
                                )}
                              </div>
                              {materi.href !== "#" && (
                                <ExternalLink
                                  className={`w-4 h-4 transition-colors duration-150 ${
                                    materi.href.endsWith(".pdf")
                                      ? "text-blue-400 group-hover:text-blue-600"
                                      : "text-gray-400 group-hover:text-green-500"
                                  }`}
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          // Jika unit tidak memiliki materi items, tampilkan sebagai tombol langsung
          return (
            <button
              key={unit.id}
              onClick={(e) => handleUnitClick(unit, e)}
              className="block w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {unit.title.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-sm text-gray-500">Klik untuk membuka</p>
                    {unit.file_path && (
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <FileText className="w-4 h-4 mr-1" />
                        File tersedia
                      </div>
                    )}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>

      {trainingUnits.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum Ada Data Training
          </h3>
          <p className="text-gray-500">
            Data training akan segera ditambahkan.
          </p>
        </div>
      )}

      {/* PDF Viewer */}
      <PDFViewer
        src={pdfViewer.src}
        title={pdfViewer.title}
        isOpen={pdfViewer.isOpen}
        onClose={closePDF}
      />
    </>
  );
}
