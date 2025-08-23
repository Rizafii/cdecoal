import Link from "next/link";
import { Users, Award, BookOpen, FileCheck } from "lucide-react";

export default function ProgramPelatihan() {
  const trainingPrograms = [
    {
      id: "induksi",
      title: "Program Induksi",
      description:
        "Program orientasi dan pengenalan untuk karyawan baru dengan kurikulum yang terstruktur dan komprehensif.",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      href: "/pelatihan/induksi",
    },
    {
      id: "tkg",
      title: "TKG",
      description:
        "Pelatihan Keterampilan dan Kompetensi untuk pengembangan profesional berkelanjutan.",
      icon: Award,
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
      href: "/pelatihan/kompetensi",
    },
    {
      id: "all-unit",
      title: "Training All Unit",
      description:
        "Program pelatihan menyeluruh yang mencakup semua unit kerja untuk standardisasi kompetensi.",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      href: "/pelatihan/all",
    },
    {
      id: "simper",
      title: "Tes Simper",
      description:
        "Evaluasi dan sertifikasi kemampuan operasional melalui sistem simulasi dan praktik kerja.",
      icon: FileCheck,
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
      href: "/pelatihan/simper",
    },
  ];

  return (
    <section id="training" className="py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#091426] mb-6">
            Program <span className="text-[#006016]">Pelatihan</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pilih dari berbagai program pelatihan kami yang dirancang untuk
            meningkatkan kompetensi dan keterampilan Anda di berbagai bidang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingPrograms.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Link href={program.href} key={program.id}>
                <div
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer`}
                >
                  {/* Gradient Header */}
                  <div
                    className={`bg-gradient-to-r ${program.color} ${program.hoverColor} h-24 flex items-center justify-center transition-all duration-300`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#091426] mb-3 group-hover:text-[#006016] transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {program.description}
                    </p>

                    {/* Call to Action */}
                    <div className="flex items-center text-[#006016] font-medium text-sm group-hover:text-[#004a11] transition-colors duration-300">
                      <span>Pelajari Lebih Lanjut</span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10 transform group-hover:scale-110 transition-transform duration-300"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-6">
            Tidak menemukan program yang Anda cari?
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#006016] to-[#007a1c] text-white font-semibold rounded-full hover:from-[#004a11] hover:to-[#005a15] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              Hubungi Tim Kami
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.906-1.456L3 21l2.456-5.094A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
