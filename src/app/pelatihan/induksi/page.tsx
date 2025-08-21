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
import Navbar from "@/app/components/Navbar";
import DynamicInduksiSection from "@/components/DynamicInduksiSection";

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
              Akses seluruh kategori program induksi yang tersedia
            </p>
          </div>

          {/* Kategori Cards */}
          <DynamicInduksiSection />

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
                  posisi Anda. Untuk pertanyaan lebih lanjut, hubungi tim HCGS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
