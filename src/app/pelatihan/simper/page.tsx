"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Award,
  FileText,
  Lock,
  Shield,
} from "lucide-react";
import { simperData, KategoriSimper } from "./data";
import Navbar from "@/app/components/Navbar";

const KategoriCard = ({ kategori }: { kategori: KategoriSimper }) => {
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
              {kategori.kategori} - {kategori.unit}
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
  );
};

export default function SimperPage() {
  // Tambahkan state untuk autentikasi password
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Password dari env, fallback ke default
  const correctPassword =
    process.env.NEXT_PUBLIC_TRAINING_PASSWORD || "simper123";

  const handleSubmit = (
    e: React.FormEvent | React.KeyboardEvent | React.MouseEvent
  ) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password salah!");
      setPassword("");
    }
  };

  // Jika belum autentikasi, tampilkan form password
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Tes SIMPER Dilindungi
              </h1>
              <p className="text-gray-600">
                Masukkan password untuk mengakses Tes SIMPER
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-150"
                    placeholder="Masukkan password"
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150 font-medium"
              >
                Masuk ke Tes SIMPER
              </button>
            </div>
          </div>
        </div>
      </div>
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
                Tes SIMPER
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Pilih kategori dan unit sesuai dengan SIMPER yang akan diujikan.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Kategori & Unit SIMPER
            </h2>
            <p className="text-gray-600">
              Tersedia {simperData.length} kategori/unit SIMPER
            </p>
          </div>

          {/* Kategori Cards */}
          <div className="space-y-4">
            {simperData.map((kategori) => (
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
                <h3 className="font-medium text-green-900 mb-1">
                  Informasi Penting
                </h3>
                <p className="text-green-700 text-sm">
                  Pastikan Anda memilih unit SIMPER yang sesuai. Untuk
                  pertanyaan lebih lanjut, hubungi tim HR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
