"use client";

import React, { useState } from "react";
import {
  Shield,
  Lock,
  Image,
  BarChart3,
  Users,
  Settings,
  BookOpen,
  GraduationCap,
  Truck,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";
import GalleryManager from "@/components/admin/GalleryManager";
import TrainingManager from "@/components/admin/TrainingManager";
import InduksiManager from "@/components/admin/InduksiManager";
import SimperManager from "@/components/admin/SimperManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("gallery");

  const menuItems = [
    {
      id: "gallery",
      label: "Galeri",
      icon: Image,
      description: "Kelola foto galeri",
    },
    {
      id: "training",
      label: "Data Pelatihan",
      icon: BookOpen,
      description: "Kelola materi pelatihan",
    },
    {
      id: "induksi",
      label: "Data Induksi",
      icon: GraduationCap,
      description: "Kelola data induksi",
    },
    {
      id: "simper",
      label: "Data SIMPER",
      icon: Truck,
      description: "Kelola data SIMPER",
    },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar dari dashboard admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      localStorage.removeItem("adminPassword");
      await Swal.fire({
        title: "Berhasil Logout",
        text: "Anda akan diarahkan ke halaman utama",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      window.location.href = "/";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "gallery":
        return <GalleryManager />;
      case "training":
        return <TrainingManager />;
      case "induksi":
        return <InduksiManager />;
      case "simper":
        return <SimperManager />;
      default:
        return <GalleryManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Kelola konten website CDE Coal
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Administrator
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Menu Navigasi
            </h2>
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-200 shadow-md"
                          : "text-gray-700 hover:bg-gray-50 hover:shadow-sm border-2 border-transparent"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mt-0.5 ${
                          activeTab === item.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-h-[600px]">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
