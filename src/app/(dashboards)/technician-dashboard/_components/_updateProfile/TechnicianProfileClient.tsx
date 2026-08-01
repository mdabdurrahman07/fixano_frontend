"use client";

import React, { useMemo } from "react";
import Image from "next/image";

import { Star, ShieldCheck, DollarSign, Wrench, Clock } from "lucide-react";
import { Technician } from "../../_types/technicianProfileTypes";
import { useAuthStore } from "@/store/auth.store";
import UpdateProfileModal from "./updateProfileModal";

interface TechnicianProfileClientProps {
  technicians: Technician[];
}

export default function TechnicianProfileClient({
  technicians,
}: TechnicianProfileClientProps) {
  const user = useAuthStore((state) => state.user);

  // Match current technician using logged-in user.id
  const currentTechnician = useMemo(() => {
    if (!user?.id) return null;
    return technicians.find((tech) => tech.userId === user.id) || null;
  }, [technicians, user]);

  if (!currentTechnician) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500 font-medium">
          Technician profile not found.
        </p>
      </div>
    );
  }

  const avatarUrl =
    currentTechnician.user?.avatarUrl ||
    "https://i.ibb.co.com/ZhfjdB1/photo-1507003211169-0a1dd7228f2d.jpg";
  const name = currentTechnician.user?.name || user?.name || "Technician";
  const totalServices = currentTechnician.services?.length || 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Technician Profile
          </h1>
          <p className="text-xs text-slate-500">
            Manage your operational details and rate
          </p>
        </div>
        <div>
          <UpdateProfileModal technician={currentTechnician} />
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Main Banner / Avatar Section */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
            <Image unoptimized src={avatarUrl} alt={name} fill className="object-cover" />
          </div>

          <div className="space-y-1.5 grow">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{name}</h2>
              {currentTechnician.isVerified && (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              )}
            </div>

            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {currentTechnician.bio || "No bio added yet."}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 bg-slate-50/50">
          <div className="p-4 text-center">
            <div className="inline-flex items-center gap-1.5 text-amber-500 mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-lg font-bold text-slate-800">
                {currentTechnician.avgRating
                  ? currentTechnician.avgRating.toFixed(1)
                  : "N/A"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Rating ({currentTechnician.reviews?.length} reviews)
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="inline-flex items-center gap-1 text-slate-800 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-lg font-bold">
                ${parseFloat(String(currentTechnician.hourlyRate)).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Hourly Rate</p>
          </div>

          <div className="p-4 text-center">
            <div className="inline-flex items-center gap-1.5 text-slate-800 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-lg font-bold">
                {currentTechnician.yearsExperience} Yrs
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Experience</p>
          </div>

          <div className="p-4 text-center">
            <div className="inline-flex items-center gap-1.5 text-slate-800 mb-1">
              <Wrench className="w-4 h-4 text-purple-600" />
              <span className="text-lg font-bold">{totalServices}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Total Services</p>
          </div>
        </div>
      </div>
    </div>
  );
}
