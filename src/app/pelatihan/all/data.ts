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
    id: "oht773e",
    title: "TRAINING OHT 773",
    materiList: [
      {
        id: "bab1",
        title: "BAB I: PENGENALAN UNIT DAN KOMPONEN",
        href: "/training/oht773/bab1oht773.pdf",
      },
      // { id: "post1", title: "Post Test Bab 1", href: "#" },
      {
        id: "bab2",
        title: "BAB II: PENGENALAN DAN PEMAHAMAN INSTRUMENT PANE",
        href: "/training/oht773/bab2oht773.pdf",
      },
      // { id: "post2", title: "Post Test Bab 2", href: "#" },
      {
        id: "bab3",
        title: "BAB III: P2H DAN PERAWATAN",
        href: "/training/oht773/bab3oht773.pdf",
      },
      // { id: "post3", title: "Post Test Bab 3", href: "#" },
      {
        id: "bab4",
        title: "BAB IV: METHODE DAN TEHNIK OPERASI",
        href: "/training/oht773/bab4oht773.pdf",
      },
      {
        id: "ppt",
        title: "POWER POINT",
        href: "/training/oht773/training773ecde.pdf",
      },
    ],
  },
  {
    id: "exa395",
    title: "TRAINING EXCAVATOR 395",
    materiList: [
      {
        id: "bab1",
        title: "BAB I: PENGENALAN UNIT DAN KOMPONEN",
        href: "/training/cat395/1.pdf",
      },
      // { id: "post1", title: "Post Test Bab 1", href: "#" },
      {
        id: "bab2",
        title: "BAB II: PEMAHAMAN INSTRUMEN PANEL DAN KONTROL",
        href: "/training/cat395/2.pdf",
      },
      // { id: "post2", title: "Post Test Bab 2", href: "#" },
      {
        id: "bab3",
        title: "BAB III: P2H DAN PERAWATAN",
        href: "/training/cat395/3.pdf",
      },
      // { id: "post3", title: "Post Test Bab 3", href: "#" },
      {
        id: "bab4",
        title: "BAB IV: METHODE DAN TEHNIK OPERASI",
        href: "/training/cat395/4.pdf",
      },
      {
        id: "ppt",
        title: "POWER POINT",
        href: "/training/cat395/ppt.pdf",
      },
    ],
  },
  {
    id: "exa320",
    title: "TRAINING EXCAVATOR 320",
    materiList: [
      {
        id: "ppt",
        title: "POWER POINT",
        href: "/training/cat320/ppt.pdf",
      },
    ],
  },
  {
    id: "d8t",
    title: "TRAINING DOZER D8T",
    materiList: [
      {
        id: "ppt",
        title: "POWER POINT",
        href: "/training/d8t/ppt.pdf",
      },
    ],
  },
  {
    id: "d6r",
    title: "TRAINING DOZER D6R",
    materiList: [
      {
        id: "bab1",
        title: "BAB I: PENGENALAN UNIT DAN KOMPONEN",
        href: "/training/d6r/1.pdf",
      },
      // { id: "post1", title: "Post Test Bab 1", href: "#" },
      {
        id: "bab2",
        title: "BAB II: PENGENALAN DAN PEMAHAMAN INSTRUMENT PANEL",
        href: "/training/d6r/2.pdf",
      },
      // { id: "post2", title: "Post Test Bab 2", href: "#" },
      {
        id: "bab3",
        title: "BAB III: P2H DAN PERAWATAN",
        href: "/training/d6r/3.pdf",
      },
      // { id: "post3", title: "Post Test Bab 3", href: "#" },
      {
        id: "bab4",
        title: "BAB IV: METHODE DAN TEHNIK OPERASI",
        href: "/training/d6r/4.pdf",
      },
    ],
  },
  {
    id: "gd120",
    title: "TRAINING MOTOR GRADER 120 GC",
    materiList: [
      {
        id: "bab1",
        title: "BAB I: PENGENALAN UNIT DAN KOMPONEN",
        href: "/training/gd120/1.pdf",
      },
      // { id: "post1", title: "Post Test Bab 1", href: "#" },
      {
        id: "bab2",
        title: "BAB II: PEMAHAMAN INSTRUMEN PANEL DAN KONTROL",
        href: "/training/gd120/2.pdf",
      },
      // { id: "post2", title: "Post Test Bab 2", href: "#" },
      {
        id: "bab3",
        title: "BAB III: P2H DAN PERAWATAN",
        href: "/training/gd120/3.pdf",
      },
      // { id: "post3", title: "Post Test Bab 3", href: "#" },
      {
        id: "bab4",
        title: "BAB IV: METHODE DAN TEHNIK OPERASI",
        href: "/training/gd120/4.pdf",
      },
    ],
  },
  {
    id: "dtiveco",
    title: "TRAINING DUMP TRUCK IVECO",
    materiList: [
      {
        id: "ppt",
        title: "POWER POINT",
        href: "/training/dtiveco/ppt.pdf",
      },
    ],
  },
];
