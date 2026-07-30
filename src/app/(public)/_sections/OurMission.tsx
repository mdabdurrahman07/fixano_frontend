import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  DownloadCloud,
  Maximize2,
  UserShield,
} from "lucide-react";
import Badge from "@/components/shared/Badge";
import Link from "next/link";

export default function OurMission() {
  return (
    <section className="bg-white">
      <main className="py-15 overflow-hidden bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
        {/* Hero Header */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 text-center space-y-3">
          <Badge text="Our Mission" icon={UserShield} />
          {/* <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-on-surface max-w-3xl mx-auto mb-6 leading-tight">
          Revolutionizing how <span className="text-primary">homes</span> are
          cared for.
        </h1> */}
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Fixano was born from a simple belief, finding reliable home services
            should be as seamless as ordering a ride.
          </p>
        </section>

        {/* Mission Split Section */}
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Technician Image Component */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/5 lg:aspect-auto h-full min-h-120">
                <Image
                  unoptimized
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7-UlRAy0SlvkCziFlqMPMzQ811blKba-rxvF5t3wSd04f7P8Ap3R-Eubm_6Z_mHa-KMkCbdZ1F7SH-KG6mlQVhbsvzbZrO5rk41MOzFZHzQxuwN2RC50pu4QqH9W4pv36UQ2s6o3kpXQcNLhwXwOGMev7thovfxWC1LaNk_9NpFtufF6DeN9IOV_9Fe2RFfq1tmMdGgmqkhFyeoYBpPXIhOdUlzg3MzIXRF85w27BUAU1dIb198OG"
                  alt="A professional and friendly Fixano technician in a kitchen setting"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Floating Glass Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-6 flex items-center gap-4 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                    <BadgeCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-xl leading-tight text-on-surface text-white">
                      Verified Professionals
                    </p>
                    <p className="text-xs text-on-surface-variant text-slate-200">
                      Every technician is background checked.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Ambient Glows */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
            </div>

            {/* Right: Compelling Narrative */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold tracking-tight text-on-surface">
                  The Fixano Standard
                </h2>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  For decades, home maintenance has been a journey of
                  uncertainty—unreliable quotes, missed appointments, and a lack
                  of transparency. At Fixano, we are changing the narrative.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-surface-container-lowest border-outline-variant/30 rounded-2xl shadow-none hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <Maximize2 className="w-6 h-6 text-primary mb-4" />
                      <h3 className="font-display font-bold text-xl mb-2 text-on-surface">
                        Transparency
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        Upfront pricing and real-time tracking for every single
                        job.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-surface-container-lowest border-outline-variant/30 rounded-2xl shadow-none hover:-translate-y-1 transition-transform duration-300">
                    <CardContent className="p-6">
                      <DownloadCloud className="w-6 h-6 text-primary mb-4" />
                      <h3 className="font-display font-bold text-xl mb-2 text-on-surface">
                        Absolute Trust
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        Rigorous vetting ensures only the top 5% of pros join
                        our network.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <blockquote className="text-lg text-on-surface-variant leading-relaxed italic border-l-4 border-primary pl-6 py-1">
                  &ldquo;Our mission is to empower homeowners by providing a
                  digital-first platform where quality meets convenience,
                  ensuring peace of mind is just a tap away.&rdquo;
                </blockquote>
              </div>

              <div className="pt-4">
                <Link href="/technicians">
                  <Button
                    size="lg"
                    className="group bg-emerald-600 hover:bg-emerald-700 text-on-primary px-8 py-6 rounded-xl font-semibold text-base hover:bg-primary-container transition-all shadow-xl hover:shadow-primary/20 active:scale-95 border-none text-white"
                  >
                    Explore Technicians
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
