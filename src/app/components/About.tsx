export default function About() {
  return (
    <section
      id="about"
      className="pb-30 pt-10  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className=" border-2 border-dashed rounded-xl w-full h-96">
              <img
                src="/about.jpg"
                alt="About Us"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div>
            <div className="text-start flex flex-col items-start gap-4 mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-[#091426]">
                Tentang <span className="text-[#006016]">Departemen Kami</span>
              </h2>
              <p className="text-lg text-gray-600">
                Training Center PT Cakrawala Dinamika Energi Job site Air
                Sebayur adalah Departemen yang bertanggung jawab terhadap
                Kompetensi Teknis Operator,Mekanik,Pengawas Lapangan (Produksi)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
