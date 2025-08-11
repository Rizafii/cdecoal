"use client";

import { useState } from "react";
import { allTrainingData, TrainingUnit, MateriItem } from "./data";
import {
  ChevronDown,
  Lock,
  BookOpen,
  ExternalLink,
  Shield,
  FileText,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import PDFViewer from "@/components/PDFViewer";

export default function AllPelatihanPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    src: string;
    title: string;
  }>({
    isOpen: false,
    src: "",
    title: "",
  });

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

  const openPDF = (src: string, title: string) => {
    setPdfViewer({
      isOpen: true,
      src,
      title,
    });
  };

  const closePDF = () => {
    setPdfViewer({
      isOpen: false,
      src: "",
      title: "",
    });
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
            <p className="text-gray-600">
              Tersedia {allTrainingData.length} unit pelatihan
            </p>
          </div>

          <div className="space-y-4">
            {allTrainingData.map((unit) => (
              <TrainingUnitCard key={unit.id} unit={unit} onOpenPDF={openPDF} />
            ))}
          </div>
        </div>

        {/* PDF Viewer Modal */}
        <PDFViewer
          src={pdfViewer.src}
          title={pdfViewer.title}
          isOpen={pdfViewer.isOpen}
          onClose={closePDF}
        />
      </div>
    </>
  );
}

// Komponen Card untuk tiap unit training
function TrainingUnitCard({
  unit,
  onOpenPDF,
}: {
  unit: TrainingUnit;
  onOpenPDF: (src: string, title: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleMateriClick = (materi: MateriItem, e: React.MouseEvent) => {
    e.preventDefault();

    // Jika href adalah PDF, buka dengan PDF viewer
    if (materi.href.endsWith(".pdf")) {
      onOpenPDF(materi.href, materi.title);
    } else if (materi.href !== "#") {
      // Jika bukan PDF dan bukan placeholder, buka di tab baru
      window.open(materi.href, "_blank", "noopener,noreferrer");
    }
  };

  // Jika ada materiList, tampilkan expandable card
  if (unit.materiList && unit.materiList.length > 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <button
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                {unit.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                  {unit.materiList.length} materi
                </span>
              </div>
            </div>
          </div>
          <div
            className={`transform transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </button>

        {open && (
          <div className="border-t border-gray-100">
            <div className="p-6 pt-4">
              <div className="space-y-3">
                {unit.materiList.map((materi, index) => (
                  <div
                    key={materi.id}
                    onClick={(e) => handleMateriClick(materi, e)}
                    className={`group flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-150 ${
                      materi.href === "#"
                        ? "bg-gray-50 hover:bg-gray-100 cursor-not-allowed opacity-75"
                        : materi.href.endsWith(".pdf")
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-gray-50 hover:bg-green-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 border rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-150 ${
                          materi.href === "#"
                            ? "bg-gray-200 border-gray-300 text-gray-500"
                            : materi.href.endsWith(".pdf")
                            ? "bg-blue-100 border-blue-200 text-blue-600 group-hover:bg-blue-200"
                            : "bg-white border-gray-200 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600 group-hover:border-green-200"
                        }`}
                      >
                        {materi.href.endsWith(".pdf") ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-150 ${
                          materi.href === "#"
                            ? "text-gray-500"
                            : materi.href.endsWith(".pdf")
                            ? "text-blue-700 group-hover:text-blue-800"
                            : "text-gray-700 group-hover:text-green-700"
                        }`}
                      >
                        {materi.title}
                      </span>
                      {materi.href.endsWith(".pdf") && (
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                          PDF
                        </span>
                      )}
                      {materi.href === "#" && (
                        <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">
                          Segera Hadir
                        </span>
                      )}
                    </div>
                    {materi.href !== "#" && (
                      <ExternalLink
                        className={`w-4 h-4 transition-colors duration-150 ${
                          materi.href.endsWith(".pdf")
                            ? "text-blue-400 group-hover:text-blue-600"
                            : "text-gray-400 group-hover:text-green-500"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Jika hanya tombol buka
  return (
    <a
      href={unit.href}
      className="block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-150">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-150">
              {unit.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Klik untuk membuka pelatihan
            </p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
      </div>
    </a>
  );
}
