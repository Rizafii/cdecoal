export interface SoalItem {
  id: string;
  title: string;
  href: string;
}

export interface KategoriSimper {
  id: string;
  kategori: string;
  unit: string;
  minimalNilai: number;
  soalList: SoalItem[];
}

export const simperData: KategoriSimper[] = [
  {
    id: "wajib",
    kategori: "WAJIB",
    unit: "All Unit",
    minimalNilai: 100,
    soalList: [
      {
        id: "rambu-rambu",
        title: "Rambu-Rambu",
        href: "/simper/soal/rambu-rambu",
      },
    ],
  },
  {
    id: "loader",
    kategori: "Operator",
    unit: "Loader",
    minimalNilai: 80,
    soalList: [
      {
        id: "hyundai-r210",
        title: "Hyundai R210",
        href: "/simper/soal/hyundai-r210",
      },
      { id: "pc200", title: "PC 200", href: "/simper/soal/pc200" },
      { id: "pc400", title: "PC 400", href: "/simper/soal/pc400" },
      { id: "doosan225", title: "Doosan 225", href: "/simper/soal/doosan225" },
      { id: "doosan500", title: "Doosan 500", href: "/simper/soal/doosan500" },
      { id: "pc1250", title: "PC 1250", href: "/simper/soal/pc1250" },
      { id: "pc2000", title: "PC 2000", href: "/simper/soal/pc2000" },
      { id: "cat6015", title: "CAT 6015", href: "/simper/soal/cat6015" },
      { id: "cat6020", title: "CAT 6020", href: "/simper/soal/cat6020" },
      {
        id: "hitachi2500",
        title: "Hitachi 2500",
        href: "/simper/soal/hitachi2500",
      },
      {
        id: "hitachi3600",
        title: "Hitachi 3600",
        href: "/simper/soal/hitachi3600",
      },
      { id: "pc4000", title: "PC 4000", href: "/simper/soal/pc4000" },
      { id: "wa500", title: "WA 500", href: "/simper/soal/wa500" },
      { id: "wa600", title: "WA 600", href: "/simper/soal/wa600" },
      { id: "wa800", title: "WA 800", href: "/simper/soal/wa800" },
    ],
  },
  {
    id: "hauler",
    kategori: "Operator",
    unit: "Hauler",
    minimalNilai: 80,
    soalList: [
      { id: "cat740", title: "CAT 740", href: "/simper/soal/cat740" },
      {
        id: "volvo-a40f",
        title: "Volvo A40F",
        href: "/simper/soal/volvo-a40f",
      },
      {
        id: "hd-komatsu-465",
        title: "HD Komatsu 465",
        href: "/simper/soal/hd-komatsu-465",
      },
      {
        id: "hd-komatsu-785",
        title: "HD Komatsu 785",
        href: "/simper/soal/hd-komatsu-785",
      },
      { id: "cat777", title: "CAT 777", href: "/simper/soal/cat777" },
      { id: "cat785", title: "CAT 785", href: "/simper/soal/cat785" },
      { id: "cat789", title: "CAT 789", href: "/simper/soal/cat789" },
    ],
  },
  {
    id: "dozer",
    kategori: "Operator",
    unit: "Dozer",
    minimalNilai: 80,
    soalList: [
      {
        id: "komatsu-d85ss",
        title: "Komatsu D85 SS",
        href: "/simper/soal/komatsu-d85ss",
      },
      {
        id: "komatsu-d155",
        title: "Komatsu D155",
        href: "/simper/soal/komatsu-d155",
      },
      {
        id: "komatsu-d375",
        title: "Komatsu D375",
        href: "/simper/soal/komatsu-d375",
      },
      { id: "cat-d6r", title: "CAT D6 R", href: "/simper/soal/cat-d6r" },
      { id: "cat-d10t", title: "CAT D10 T", href: "/simper/soal/cat-d10t" },
      { id: "wd600", title: "WD 600", href: "/simper/soal/wd600" },
    ],
  },
  {
    id: "compactor",
    kategori: "Operator",
    unit: "Compactor",
    minimalNilai: 80,
    soalList: [
      {
        id: "bomag-219d",
        title: "BOMAG 219 D",
        href: "/simper/soal/bomag-219d",
      },
    ],
  },
  {
    id: "grader",
    kategori: "Operator",
    unit: "Grader",
    minimalNilai: 80,
    soalList: [
      {
        id: "komatsu-mgd825",
        title: "Komatsu MGD 825",
        href: "/simper/soal/komatsu-mgd825",
      },
      { id: "cat24m", title: "CAT 24M", href: "/simper/soal/cat24m" },
    ],
  },
  {
    id: "drilling",
    kategori: "Operator",
    unit: "Drilling",
    minimalNilai: 80,
    soalList: [
      { id: "dm45e", title: "DM 45E", href: "/simper/soal/dm45e" },
      { id: "dm50", title: "DM 50", href: "/simper/soal/dm50" },
    ],
  },
];
