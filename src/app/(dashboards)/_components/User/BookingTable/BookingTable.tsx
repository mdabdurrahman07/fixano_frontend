import React from "react";
import { Star} from "lucide-react";
import { Booking } from "@/app/types/types";
import { BookingStatusBadge } from "../BookingStatusBadge/BookingStatusBadge";
import { ContextualActions } from "../ContextualActions/ContextualActions";


interface BookingsTableProps {
  bookings: Booking[];
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-900">My Bookings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of your recent services and requests.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-200/60 text-slate-700 rounded-md">
          Total: {bookings.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="px-6 py-3.5">
                Service
              </th>
              <th scope="col" className="px-6 py-3.5">
                Technician
              </th>
              <th scope="col" className="px-6 py-3.5">
                Date
              </th>
              <th scope="col" className="px-6 py-3.5">
                Amount
              </th>
              <th scope="col" className="px-6 py-3.5">
                Status
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {bookings.map((booking) => {
              const formattedDate = new Date(
                booking.scheduledAt,
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              const formattedTime = new Date(
                booking.scheduledAt,
              ).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="font-semibold text-slate-900 truncate">
                        {booking.service?.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {booking.service?.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-200">
                        {booking.technician?.user?.name
                          ? booking.technician.user.name.charAt(0)
                          : "T"}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {booking.technician?.user?.name ||
                            "Assigned Technician"}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-slate-500">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{booking.technician?.avgRating ?? 0}</span>
                          <span className="text-slate-300">•</span>
                          <span>
                            {booking.technician?.yearsExperience ?? 0} yrs exp
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs">
                      <p className="font-medium text-slate-800">
                        {formattedDate}
                      </p>
                      <p className="text-slate-400">{formattedTime}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-900 text-sm">
                      ${parseFloat(booking.totalAmount || "0").toFixed(2)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <BookingStatusBadge status={booking.status} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ContextualActions booking={booking} />
                      {/* <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
