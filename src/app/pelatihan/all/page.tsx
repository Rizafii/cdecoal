"use client";

import { useState } from "react";
import {
  ChevronDown,
  Lock,
  BookOpen,
  ExternalLink,
  Shield,
  FileText,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import DynamicTrainingSection from "@/components/DynamicTrainingSection";

export default function AllPelatihanPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Ambil password dari environment variable
  const correctPassword =
    process.env.NEXT_PUBLIC_TRAINING_PASSWORD || "defaultpassword";

  const handleSubmit = (
    e: React.FormEvent | React.KeyboardEvent | React.MouseEvent
  ) => {
    e.preventDefault();

    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password salah!");
      setPassword(""); // Reset password field
    }
  };

  // Jika belum terautentikasi, tampilkan form login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Program Pelatihan Dilindungi
              </h1>
              <p className="text-gray-600">
                Masukkan password untuk mengakses semua program pelatihan
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
                Masuk ke Program Pelatihan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jika sudah terautentikasi, tampilkan konten utama
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Semua Program Pelatihan
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Akses lengkap ke seluruh unit pelatihan dan materi pembelajaran
                yang tersedia
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unit Pelatihan
            </h2>
            <p className="text-gray-600">Program pelatihan yang tersedia</p>
          </div>

          <div className="space-y-4">
            <DynamicTrainingSection />
          </div>
        </div>
      </div>
    </>
  );
}
