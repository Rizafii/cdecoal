"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { fetchKompetensiData, KategoriKompetensi } from "./data";
import Navbar from "@/app/components/Navbar";

const KategoriCard = ({ kategori }: { kategori: KategoriKompetensi }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-6 overflow-hidden">
      {/* Header */}
      <div
        className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {kategori.title}
            </h3>
            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
              {kategori.soalList.length} latihan soal
            </span>
          </div>
        </div>
        <div
          className={`transform transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {kategori.soalList.length > 0 ? (
            <div className="p-6 pt-4">
              <div className="space-y-3">
                {kategori.soalList.map((soal, index) => (
                  <a
                    key={soal.id}
                    href={soal.href}
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
                Belum ada latihan soal tersedia
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

export default function KompetensiPage() {
  const [kompetensiList, setKompetensiList] = useState<KategoriKompetensi[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchKompetensiData();
        setKompetensiList(data);
      } catch (error) {
        console.error("Error loading kompetensi data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data kompetensi...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Program TKG
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Pilih kategori soal untuk mengasah kompetensi Anda
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Soal</h2>
            <p className="text-gray-600">
              Tersedia {kompetensiList.length} kategori soal
            </p>
          </div>

          {/* Kategori Cards */}
          <div className="space-y-4">
            {kompetensiList.map((kategori) => (
              <KategoriCard key={kategori.id} kategori={kategori} />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-green-900 mb-1">Informasi</h3>
                <p className="text-green-700 text-sm">
                  Soal ini bertujuan untuk meningkatkan kompetensi Anda. Untuk
                  pertanyaan lebih lanjut, hubungi tim HCGS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
