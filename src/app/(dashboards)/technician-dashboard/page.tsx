import React, { Suspense } from "react";

import { Loader2 } from "lucide-react";
import { getTechnicianBookings } from "./_technicianActions/getTechnicianBooking";
import DashboardClient from "./_components/_techDashComponents/TechnicianDashboard/TechnicianDashboard";

async function DashboardDataFetcher() {
  const response = await getTechnicianBookings();

  if (!response.success) {
    return (
      <div className="p-8 text-center text-rose-600 bg-rose-50 rounded-xl border border-rose-200 max-w-xl mx-auto my-12">
        <h3 className="font-bold text-lg mb-1">Failed to load Dashboard</h3>
        <p className="text-sm">{response.message}</p>
      </div>
    );
  }

  return <DashboardClient initialBookings={response.data || []} />;
}

export default function TechnicianDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-100">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-2" />
            <p className="text-sm text-slate-500">Loading dashboard data...</p>
          </div>
        }
      >
        <DashboardDataFetcher />
      </Suspense>
    </main>
  );
}
