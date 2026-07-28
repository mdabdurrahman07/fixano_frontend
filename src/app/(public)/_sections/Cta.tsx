import Image from "next/image";
import React from "react";

const Cta = () => {
  return (
    <div>
      <section className="px-margin-desktop bg-surface-bright dark:bg-surface-dim">
        <div className="max-w-container-max mx-auto overflow-hidden r relative group">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1688516353448-2351953b4b76?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              unoptimized
              alt="cta-bg"
              fill
            />
            {/* <img src="User Uploaded Image 1" alt="Home service background" className="w-full h-full object-cover"> */}
            <div className="absolute inset-0 bg-primary/90 dark:bg-primary-fixed-dim/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-secondary/60"></div>
          </div>

          <div className="relative z-10 py-20 px-8 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to fix that problem?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed font-body">
              Join thousands of homeowners who trust Fixano for their daily home
              maintenance and emergency repairs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Get Started Now
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
                Become a Technician
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cta;
