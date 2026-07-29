import { BadgeCheck, CircleDollarSign, ClipboardClock } from "lucide-react";
import React, { ReactNode } from "react";

export function AuthWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen relative overflow-hidden bg-[#f7f9fb] text-[#191c1e] font-sans">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-150 h-150 bg-[#006948]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 bg-[#d8e3fb]/30 rounded-full blur-[100px]" />
      </div>

      {/* Left Column: Visual/Marketing (Hidden on Mobile) */}
      <section className="hidden lg:flex w-1/2 relative flex-col justify-center px-20 z-10">
        <div className="max-w-md">
          <div className="mb-12">
            <span className="font-extrabold text-[48px] leading-[1.1] text-[#006948] block mb-2 tracking-tight">
              Fixano
            </span>
            <p className="text-[20px] font-semibold text-[#3d4a42]">
              Your home, handled with care.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#68dba9] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#006948]">
                  <BadgeCheck />
                </span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold mb-1">
                  Vetted Professionals
                </h3>
                <p className="text-[#3d4a42] text-sm">
                  Every technician undergoes a rigorous background check and
                  skill assessment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d8e3fb] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#545f73]">
                  <ClipboardClock />
                </span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold mb-1">Instant Booking</h3>
                <p className="text-[#3d4a42] text-sm">
                  Schedule a service in under 60 seconds with real-time
                  technician availability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#d1fae5] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#065f46]">
                  <CircleDollarSign />
                </span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold mb-1">
                  Transparent Pricing
                </h3>
                <p className="text-[#3d4a42] text-sm">
                  Know exactly what you&apos;ll pay before you book. No hidden
                  fees, ever.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-[#bccac0]">
            <div className="flex -space-x-4 mb-4">
              <div
                className="w-10 h-10 rounded-full border-2 border-white bg-[#d8dadc] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqYlpSSG2EyzWmxsY0pmeiHksOy_33vVvqSLZand3OaoLcIX3e4VSeSUFXQbhnCmqqS5jh-l4pozUsA3FGxkhcg6qGwKzsj4Tvr0EbKJlbCaLqNvkBMrB-WpAukQrV654M-MKcjbQCS_9Ni3BuHu_EndHCY7lCXdFn3YNDd3G26_kXmt12kW69vQQgNYQWSdWvlNd9QvWnd-noFkQU_9-lczpu15Nh35GxqUmdlz4cLSpXhO8IDc6CXjZU4XXZKDr7F6o-tqCPPZo')",
                }}
              />
              <div
                className="w-10 h-10 rounded-full border-2 border-white bg-[#d8dadc] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzPiUlhFKcjgHiD98GHtWqROk2Pjxo4Axc-M-7F2AMPGflhm0GJkW2aF0sk42Mufy27WbWoPj4xwwsO8IZlwRLnpALvOZYzr0RPXL4EQh3ZyQOJq3oF9qf5P6tNJdpqlJ9TgfWoql6ankypKVdC7NaGXQIm3bX3HecYiW9gT2Jqb8tZ7kbOaSaqymZgF-7XYCLNAB40viqCqBtn43IrFh-ovkJCtDpRO9VXXFWkhCcNs_8PupfGs8HBxf2L_6GpbCJcMiZ5yUQRC8')",
                }}
              />
              <div
                className="w-10 h-10 rounded-full border-2 border-white bg-[#d8dadc] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG6VrFnjgL61Mcmjh_wn28Q9csl_G1YQ-KDZ3VQaPklFi1eRRNv6K-oOGmmQgypUeQj2C6n2Y67hC25nnuGLb_Aga40z-HvTe3bJzX-fJ-RCNn7nXTfriTZGiLOoiwg0KqTa-R0e96TawOs2iBVUvWjmMHQmm5nJro0o1IhlnGOUzfrRsxEnaTkrcS2zMiHfdT5pSnJm_G1y6vsgeJ0VOaCe39TlpEbDtHZ70yHNE6Ksy5Dszf39bO5wgo7ekbXSMt0e4xM77NA2I')",
                }}
              />
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-[#006948] text-white text-[10px] font-bold">
                5k+
              </div>
            </div>
            <p className="text-sm text-[#3d4a42] font-medium">
              Join over 5,000 trusted technicians and happy homeowners today.
            </p>
          </div>
        </div>
      </section>

      {/* Right Column: Auth Content */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 z-10">
        <div className="w-full max-w-120">
          {children}
          {/* Legal Note */}
          <p className="mt-8 text-[12px] text-center text-[#3d4a42] px-6">
            By continuing, you agree to Fixano&apos;s{" "}
            <a className="underline" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
