"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Technician } from "@/app/(public)/technicians/_types/types";

interface HeaderProps {
  technician: Technician;
}

export const TechnicianHeader: React.FC<HeaderProps> = ({ technician }) => {
  const name = technician.user.name || "Technician Profile";
  const avatarUrl =
    technician.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";

  return (
    <header className="relative mb-6">
      {/* Cover Banner */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden bg-linear-to-br from-[#059669] via-emerald-700 to-[#047857]">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Actions */}
        <div className="absolute top-6 left-4 md:left-10 z-10">
          <Button
            asChild
            size="icon-lg"
            variant="ghost"
            className="rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40"
          >
            <Link href="/technicians">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Overlay Card */}
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 -mt-16 relative z-20">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full md:w-auto">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-slate-900 shadow-md overflow-hidden shrink-0 bg-slate-100">
                <Image
                  unoptimized
                  src={avatarUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {name}
                  </h1>
                  {technician.isVerified && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-600/10" />
                  )}
                </div>

                <p className="text-base font-semibold text-emerald-700 dark:text-emerald-400">
                  {technician.yearsExperience} Years Experience
                </p>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-lg text-sm font-semibold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{technician.avgRating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-slate-500 underline underline-offset-4">
                    {technician?.reviews?.length} reviews
                  </span>
                </div>
              </div>
            </div>

            {/* <Button
              size="lg"
              className="w-full md:w-auto px-8 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-semibold shadow-md"
            >
              Book Technician
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};
