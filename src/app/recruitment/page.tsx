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
import DynamicRecruitmentSection from "@/components/DynamicRecruitmentSection";

export default function RecruitmentPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Program Recruitment
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Pilih kategori recruitment sesuai dengan posisi dan kebutuhan
                penilaian Anda
              </p>

              {/* Video Section */}
              <div className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/GVf0K1lIo3c"
                    className="w-full h-80 md:h-96"
                    title="Video Recruitment"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Video pengenalan program recruitment
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
              Akses seluruh kategori program recruitment yang tersedia
            </p>
          </div>

          {/* Kategori Cards */}
          <DynamicRecruitmentSection />

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
                <h3 className="font-medium text-green-900 mb-1">
                  Informasi Penting
                </h3>
                <p className="text-green-700 text-sm">
                  Pastikan Anda menyelesaikan semua soal recruitment sesuai
                  dengan posisi yang dilamar. Untuk pertanyaan lebih lanjut,
                  hubungi tim HCGS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
