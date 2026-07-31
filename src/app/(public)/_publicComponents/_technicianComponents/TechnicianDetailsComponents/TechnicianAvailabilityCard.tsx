"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ShieldCheck,
  Award,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Availability,
  Technician,
} from "@/app/(public)/technicians/_types/types";
import { DAYS_OF_WEEK, formatTime } from "@/lib/formatters";
import Link from "next/link";

interface AvailabilityCardProps {
  technician: Technician;
}

export const TechnicianAvailabilityCard: React.FC<AvailabilityCardProps> = ({
  technician,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Weekly Schedule
          </h2>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Active
          </span>
        </div>

        {/* Weekly Availabilities */}
        <div className="space-y-3 mb-6">
          {technician.availabilities && technician.availabilities.length > 0 ? (
            technician.availabilities.map((avail: Availability) => {
              const dayName = DAYS_OF_WEEK[avail.dayOfWeek] || "Day";
              const isSelected = selectedSlot === avail.id;

              return (
                <button
                  key={avail.id}
                  onClick={() => setSelectedSlot(avail.id)}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex justify-between items-center ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 font-medium"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{dayName}:</span>
                    <span>
                      {formatTime(avail.startTime)} -{" "}
                      {formatTime(avail.endTime)}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 py-4 text-center">
              No availability schedule posted.
            </p>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Base Rate
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              ${technician.hourlyRate}/hr
            </span>
          </div>
          {technician?.services?.map((s) => (
            <Link key={s.id} href={`/user-dashboard/createBooking/${s.id}`}>
              <Button
                size="lg"
                className="w-full py-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-semibold shadow-md"
              >
                Book Technician Service
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl space-y-4 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-600 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Background Checked
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-600 shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Verified Service Professional
          </p>
        </div>
      </div>
    </div>
  );
};
