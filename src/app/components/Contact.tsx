export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#091426]">
            Hubungi <span className="text-[#006016]">Kami</span>
          </h2>
          <p className="text-lg text-gray-600">
            Silakan hubungi kami untuk informasi lebih lanjut mengenai program
            pelatihan atau jika Anda memiliki pertanyaan.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-[#006016] p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Informasi Kontak</h3>
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#be9028] flex items-center justify-center mr-4">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href="mailto:achmadi.cde@gmail.com"
                        className="text-gray-200 hover:text-white transition-colors"
                      >
                        achmadi.cde@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#be9028] flex items-center justify-center mr-4">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Lokasi</h4>
                      <a
                        href="https://maps.app.goo.gl/34vmAGx2EG6vy9dz8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 hover:text-white transition-colors"
                      >
                        TDC CDE
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#be9028] flex items-center justify-center mr-4">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-medium">WhatsApp</h4>
                      <a
                        href="https://wa.me/628133361064"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 hover:text-white transition-colors"
                      >
                        082133361064
                      </a>
                      <a
                        href="https://wa.me/6285227711087"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 hover:text-white transition-colors"
                      >
                        085227711087
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-xl font-bold text-[#091426] mb-6">
                  Kirim Pesan
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006016] focus:border-[#006016] transition-colors"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006016] focus:border-[#006016] transition-colors"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subjek
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006016] focus:border-[#006016] transition-colors"
                      placeholder="Subjek pesan"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006016] focus:border-[#006016] transition-colors"
                      placeholder="Tulis pesan Anda..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#006016] hover:bg-[#004712] text-white font-medium rounded-lg transition-colors"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
