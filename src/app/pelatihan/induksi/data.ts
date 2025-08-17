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
    id: "dozer",
    title: "Dozer 6R (Nilai Minimal 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-dozer-6r",
        title: "Soal Dozer 6R",
        href: "https://forms.gle/7L5wPNQh2anKcmAJ7",
      },
    ],
  },
  {
    id: "dozer2",
    title: "Dozer 8T (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-dozer-8t",
        title: "Soal Dozer 8T",
        href: "https://forms.gle/3QDGPbiHPPtRXRLY6",
      },
    ],
  },
  {
    id: "dumptruck",
    title: "Dump Truck (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-dumptruck",
        title: "Soal Dump Truck",
        href: "https://forms.gle/Z1rPfi4NJgjfaNm78",
      },
    ],
  },
  {
    id: "motorgrader",
    title: "Motor Grader (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-motor-grader",
        title: "Soal Motor Grader",
        href: "https://forms.gle/naeW4rwwDbn72jZe8",
      },
    ],
  },
  {
    id: "exavator320",
    title: "Exavator 320 (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-exavator-320",
        title: "Soal Exavator 320",
        href: "https://forms.gle/wHuf7PKptFPmhZpP7",
      },
    ],
  },
  {
    id: "exavator395b",
    title: "Exavator 395 B (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-exavator-395b",
        title: "Soal Exavator 395 B",
        href: "https://forms.gle/iRpYrpLq1rDuu78z9",
      },
    ],
  },
  {
    id: "oht773",
    title: "OHT 773 (Minimal Nilai 80)",
    minimalNilai: 80,
    soalList: [
      {
        id: "soal-oht-773",
        title: "Soal OHT 773",
        href: "https://forms.gle/CdTsQvjXG5rHqv5m8",
      },
    ],
  },
];
