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
    id: "oht773",
    kategori: "WAJIB",
    unit: "SIMPER OFF HIGHWAY TRUCK 773",
    minimalNilai: 80,
    soalList: [
      {
        id: "oht-773",
        title: "SIMPER OFF HIGHWAY TRUCK 773 ",
        href: "https://forms.gle/4ttfUEqqP8wSv4G68",
      },
    ],
  },
  {
    id: "exavator395b",
    kategori: "WAJIB",
    unit: "SIMPER EXAVATOR 395B",
    minimalNilai: 80,
    soalList: [
      {
        id: "exavator-395b",
        title: "SIMPER EXAVATOR 395B",
        href: "https://forms.gle/XL9VSctkSnmQRBMQ8",
      },
    ],
  },
  {
    id: "dumptruck",
    kategori: "WAJIB",
    unit: "SIMPER DUMP TRUCK",
    minimalNilai: 80,
    soalList: [
      {
        id: "dumptruck",
        title: "SIMPER DUMP TRUCK",
        href: "https://forms.gle/KP74zdG35eJgoAG66",
      },
    ],
  },
  {
    id: "motorgrader",
    kategori: "WAJIB",
    unit: "SIMPER MOTOR GRADER",
    minimalNilai: 80,
    soalList: [
      {
        id: "motor-grader",
        title: "SIMPER MOTOR GRADER",
        href: "https://forms.gle/tDPbNoE4EYoWDcHQA",
      },
    ],
  },
  {
    id: "dozer6r",
    kategori: "WAJIB",
    unit: "SIMPER DOZER 6R",
    minimalNilai: 80,
    soalList: [
      {
        id: "dozer-6r",
        title: "SIMPER DOZER 6R",
        href: "https://forms.gle/aVMrkgKwiyGkxFQa8",
      },
    ],
  },
  {
    id: "exavator320",
    kategori: "WAJIB",
    unit: "SIMPER EXAVATOR 320",
    minimalNilai: 80,
    soalList: [
      {
        id: "exavator-320",
        title: "SIMPER EXAVATOR 320",
        href: "https://forms.gle/i4s8gRDrM7Fd6g1U6",
      },
    ],
  },
];
