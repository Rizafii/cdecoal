"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ExternalLink, Award, FileText } from "lucide-react";

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

export default function DynamicSimperSection() {
  const [categories, setCategories] = useState<SimperCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Fetch simper data from API
  const fetchSimperData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/simper");
      if (!response.ok) throw new Error("Failed to fetch simper data");

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching simper data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSimperData();
  }, []);

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
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-6 overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
              onClick={() => toggleExpanded(category.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.kategori} - {category.unit}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                      {category.simper_soal?.length || 0} soal
                    </span>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">
                        Nilai minimal:{" "}
                        <span className="font-semibold text-amber-600">
                          {category.minimal_nilai}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`transform transition-transform duration-200 ${
                    expandedCategories.has(category.id) ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Content */}
            {expandedCategories.has(category.id) && (
              <div className="border-t border-gray-100">
                {category.simper_soal && category.simper_soal.length > 0 ? (
                  <div className="p-6 pt-4">
                    <div className="space-y-3">
                      {category.simper_soal
                        .sort((a, b) => a.display_order - b.display_order)
                        .map((soal, index) => (
                          <a
                            key={soal.id}
                            href={soal.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg cursor-pointer transition-colors duration-150 text-decoration-none"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 group-hover:border-green-200 transition-colors duration-150">
                                {index + 1}
                              </div>
                              <span className="text-gray-700 group-hover:text-green-700 font-medium transition-colors duration-150">
                                {soal.title}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-150" />
                          </a>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium mb-2">
                      Belum ada konten tersedia
                    </p>
                    <p className="text-gray-400 text-sm">
                      Konten akan segera ditambahkan
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {categories.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum Ada Data SIMPER
          </h3>
          <p className="text-gray-500">Data SIMPER akan segera ditambahkan.</p>
        </div>
      )}
    </>
  );
}
