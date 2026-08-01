import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getAllTechnicians } from "../_technicianActions/getAllTechnician";
import AvailabilityClient from "../_components/AvailabilityClient/AvailabilityClient";

async function AvailabilityFetcher() {
  const techniciansRes = await getAllTechnicians();
  const technicians = techniciansRes?.data || [];

  return <AvailabilityClient technicians={technicians} />;
}

export default function AvailabilityPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-100">
            <Loader2 className="w-10 h-10 animate-spin text-green-600 mb-2" />
            <p className="text-sm text-slate-500">
              Loading availability schedules...
            </p>
          </div>
        }
      >
        <AvailabilityFetcher />
      </Suspense>
    </main>
  );
}
