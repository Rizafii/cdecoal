export interface MateriItem {
  id: string;
  title: string;
  href: string;
}

export interface TrainingUnit {
  id: string;
  title: string;
  materiList?: MateriItem[];
  href?: string; // jika hanya tombol buka tanpa materi detail
}

export const allTrainingData: TrainingUnit[] = [
  {
    id: "dm45",
    title: "Tutup Drilling DM45",
    materiList: [
      { id: "bab1", title: "Bab 1: Pengenalan Komponen", href: "#" },
      { id: "post1", title: "Post Test Bab 1", href: "#" },
      { id: "bab2", title: "Bab 2: Instrument Panel", href: "#" },
      { id: "post2", title: "Post Test Bab 2", href: "#" },
      { id: "bab3", title: "Bab 3: Maintenance", href: "#" },
      { id: "post3", title: "Post Test Bab 3", href: "#" },
      { id: "bab4", title: "Bab 4: Safety Operasi", href: "#" },
      { id: "post4", title: "Post Test Bab 4", href: "#" },
      { id: "final", title: "Final Post Test", href: "#" },
    ],
  },
  { id: "dm50", title: "Buka Drilling DM50", href: "#" },
  { id: "dmlsp", title: "Buka Drilling DML SP", href: "#" },
  { id: "r210", title: "Buka Hyundai R210", href: "#" },
  { id: "pc200", title: "Buka Komatsu PC 200", href: "#" },
  { id: "longarm", title: "Buka Long Arm", href: "#" },
  { id: "pc400", title: "Buka Komatsu PC 400", href: "#" },
  { id: "doosan500", title: "Buka Doosan 500", href: "#" },
  { id: "pc1250", title: "Buka Komatsu PC 1250", href: "#" },
  { id: "cat6015", title: "Buka CAT 6015", href: "#" },
  { id: "pc2000", title: "Buka Komatsu PC 2000", href: "#" },
  { id: "cat6020", title: "Buka CAT 6020", href: "#" },
  { id: "ex200", title: "Buka Hitachi EX200", href: "#" },
  { id: "wa500", title: "Buka Komatsu WA500", href: "#" },
  { id: "hd785", title: "Buka Komatsu HD785", href: "#" },
  {
    id: "safety",
    title: "Pelatihan Safety Umum",
    materiList: [
      { id: "safety1", title: "Bab 1: Dasar-dasar K3", href: "#" },
      { id: "safety2", title: "Bab 2: APD & Prosedur", href: "#" },
      { id: "safety3", title: "Bab 3: Tanggap Darurat", href: "#" },
      { id: "safetyfinal", title: "Final Test Safety", href: "#" },
    ],
  },
  {
    id: "env",
    title: "Pelatihan Lingkungan",
    materiList: [
      { id: "env1", title: "Bab 1: Pengelolaan Limbah", href: "#" },
      { id: "env2", title: "Bab 2: Reklamasi", href: "#" },
      { id: "envfinal", title: "Final Test Lingkungan", href: "#" },
    ],
  },
];
