import React, { Suspense } from "react";
import { ApiResponse, Technician } from "../_types/types";
import { getSingleTechnician } from "../../_publicAction/getSingleTechnician";
import { TechnicianHeader } from "../../_publicComponents/_technicianComponents/TechnicianDetailsComponents/TechnicianHeader";
import { TechnicianAbout } from "../../_publicComponents/_technicianComponents/TechnicianDetailsComponents/TechnicianAbout";
import { TechnicianAvailabilityCard } from "../../_publicComponents/_technicianComponents/TechnicianDetailsComponents/TechnicianAvailabilityCard";
import { TechnicianSkeleton } from "../../_publicComponents/_technicianComponents/TechnicianDetailsComponents/skeleton/TechnicianDetailsPageSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function TechnicianContent({ id }: { id: string }) {
  const response: ApiResponse<Technician> = await getSingleTechnician({ id });

  if (!response?.success || !response?.data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-slate-500 font-medium">
          Technician details not found.
        </p>
      </div>
    );
  }

  const technician = response.data;

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-24">
      <TechnicianHeader technician={technician} />

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TechnicianAbout technician={technician} />
          </div>
          <div>
            <TechnicianAvailabilityCard technician={technician} />
          </div>
        </div>
      </div>

      {/* Floating Sticky Mobile Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-50 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500">Hourly Rate</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            ${technician.hourlyRate}/hr
          </p>
        </div>
        <button className="flex-1 py-3 bg-emerald-700 text-white rounded-xl font-semibold shadow-md active:scale-95 transition-transform">
          Book Now
        </button>
      </div>
    </main>
  );
}

export default async function TechnicianDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<TechnicianSkeleton />}>
      <TechnicianContent id={id} />
    </Suspense>
  );
}
