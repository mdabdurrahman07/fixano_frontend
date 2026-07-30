"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Clock3, DollarSign, Star, Wrench } from "lucide-react";
import Link from "next/link";
import { Technician } from "@/app/types/types";

interface TechnicianCardProps {
  technician: Technician;
  index: number;
}

export function TechnicianCard({ technician, index }: TechnicianCardProps) {
  const serviceCount = technician.services.length;
  const workingDays = technician.availabilities.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
      }}
      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group"
    >
      {/* Profile Header */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-600">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />

        {/* Verified */}
        {technician.isVerified && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 shadow-xs">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-slate-800 text-xs font-bold shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />

          <span>{technician.avgRating.toFixed(1)}</span>
        </div>

        {/* Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/80 shadow-lg">
            <Image
              unoptimized
              src={technician.user.avatarUrl}
              alt={technician.user.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Name / Bio */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base truncate">
              {technician.user.name}
            </h3>

            {technician.isVerified && (
              <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
          </div>

          <p className="text-slate-500 text-xs mt-2 line-clamp-3">
            {technician.bio}
          </p>
        </div>

        {/* Experience / Reviews */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400">Experience</p>

            <p className="text-sm font-semibold text-slate-700 mt-1">
              {technician.yearsExperience}{" "}
              {technician.yearsExperience === 1 ? "year" : "years"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Reviews</p>

            <p className="text-sm font-semibold text-slate-700 mt-1">
              {technician.totalReviews}
            </p>
          </div>
        </div>

        {/* Services / Availability */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />

            <span>
              {serviceCount} {serviceCount === 1 ? "service" : "services"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock3 className="w-3.5 h-3.5" />

            <span>
              {workingDays} {workingDays === 1 ? "day" : "days"} available
            </span>
          </div>
        </div>

        {/* Rate / Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400">Hourly rate</p>

            <p className="text-emerald-600 font-extrabold text-lg flex items-center mt-1">
              <DollarSign className="w-4 h-4" />
              {technician.hourlyRate}
            </p>
          </div>

          <Link
            href={`/technicians/${technician.id}`}
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
