"use client";

import { useState } from "react";

export default function SimperPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Ambil password dari environment variable
  const correctPassword =
    process.env.NEXT_PUBLIC_TRAINING_PASSWORD || "defaultpassword";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <p className="text-gray-600 font-semibold text-xl mb-6 text-center">
            Masukkan password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Masukkan password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Jika sudah terautentikasi, tampilkan konten utama
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Test Simper</h1>
      <p>
        Ini adalah halaman Test Simper. Konten pelatihan dapat diletakkan di
        sini.
      </p>
    </div>
  );
}
