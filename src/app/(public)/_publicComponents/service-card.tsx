"use client";

import { Service } from "@/app/types/types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";

;

interface ServiceCardProps {
  service: Service;
  index: number;
}

const categoryStyles: Record<string, string> = {
  Cleaning: "bg-blue-100 text-blue-700",
  "Home Cleaning": "bg-blue-100 text-blue-700",

  Plumbing: "bg-cyan-100 text-cyan-700",

  Electrical: "bg-yellow-100 text-yellow-700",

  HVAC: "bg-purple-100 text-purple-700",

  Landscaping: "bg-green-100 text-green-700",

  Painting: "bg-pink-100 text-pink-700",

  "Pest Control": "bg-orange-100 text-orange-700",

  "Appliance Repair": "bg-indigo-100 text-indigo-700",

  "Carpentry & Handyman": "bg-amber-100 text-amber-700",
};

const categoryGradients: Record<string, string> = {
  Cleaning: "from-blue-400 to-blue-600",
  "Home Cleaning": "from-blue-400 to-blue-600",

  Plumbing: "from-cyan-400 to-blue-500",

  Electrical: "from-yellow-400 to-orange-500",

  HVAC: "from-purple-400 to-pink-500",

  Landscaping: "from-green-400 to-emerald-600",

  Painting: "from-indigo-400 to-purple-600",

  "Pest Control": "from-orange-400 to-amber-600",

  "Appliance Repair": "from-indigo-400 to-blue-600",

  "Carpentry & Handyman": "from-amber-400 to-orange-600",
};

export function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
  const categoryName = service.category.name;

  const categoryColor =
    categoryStyles[categoryName] ??
    "bg-slate-100 text-slate-700";

  const categoryGradient =
    categoryGradients[categoryName] ??
    "from-slate-400 to-slate-600";

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
      {/* Image / Category Area */}
      <div
        className={`relative h-48 w-full overflow-hidden bg-linear-to-br ${categoryGradient}`}
      >
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />

        {/* Category */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${categoryColor}`}
        >
          {categoryName}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-slate-800 text-xs font-bold shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />

          <span>
            {service.technician.avgRating.toFixed(1)}
          </span>
        </div>

        {/* Status */}
        {!service.isActive && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-2">
            {service.title}
          </h3>

          <p className="text-slate-500 text-xs mt-1 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Technician / Duration */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <p className="text-xs font-medium text-slate-700">
              {service.durationMinutes} minutes
            </p>

            <p className="text-xs text-slate-400 mt-1">
              {service.technician.totalReviews} reviews
            </p>
          </div>

          <p className="text-emerald-600 font-extrabold text-lg">
            ${service.price}
          </p>
        </div>

        {/* Book */}
        <Link
          href={`/user-dashboard/createBooking/${service.id}`}
          className="block w-full"
        >
          <button
            disabled={!service.isActive}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95"
          >
            {service.isActive ? "Book Now" : "Unavailable"}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}