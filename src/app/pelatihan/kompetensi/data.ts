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
