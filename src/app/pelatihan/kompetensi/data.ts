export interface SoalItem {
  id: string;
  title: string;
  href: string;
}

export interface KategoriKompetensi {
  id: string;
  title: string;
  soalList: SoalItem[];
}

// Fallback data - akan digunakan jika database tidak tersedia
export const kompetensiData: KategoriKompetensi[] = [
  {
    id: "safety",
    title: "Latihan Soal Safety",
    soalList: [
      {
        id: "safety-1",
        title: "Soal Safety Dasar",
        href: "/kompetensi/soal/safety-1",
      },
      {
        id: "safety-2",
        title: "Soal Safety Lanjutan",
        href: "/kompetensi/soal/safety-2",
      },
    ],
  },
  {
    id: "operasional",
    title: "Latihan Soal Operasional",
    soalList: [
      {
        id: "op-1",
        title: "Soal Operasional 1",
        href: "/kompetensi/soal/op-1",
      },
      {
        id: "op-2",
        title: "Soal Operasional 2",
        href: "/kompetensi/soal/op-2",
      },
    ],
  },
  {
    id: "lainnya",
    title: "Latihan Soal Lainnya",
    soalList: [],
  },
];

// Fungsi untuk mengambil data dari database
export async function fetchKompetensiData(): Promise<KategoriKompetensi[]> {
  try {
    const response = await fetch("/api/admin/kompetensi");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Transform data dari database ke format yang diharapkan komponen
    return data.map((kategori: any) => ({
      id: kategori.id,
      title: kategori.title,
      soalList: (kategori.soal_kompetensi || []).map((soal: any) => ({
        id: soal.id,
        title: soal.title,
        href: soal.href,
      })),
    }));
  } catch (error) {
    console.error("Error fetching kompetensi data:", error);
    // Return fallback data jika terjadi error
    return kompetensiData;
  }
}
