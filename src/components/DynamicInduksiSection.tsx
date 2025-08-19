"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Play,
  Award,
  FileText,
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

const KategoriCard = ({ kategori }: { kategori: KategoriInduksi }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-6 overflow-hidden">
      {/* Header */}
      <div
        className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {kategori.title}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                {kategori.soal_induksi?.length || 0} soal
              </span>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-gray-600">
                  Nilai minimal:{" "}
                  <span className="font-semibold text-amber-600">
                    {kategori.minimal_nilai}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`transform transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {kategori.soal_induksi && kategori.soal_induksi.length > 0 ? (
            <div className="p-6 pt-4">
              <div className="space-y-3">
                {kategori.soal_induksi
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((soal, index) => (
                    <a
                      key={soal.id}
                      href={soal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-150 text-decoration-none"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors duration-150">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-700 font-medium transition-colors duration-150">
                          {soal.title}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
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
  );
};

export default function DynamicInduksiSection() {
  const [induksiData, setInduksiData] = useState<KategoriInduksi[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch induksi data from API
  const fetchInduksiData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/induksi");
      if (!response.ok) throw new Error("Failed to fetch induksi data");

      const data = await response.json();
      setInduksiData(data);
    } catch (error) {
      console.error("Error fetching induksi data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInduksiData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
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
    <div className="space-y-4">
      {induksiData.map((kategori) => (
        <KategoriCard key={kategori.id} kategori={kategori} />
      ))}

      {induksiData.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum Ada Data Induksi
          </h3>
          <p className="text-gray-500">Data induksi akan segera ditambahkan.</p>
        </div>
      )}
    </div>
  );
}
