"use client";

import { useState } from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import ProgramPelatihan from "./components/ProgramPelatihan";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TopNav from "./components/TopNav";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <div className="bg-white">
      <Head>
        <title>Departemen Training - Pengembangan Sumber Daya Manusia</title>
        <meta
          name="description"
          content="Departemen Training perusahaan menyediakan berbagai modul pelatihan untuk pengembangan kompetensi karyawan"
        />
        <link rel="icon" href="/logogab.png" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </Head>
      <TopNav />
      <Navbar />
      <Hero />
      <ProgramPelatihan />
      <About />
      <VisionMission />
      <GallerySection />
      <Contact />
      <Footer />
    </div>
  );
}
