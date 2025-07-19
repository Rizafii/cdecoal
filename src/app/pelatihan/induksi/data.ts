// data.ts
export interface SoalItem {
  id: string;
  title: string;
  href: string;
}

export interface KategoriSoal {
  id: string;
  title: string;
  minimalNilai: number;
  soalList: SoalItem[];
}

export const induksiData: KategoriSoal[] = [
  {
    id: "operator",
    title: "Tutup Induksi Operator (Nilai Minimal 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "ob-hauler",
        title: "Soal OB Hauler",
        href: "/induksi/soal/ob-hauler",
      },
      {
        id: "big-digger",
        title: "Soal Big Digger",
        href: "/induksi/soal/big-digger",
      },
      {
        id: "excavator-support",
        title: "Soal Excavator Support",
        href: "/induksi/soal/excavator-support",
      },
      {
        id: "bulldozer",
        title: "Soal Bulldozer",
        href: "/induksi/soal/bulldozer",
      },
      { id: "wa-wd", title: "Soal WA/WD", href: "/induksi/soal/wa-wd" },
      {
        id: "motor-grader",
        title: "Soal Motor Grader",
        href: "/induksi/soal/motor-grader",
      },
      {
        id: "compactor",
        title: "Soal Compactor",
        href: "/induksi/soal/compactor",
      },
      {
        id: "drilling-machine",
        title: "Soal Drilling Machine",
        href: "/induksi/soal/drilling-machine",
      },
      { id: "dt-coal", title: "Soal DT Coal", href: "/induksi/soal/dt-coal" },
      { id: "trailer", title: "Soal Trailer", href: "/induksi/soal/trailer" },
      {
        id: "fuel-lube-truck",
        title: "Soal Fuel Lube Truck",
        href: "/induksi/soal/fuel-lube-truck",
      },
      { id: "wt-dt", title: "Soal WT DT", href: "/induksi/soal/wt-dt" },
      { id: "wt-hd", title: "Soal WT HD", href: "/induksi/soal/wt-hd" },
      {
        id: "forklift",
        title: "Soal Forklift",
        href: "/induksi/soal/forklift",
      },
      { id: "manitou", title: "Soal Manitou", href: "/induksi/soal/manitou" },
      { id: "tadano", title: "Soal Tadano", href: "/induksi/soal/tadano" },
      {
        id: "welding-truck",
        title: "Soal Welding Truck",
        href: "/induksi/soal/welding-truck",
      },
      {
        id: "user-produksi",
        title: "Soal User Produksi",
        href: "/induksi/soal/user-produksi",
      },
      {
        id: "golden-rules",
        title: "Survey Pemahaman 11 Golden Rules",
        href: "/induksi/survey/golden-rules",
      },
      {
        id: "perilaku-kerja",
        title: "Survey Perilaku Kerja Aman",
        href: "/induksi/survey/perilaku-kerja",
      },
    ],
  },
  {
    id: "pengawas",
    title: "Buku Induksi Pengawas (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [],
  },
  {
    id: "mis-operasi",
    title: "Buku Mis Operasi (Nilai Wajib 100)",
    minimalNilai: 100,
    soalList: [],
  },
  {
    id: "trainer",
    title: "Buku Induksi Trainer (Minimal Nilai 90)",
    minimalNilai: 90,
    soalList: [],
  },
  {
    id: "mekanik",
    title: "Buku Induksi Mekanik (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [],
  },
];
