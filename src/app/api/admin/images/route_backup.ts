import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type || !["hero", "about"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    // Tentukan path gambar berdasarkan type
    const fileName = type === "hero" ? "hero.jpg" : "about.jpg";
    const filePath = path.join(process.cwd(), "public", fileName);

    // Cek apakah file exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json({
        imageUrl: `/${fileName}`,
      });
    } else {
      return NextResponse.json({
        imageUrl: null,
        message: "Image not found",
      });
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!type || !["hero", "about"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    // Validasi file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, JPG, and PNG are allowed" },
        { status: 400 }
      );
    }

    // Batasi ukuran file (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size too large. Maximum 10MB allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tentukan nama file dan path
    const fileName = type === "hero" ? "hero.jpg" : "about.jpg";
    const publicPath = path.join(process.cwd(), "public");
    const filePath = path.join(publicPath, fileName);

    // Pastikan direktori public ada
    try {
      await mkdir(publicPath, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Backup file lama jika ada
    if (fs.existsSync(filePath)) {
      const backupPath = path.join(
        publicPath,
        `${type}_backup_${Date.now()}.jpg`
      );
      try {
        fs.copyFileSync(filePath, backupPath);
      } catch (error) {
        console.warn("Could not create backup:", error);
      }
    }

    // Simpan file baru
    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: `/${fileName}`,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
