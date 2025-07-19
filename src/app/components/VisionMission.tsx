export default function VisionMission() {
  return (
    <section id="vision" className="py-20 bg-[#091426] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Visi & <span className="text-[#be9028]">Misi</span> Kami
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="bg-[#006016] p-8 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-[#be9028] flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Visi</h3>
            <p className="text-gray-200">
              menjadi perusahaan energi terkemuka dengan memberikan solusi
              berkualitas untuk meningkatkan dan mepertahankan permintaan energi
              dunia yang terus meningkat.
            </p>
          </div>
          <div className="bg-[#006016] p-8 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-[#be9028] flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Misi</h3>
            <p className="space-y-3 text-gray-200">
              untuk menyediakan produk dan layanan berkualitas yang konsisten
              untuk memenuhi harapan pelanggan kami,dan terlibat dalam investasi
              bisnis terkait energi untuk pertumbuhan dan ekspansi dimasa depan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
