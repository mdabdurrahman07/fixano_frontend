'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, Headphones, ShieldCheck } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Keyframe animation injected inline */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <main className="grow flex items-center justify-center px-4 md:px-10 relative">
        {/* Atmospheric Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#85f8c4] opacity-20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-125 h-125 bg-[#d5e0f8] opacity-30 blur-[120px] rounded-full" />
        </div>

        {/* Error Container */}
        <div className="w-full max-w-lg">
          {/* Branding Anchor */}
          <div className="flex justify-center mb-12">
            <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[20px] font-extrabold text-[#006948]">
              Fixano
            </span>
          </div>

          {/* Error Card */}
          <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-lg rounded-2xl p-8 md:p-12 text-center flex flex-col items-center transition-all duration-300">
            {/* Icon Section */}
            <div className="w-20 h-20 rounded-full bg-[#d5e0f8] flex items-center justify-center mb-8 animate-float">
              <AlertTriangle className="w-10 h-10 text-[#545f73]" />
            </div>

            {/* Text Content */}
            <div className="space-y-4 mb-10">
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[32px] leading-[1.2] tracking-[-0.02em] font-bold text-[#191c1e]">
                Something went wrong
              </h1>
              <p className="text-[16px] leading-normal text-[#3d4a42] max-w-[320px] mx-auto">
                We ran into a slight hiccup while trying to load this page. Don&apos;t worry, your home services are safe with us.
              </p>
            </div>

            {/* Action Cluster */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <button
                onClick={() => reset()}
                className="w-full sm:flex-1 py-4 px-8 bg-[#006948] hover:bg-[#00855d] text-white font-semibold text-[14px] leading-none tracking-[0.01em] rounded-xl transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                Try again
              </button>

              <Link
                href="/"
                className="w-full sm:flex-1 py-4 px-8 border border-[#bccac0] text-[#191c1e] font-semibold text-[14px] leading-none tracking-[0.01em] rounded-xl transition-all duration-300 hover:bg-[#e0e3e5]/50 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go back home
              </Link>
            </div>

            {/* Micro-copy */}
            <p className="mt-8 text-[12px] leading-none font-medium text-[#bccac0]">
              {error?.digest ? `Error Digest: ${error.digest}` : 'Error Code: FX_500_INTERNAL'}
            </p>
          </div>

          {/* Decorative Bento Pieces */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 opacity-60">
              <Headphones className="w-5 h-5 text-[#006948]" />
              <span className="text-[12px] leading-none font-medium text-[#3d4a42]">
                24/7 Support
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 opacity-60">
              <ShieldCheck className="w-5 h-5 text-[#006948]" />
              <span className="text-[12px] leading-none font-medium text-[#3d4a42]">
                Guaranteed Fix
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}