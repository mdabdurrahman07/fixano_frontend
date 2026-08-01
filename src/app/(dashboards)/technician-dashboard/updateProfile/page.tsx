import React, { Suspense } from "react";

import { Loader2 } from "lucide-react";
import { getAllTechnicians } from "../_technicianActions/getAllTechnician";
import TechnicianProfileClient from "../_components/_updateProfile/TechnicianProfileClient";

async function ProfileFetcher() {
  const techniciansRes = await getAllTechnicians();
  const technicians = techniciansRes?.data || [];

  return <TechnicianProfileClient technicians={technicians} />;
}

export default function TechnicianProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-100">
            <Loader2 className="w-10 h-10 animate-spin text-green-600 mb-2" />
            <p className="text-sm text-slate-500">Loading profile data...</p>
          </div>
        }
      >
        <ProfileFetcher />
      </Suspense>
    </main>
  );
}
