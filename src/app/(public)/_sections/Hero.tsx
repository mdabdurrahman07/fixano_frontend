"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Search, ShieldCheck, ChevronDown} from "lucide-react";
import Badge from "@/components/shared/Badge";
import Link from "next/link";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxImageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const parallaxBadgeY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden py-24 bg-slate-50/50"
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-500/10 rounded-l-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 -z-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 relative z-10"
        >
          <div className="space-y-4">
            {/* Badge */}

            <Badge text="Verified Professionals Only" icon={ShieldCheck} />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Expert home services, <br />
              <span className="text-emerald-600">at your fingertips</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              From leaking pipes to flickering lights, find verified
              professionals for every home repair task in minutes.
            </p>
          </div>

          {/* Search Box */}
          <div className="glass p-2.5 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl border border-white/60">
            <div className="flex-1 relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need?"
                className="w-full pl-11 pr-4 py-3 bg-transparent border-none text-slate-900 text-sm focus:outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="h-8 w-px bg-slate-200 hidden md:block self-center" />

            <div className="relative min-w-40 flex items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-3 pl-4 pr-8 bg-transparent border-none text-slate-700 text-sm focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">Select Category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="handyman">Handyman</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 pointer-events-none text-slate-400" />
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95">
              <Link href="/services">
              Search
              </Link>
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Popular:
            </span>
            <div className="flex flex-wrap gap-2">
              {["Plumbing", "Electrical", "Cleaning"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium hover:border-emerald-600 hover:text-emerald-600 transition-all shadow-xs"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Visual Column with Parallax */}
        <div className="relative">
          <div className="absolute -inset-2 bg-emerald-500/10 rounded-3xl -rotate-2 -z-10" />

          <motion.div
            style={{ y: parallaxImageY }}
            className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              unoptimized
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
              alt="Professional Technician"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Parallax Floating Rating Badge */}
          <motion.div
            style={{ y: parallaxBadgeY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -left-6 bottom-10 glass p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              ★
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">
                Trusted Pro 4.9/5
              </p>
              <p className="text-slate-500 text-xs">Over 10,000+ Reviews</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
