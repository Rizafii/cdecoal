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
import Navbar from "@/app/components/Navbar";
import DynamicSimperSection from "@/components/DynamicSimperSection";

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
              Akses seluruh kategori dan unit SIMPER yang tersedia
            </p>
          </div>

          {/* Kategori Cards */}
          <DynamicSimperSection />

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
