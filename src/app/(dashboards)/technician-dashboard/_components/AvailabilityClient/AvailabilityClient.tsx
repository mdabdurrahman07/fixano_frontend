"use client";

import React, { useMemo } from "react";

import { Clock, CalendarX, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Technician } from "../../_types/technicianProfileTypes";
import SetAvailabilityModal from "../_availabilityModal/AvailabilityModal";

interface AvailabilityClientProps {
  technicians: Technician[];
}

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailabilityClient({ technicians }: AvailabilityClientProps) {
  const user = useAuthStore((state) => state.user);

  // Match current technician & sort availability slots by day (0 to 6)
  const sortedAvailabilities = useMemo(() => {
    if (!user?.id) return [];

    const currentTech = technicians.find((tech) => tech.userId === user.id);
    if (!currentTech || !currentTech.availabilities) return [];

    return [...currentTech.availabilities].sort(
      (a, b) => a.dayOfWeek - b.dayOfWeek
    );
  }, [technicians, user]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Working Hours</h1>
          <p className="text-xs text-slate-500">Configure your active weekly availability schedule</p>
        </div>
        <div>
          <SetAvailabilityModal />
        </div>
      </div>

      {/* Availability List / Schedule Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          Active Availability Slots
        </h2>

        {sortedAvailabilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-lg">
            <CalendarX className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-slate-700 font-medium">No availability configured</p>
            <p className="text-xs text-slate-400 mt-1">
              Click <span className="font-semibold text-slate-600">Set Availability</span> above to define your weekly work hours.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedAvailabilities.map((slot) => (
              <div
                key={slot.id || slot.dayOfWeek}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-200 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-800 text-sm">
                      {DAY_NAMES[slot.dayOfWeek]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono pl-5">
                    {slot.startTime} – {slot.endTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}