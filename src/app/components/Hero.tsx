"use client";

import { useSiteImage } from "@/hooks/useSiteImage";
import { ImageSkeleton } from "@/components/ui/Skeleton";

export default function Hero() {
  const { imageUrl, isLoading } = useSiteImage("hero");

  return (
    <div className="relative w-full py-18 md:py-30 px-auto items-center text-center flex flex-col px-4 sm:px-6 lg:px-8 ">
      {/* Background Image */}
      {!isLoading && (
        <img
          src={imageUrl}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Skeleton Loading state */}
      {isLoading && (
        <ImageSkeleton className="absolute inset-0 w-full h-full z-0" />
      )}

      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-10"></div>

      {/* Content */}
      <div className="relative z-20 md:gap-24 gap-16 flex md:flex-row flex-col items-center justify-center text-center">
        {/* left logo */}
        <div className="md:w-100 w-60">
          <img
            src="/logogab.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>
        {/* right information */}
        <div className="flex flex-col items-center md:items-start text-start gap-8">
          <div className="child-logo flex items-center">
            <img
              src="/cde.png"
              alt="Logo"
              className="md:h-24 h-16 object-cover"
            />
            <img
              src="/ces.png"
              alt="Logo"
              className="md:h-24 h-16 object-cover"
            />
          </div>
          <div className="text flex flex-col text-center items-center md:items-start gap-4">
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
