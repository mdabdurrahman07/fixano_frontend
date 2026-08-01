"use client";

import React, { useState, useTransition } from "react";

import {
  DollarSign,
  CheckCircle2,
  Clock,
  Star,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { Booking } from "../../../_types/_techDashTypes";
import { updateBookingStatus } from "../../../_technicianActions/updateBookingStatus";
import Image from "next/image";

interface DashboardClientProps {
  initialBookings: Booking[];
}

export default function DashboardClient({
  initialBookings,
}: DashboardClientProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isPending, startTransition] = useTransition();
  const [activeProcessingId, setActiveProcessingId] = useState<string | null>(
    null,
  );

  // Compute Metrics
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED" || b.status === "PAID",
  );

  const pendingOrActiveBookings = bookings.filter(
    (b) =>
      b.status !== "COMPLETED" &&
      b.status !== "DECLINED" &&
      b.status !== "CANCELLED",
  );

  const totalEarnings = completedBookings.reduce(
    (acc, b) => acc + (parseFloat(b.totalAmount) || 0),
    0,
  );

  const upcomingJobsCount = completedBookings
    ? 0
    : pendingOrActiveBookings.length;
  const completedJobsCount = completedBookings.length;

  // Handle Accept / Decline Action
  const handleStatusChange = async (
    bookingId: string,
    newStatus: "ACCEPTED" | "DECLINED",
  ) => {
    setActiveProcessingId(bookingId);

    // Optimistic UI update to remove action buttons immediately
    setBookings((prev) =>
      prev.map((item) =>
        item.id === bookingId
          ? {
              ...item,
              status: newStatus === "ACCEPTED" ? "ACCEPTED" : "DECLINED",
            }
          : item,
      ),
    );

    startTransition(async () => {
      const res = await updateBookingStatus(bookingId, newStatus);
      if (!res.success) {
        // Revert on error
        setBookings(initialBookings);
        alert(res.message || "Failed to update status.");
      }
      setActiveProcessingId(null);
    });
  };

  // Helper for status badge styles
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
            Pending
          </span>
        );
      case "ACCEPTED":
      case "IN_PROGRESS":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            In Progress
          </span>
        );
      case "PAID":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
            Paid
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Completed
          </span>
        );
      case "DECLINED":
      case "CANCELLED":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Earnings</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              ${totalEarnings.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Upcoming Jobs</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {upcomingJobsCount}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Completed Jobs</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {completedJobsCount}
            </h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table 1: Pending Requests & Active Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">
            Pending Requests & Active Tasks
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Estimated</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingOrActiveBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No active or pending requests.
                  </td>
                </tr>
              ) : (
                pendingOrActiveBookings.map((job) => {
                  const isPendingStatus = job.status === "PENDING";
                  const isProcessing =
                    activeProcessingId === job.id && isPending;

                  return (
                    <tr key={job.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Image
                            unoptimized
                            src={
                              job.customer?.avatarUrl ||
                              "/avatar-placeholder.png"
                            }
                            alt={job.customer?.name}
                            width={25}
                            height={20}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-semibold text-slate-800">
                              {job.customer?.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {job.customer?.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-700">
                        {job.service?.title}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {new Date(job.scheduledAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        ${job.totalAmount}
                      </td>
                      <td className="py-4 px-4">
                        {renderStatusBadge(job.status)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isPendingStatus ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              disabled={isProcessing}
                              onClick={() =>
                                handleStatusChange(job.id, "ACCEPTED")
                              }
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition disabled:opacity-50"
                            >
                              {isProcessing ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                              Accept
                            </button>
                            <button
                              disabled={isProcessing}
                              onClick={() =>
                                handleStatusChange(job.id, "DECLINED")
                              }
                              className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition disabled:opacity-50"
                            >
                              <X className="w-3.5 h-3.5" />
                              Decline
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            No actions
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Completed Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Completed Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Estimated</th>
                <th className="py-3 px-4">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completedBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No completed jobs found.
                  </td>
                </tr>
              ) : (
                completedBookings.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Image
                          unoptimized
                          src={
                            job.customer?.avatarUrl || "/avatar-placeholder.png"
                          }
                          alt={job.customer?.name}
                          width={25}
                          height={20}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {job.customer?.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {job.customer?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {new Date(job.scheduledAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      ${job.totalAmount}
                    </td>
                    <td className="py-4 px-4">
                      {job.reviews?.rating ? (
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < job.reviews!.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-semibold text-slate-600 ml-1">
                            ({job.reviews.rating}.0)
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No rating yet
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
