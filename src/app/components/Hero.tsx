export default function Hero() {
  return (
    <div className="relative w-full py-30 px-auto items-center text-center flex flex-col">
      {/* Background Image */}
      <img
        src="/hero.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-10"></div>

      {/* Content */}
      <div className="relative z-20 gap-24 grid grid-cols-2 items-center text-center">
        {/* left logo */}
        <div className="h-96">
          <img
            src="/logogab.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        {/* right information */}
        <div className="flex flex-col items-start text-start gap-8">
          <div className="child-logo flex items-center">
            <img src="/cde.png" alt="Logo" className="h-24 object-cover" />
            <img src="/ces.png" alt="Logo" className="h-24 object-cover" />
          </div>
          <div className="text flex flex-col items-start gap-4">
            <h1 className="text-white font-bold text-6xl">Training Center</h1>
            <p className="text-white font-medium text-xl italic ">
              PT. Cakrawala Dinamika Energi
            </p>
          </div>
          <img src="/capital.png" alt="" className="w-62" />
        </div>
      </div>
    </div>
  );
}
