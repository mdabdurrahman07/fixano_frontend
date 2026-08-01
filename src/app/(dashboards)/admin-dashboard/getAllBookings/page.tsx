import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
;
import { CalendarCheck, DollarSign, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Booking, GetAllBookingsResponse } from "../adminTypes/adminTypes";
import { getAllBookings } from "../_adminActions/getAllBookings";

// Skeleton Loading Component
function BookingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl" />
        ))}
      </div>
      <div className="h-96 bg-slate-100 rounded-xl" />
    </div>
  );
}

// Helper to render Paid vs Non-Paid Status Badges
function renderStatusBadge(status: Booking["status"]) {
  const isPaid = status === "PAID";

  if (isPaid) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full font-semibold bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="w-3.5 h-3.5" />
        PAID
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full font-semibold bg-amber-100 text-amber-700">
      <AlertCircle className="w-3.5 h-3.5" />
      {status || "UNPAID"}
    </span>
  );
}


async function BookingsContent() {
  const bookingsRes: GetAllBookingsResponse = await getAllBookings();
  const bookingsList: Booking[] = bookingsRes?.data || [];

  // Categorize Paid vs Non-Paid Bookings
  const totalBookings = bookingsList.length;
  const paidBookings = bookingsList.filter((b) => b.status === "PAID");
  const nonPaidBookings = bookingsList.filter((b) => b.status !== "PAID");

  const totalPaidAmount = paidBookings.reduce(
    (sum, b) => sum + parseFloat(b.totalAmount || "0"),
    0
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Total Bookings</p>
            <p className="text-2xl font-bold mt-1 text-slate-900">
              {totalBookings}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 text-blue-600">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Paid Bookings</p>
            <p className="text-2xl font-bold mt-1 text-slate-900">
              {paidBookings.length}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Non-Paid Bookings</p>
            <p className="text-2xl font-bold mt-1 text-slate-900">
              {nonPaidBookings.length}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Total Paid Amount</p>
            <p className="text-2xl font-bold mt-1 text-slate-900">
              ${totalPaidAmount.toFixed(2)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-100 p-4">
          <CardTitle className="text-lg font-semibold text-slate-800">
            All Service Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="w-full text-left text-sm">
            <TableHeader className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
              <TableRow className="hover:bg-transparent border-b-slate-200">
                <TableHead className="py-3 px-4 font-semibold text-slate-600 w-16">
                  SL
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600">
                  Scheduled At
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600">
                  Amount
                </TableHead>
                <TableHead className="py-3 px-4 font-semibold text-slate-600 text-center">
                  Payment Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {bookingsList.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-slate-500"
                  >
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookingsList.map((booking: Booking, index: number) => {
                  return (
                    <TableRow
                      key={booking.id}
                      className="hover:bg-slate-50 transition border-b-slate-100"
                    >
                      {/* Serial Number */}
                      <TableCell className="py-4 px-4 font-semibold text-slate-500">
                        #{String(index + 1).padStart(2, "0")}
                      </TableCell>

                      {/* Scheduled Time */}
                      <TableCell className="py-4 px-4 text-slate-700 font-medium">
                        {new Date(booking.scheduledAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </TableCell>

                      {/* Booking Amount */}
                      <TableCell className="py-4 px-4 font-semibold text-slate-900">
                        ${parseFloat(booking.totalAmount || "0").toFixed(2)}
                      </TableCell>

                      {/* Payment Status (Paid / Non-Paid) */}
                      <TableCell className="py-4 px-4 text-center">
                        {renderStatusBadge(booking.status)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

// Main All Bookings Page Component
export default function AllBookingsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Bookings Management
        </h1>
        <p className="text-sm text-slate-500">
          Monitor all paid and non-paid booking records across the platform.
        </p>
      </div>

      <Suspense fallback={<BookingsSkeleton />}>
        <BookingsContent />
      </Suspense>
    </div>
  );
}