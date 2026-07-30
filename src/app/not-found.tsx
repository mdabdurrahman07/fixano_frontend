"use client";

import { ArrowLeft, House, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-['Inter',sans-serif] min-h-screen flex flex-col overflow-x-hidden">

      {/* Main Content Canvas */}
      <main className="grow flex items-center justify-center px-4 relative pt-20">
        {/* Large Subtle Background 404 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span
            className="text-[12rem] md:text-[24rem] font-extrabold leading-none opacity-40 bg-linear-to-b from-[#e0e3e5] to-transparent bg-clip-text text-transparent"
            style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
          >
            404
          </span>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-1/4 left-10 md:left-20 z-0 hidden md:block animate-[float_6s_ease-in-out_infinite]">
          <div className="w-12 h-12 rounded-xl bg-[#85f8c4]/20 blur-xl" />
        </div>
        <div
          className="absolute bottom-1/4 right-10 md:right-20 z-0 hidden md:block animate-[float_6s_ease-in-out_infinite]"
          style={{ animationDelay: "-2s" }}
        >
          <div className="w-16 h-16 rounded-full bg-[#d5e0f8]/20 blur-xl" />
        </div>

        {/* Central Content Card */}
        <div className="relative z-10 max-w-lg w-full text-center space-y-8 bg-white/70 backdrop-blur-md border border-white/40 p-8 md:p-12 rounded-3xl shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-[#00855d] rounded-2xl flex items-center justify-center text-[#f5fff7] shadow-sm mb-2">
              <span
                className="material-symbols-outlined text-[40px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                <SearchX/>
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[24px] md:text-[32px] font-bold leading-[1.2] text-[#191c1e] tracking-tight">
              Page not found
            </h1>
            <p className="text-[16px] leading-normal text-[#3d4a42]">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#006948] text-white text-[14px] font-semibold rounded-xl shadow-sm hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all duration-300 w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[18px]">
                <House/>
              </span>
              <span>Back to Home</span>
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-[#bccac0] text-[#3d4a42] text-[14px] font-semibold rounded-xl hover:bg-[#eceef0] transition-all duration-300 w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-[18px]">
                <ArrowLeft/>
              </span>
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </main>

    
    </div>
  );
}
