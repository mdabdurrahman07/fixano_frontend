import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Handshake,
  BadgeCheck,
  CreditCard,
  Heart,
  ArrowRight,
  Wrench,
} from "lucide-react";

export const metadata = {
  title: "About Us | Fixano - Revolutionizing Home Services",
  description:
    "Fixano is on a mission to simplify home maintenance by connecting homeowners with verified professionals.",
};
const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* Our Story Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
                <Image
                  unoptimized
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZOESm6QSnW2i_hXzvQACHaKbQappMSarOjYEpfjOazAsYZluXTZeZC5sd3VkeT6pQYJqWRM2I5X40aPaKjdN0Yyomo2dLXAnrUDGWeFo51HWNWpA2Anqsq_AsBjgo5Pnv8PnbKBaXmTFtM4Fg5E3FXEuLH3nwgWwN2N8brFD8KInuneFqCyCT_JPBK8yK0_Uy7Wzf2-yorwrp4mRu69FcCXK28wvpx0tDgl7j0imt1nihu9rILijEGo1zaj7TY4-o_auGD8tM-VE"
                  alt="Hands collaborating over home designs"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-[#191c1e]">Our Story</h2>
              <p className="text-[#545f73] leading-relaxed">
                Fixano began with a simple observation: finding a reliable
                professional for home repairs was unnecessarily stressful. From
                ambiguous pricing to missed appointments, the friction in the
                home services industry was dampening the joy of homeownership.
              </p>
              <p className="text-[#545f73] leading-relaxed">
                In 2020, we set out to build a platform rooted in radical
                transparency and unwavering trust. By combining rigorous
                technician verification with an intuitive digital booking
                system, we&apos;ve transformed &quot;getting things fixed&quot;
                from a chore into a seamless experience.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 p-4 border border-[#bccac0]/30 rounded-2xl bg-[#ffffff] shadow-sm">
                  <Handshake className="text-[#006948] w-8 h-8 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm text-[#191c1e]">
                      Founded on Trust
                    </div>
                    <p className="text-xs text-[#545f73]">
                      A community built on reliable partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 bg-[#f2f4f6]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center mb-16">
            <h2 className="text-3xl font-bold text-[#191c1e] mb-4">
              Values That Drive Us
            </h2>
            <p className="text-[#545f73] text-lg max-w-2xl mx-auto">
              We believe that a better home service experience starts with a
              commitment to these four pillars.
            </p>
          </div>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-sm">
              <div className="w-14 h-14 bg-[#006948]/10 rounded-2xl flex items-center justify-center text-[#006948] mb-6">
                <BadgeCheck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-[#191c1e] mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-[#545f73] text-sm leading-relaxed">
                We stand by every job. If it’s not right, we’ll make it
                right—every single time.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-sm">
              <div className="w-14 h-14 bg-[#006948]/10 rounded-2xl flex items-center justify-center text-[#006948] mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-[#191c1e] mb-3">
                Verified Pros
              </h3>
              <p className="text-[#545f73] text-sm leading-relaxed">
                Our 20-point vetting process ensures only the most skilled
                experts enter your home.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-sm">
              <div className="w-14 h-14 bg-[#006948]/10 rounded-2xl flex items-center justify-center text-[#006948] mb-6">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-[#191c1e] mb-3">
                Transparent Pricing
              </h3>
              <p className="text-[#545f73] text-sm leading-relaxed">
                No hidden fees or surprise surcharges. You see the price before
                you book.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:-translate-y-2 transition-all duration-300 shadow-sm">
              <div className="w-14 h-14 bg-[#006948]/10 rounded-2xl flex items-center justify-center text-[#006948] mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-[#191c1e] mb-3">
                Customer First
              </h3>
              <p className="text-[#545f73] text-sm leading-relaxed">
                Our support team and technicians are dedicated to your peace of
                mind.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="p-10 lg:p-12 rounded-3xl bg-[#006948] text-white flex flex-col justify-center relative overflow-hidden group shadow-lg">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                To empower people to maintain and improve their homes through a
                trusted, data-driven platform that delivers expert craftsmanship
                at the touch of a button.
              </p>
            </div>
            <div className="p-10 lg:p-12 rounded-3xl bg-[#2d3133] text-[#f7f9fb] flex flex-col justify-center relative overflow-hidden group shadow-lg">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#68dba9]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg opacity-90 leading-relaxed">
                To become the world&apos;s most trusted partner for home care,
                setting the global standard for reliability, technician
                livelihoods, and household happiness.
              </p>
            </div>
          </div>
        </section>

        {/* Join the Journey CTA */}
        <section className="py-24 bg-[#ffffff]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white/80 backdrop-blur-md p-10 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden border border-[#006948]/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#006948] to-transparent"></div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#191c1e] mb-6">
                Ready to join the journey?
              </h2>
              <p className="text-[#545f73] text-lg mb-12 max-w-xl mx-auto">
                Whether you&apos;re looking for help with your next project or
                you&apos;re a pro looking to grow your business, there&apos;s a
                place for you at Fixano.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/services">
                  <button className="bg-[#006948] text-white px-10 py-5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#00855d] transition-all shadow-lg active:scale-95 group">
                    Find Best Services
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/technicians">
                  <button className="bg-[#545f73]/10 text-[#3d4a42] border border-[#bccac0]/30 px-10 py-5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#545f73]/20 transition-all active:scale-95">
                    Find a Technician
                    <Wrench className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
