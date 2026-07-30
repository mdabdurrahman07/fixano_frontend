import { Wrench } from "lucide-react";

const loading = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-10 relative overflow-hidden bg-[#f7f9fb] text-[#191c1e] font-sans">
      {/* Keyframe animation injected inline to avoid tailwind.config dependencies */}
      <style>{`
        @keyframes progress-loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress-loading 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Atmospheric Background Element */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-[#006948]/10 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-sm space-y-8 animate-pulse">
        {/* Brand Mark / Logo Icon */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#006948]/5 rounded-full blur-xl group-hover:bg-[#006948]/10 transition-all duration-500" />
          <div className="relative w-16 h-16 flex items-center justify-center bg-white border border-[#bccac0] shadow-sm rounded-xl">
            <Wrench className="w-8 h-8 text-[#006948]" />
          </div>
        </div>

        {/* Identity Header */}
        <div className="text-center space-y-2">
          <h1 className="text-[20px] leading-[1.4] text-[#006948] tracking-tight font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
            Fixano
          </h1>
          <p className="text-[16px] leading-normal text-[#545f73]">
            Connecting you with expert technicians
          </p>
        </div>

        {/* Progress Cluster */}
        <div className="w-full space-y-4">
          {/* Status Label */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[14px] leading-none tracking-[0.01em] font-semibold text-[#545f73]/80">
              Loading content...
            </span>
            <span className="text-[12px] leading-none font-medium text-[#006948]/60 tracking-tighter italic">
              Initializing
            </span>
          </div>

          {/* Indeterminate Progress Bar */}
          <div className="h-1.5 w-full bg-[#e0e3e5] rounded-full overflow-hidden relative">
            <div className="h-full bg-[#006948] absolute top-0 left-0 w-1/2 rounded-full animate-progress shadow-[0_0_8px_rgba(0,105,72,0.4)]" />
          </div>
        </div>

        {/* Understated Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f2f4f6] border border-[#bccac0]/30 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#065f46] animate-ping" />
            <span className="text-[12px] leading-none font-semibold text-[#3d4a42]/60 uppercase tracking-widest">
              System Secure
            </span>
          </div>
        </div>
      </div>

      {/* Footnote */}
      <div className="absolute bottom-12 text-center w-full px-4">
        <p className="text-[12px] leading-none font-medium text-[#3d4a42]/40 max-w-60 mx-auto">
          Our technicians are preparing their tools for your home maintenance
          needs.
        </p>
      </div>
    </main>
  );
};

export default loading;
