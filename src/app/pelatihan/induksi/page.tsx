"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Play,
  Award,
  FileText,
} from "lucide-react";
import { induksiData, KategoriSoal } from "./data"; // import data & interface
import Navbar from "@/app/components/Navbar";

const KategoriCard = ({ kategori }: { kategori: KategoriSoal }) => {
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
                {kategori.soalList.length} soal
              </span>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-gray-600">
                  Nilai minimal:{" "}
                  <span className="font-semibold text-amber-600">
                    {kategori.minimalNilai}
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
          {kategori.soalList.length > 0 ? (
            <div className="p-6 pt-4">
              <div className="space-y-3">
                {kategori.soalList.map((soal, index) => (
                  <a
                    key={soal.id}
                    href={soal.href}
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

export default function InduksiPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Program Induksi
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Pilih kategori induksi sesuai dengan posisi dan kebutuhan
                pengembangan Anda
              </p>

              {/* Video Section */}
              <div className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/GVf0K1lIo3c"
                    className="w-full h-80 md:h-96"
                    title="Video Induksi"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Video pengenalan program induksi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Kategori Program
            </h2>
            <p className="text-gray-600">
              Tersedia {induksiData.length} kategori program induksi
            </p>
          </div>

          {/* Kategori Cards */}
          <div className="space-y-4">
            {induksiData.map((kategori) => (
              <KategoriCard key={kategori.id} kategori={kategori} />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
                <h3 className="font-medium text-blue-900 mb-1">
                  Informasi Penting
                </h3>
                <p className="text-blue-700 text-sm">
                  Pastikan Anda menyelesaikan semua materi induksi sesuai dengan
                  posisi Anda. Untuk pertanyaan lebih lanjut, hubungi tim HR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
