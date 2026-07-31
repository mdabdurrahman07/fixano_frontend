import React from "react";

import Image from "next/image";
import { getMyBookings } from "@/app/(dashboards)/user-dashboard/_userActions/getMyBookings";
import { MetricsCards } from "../MetricsCards/MetricsCards";
import { BookingsTable } from "../BookingTable/BookingTable";

export async function BookingsContent() {
  const response = await getMyBookings();
  const bookings = response.data || [];
  const customer = bookings[0]?.customer;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back, {customer?.name || "User"}!
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your bookings, schedules, and service updates.
          </p>
        </div>
        {customer && (
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-slate-200 shadow-2xs">
            <Image
              unoptimized
              src={customer.avatarUrl}
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover border border-slate-100"
              width={50}
              height={50}
            />
            <div className="pr-3 text-left">
              <p className="text-xs font-semibold text-slate-800">
                {customer.name}
              </p>
              <p className="text-[10px] text-slate-400">{customer.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <MetricsCards bookings={bookings} />

      {/* Table */}
      <BookingsTable bookings={bookings} />
    </div>
  );
}
