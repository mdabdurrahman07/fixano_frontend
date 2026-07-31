import React, { Suspense } from "react";
import { BookingsContent } from "../_components/User/BookingContent/BookingContent";

function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
      <div className="h-12 w-64 bg-slate-200 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="h-28 bg-slate-200 rounded-xl" />
        <div className="h-28 bg-slate-200 rounded-xl" />
        <div className="h-28 bg-slate-200 rounded-xl" />
      </div>
      <div className="h-96 bg-slate-200 rounded-xl" />
    </div>
  );
}

const UserDashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8 font-sans">
      <Suspense fallback={<DashboardSkeleton />}>
        <BookingsContent />
      </Suspense>
    </div>
  );
};

export default UserDashboardPage;
