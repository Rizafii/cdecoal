"use client";

import React, { useState } from "react";
import { Shield, Lock } from "lucide-react";

export default function AdminPage() {
  // State untuk autentikasi password
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Password dari env, fallback ke default
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

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

  // Jika sudah autentikasi, tampilkan pesan sukses
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Login Berhasil
            </h1>
            <p className="text-gray-600">Anda berhasil masuk ke area admin</p>
          </div>
        </div>
      </div>
    );
  }

  // Jika belum autentikasi, tampilkan form password
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Area Admin Terlindungi
              </h1>
              <p className="text-gray-600">
                Masukkan password untuk mengakses dashboard admin
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password Admin
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                    placeholder="Masukkan password admin"
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
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 font-medium"
              >
                Masuk ke Dashboard Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
