"use client";

import React from "react";
import { CreditCard, Star, ShieldAlert, X } from "lucide-react";
import { Booking } from "@/app/types/types";
import Link from "next/link";

interface ContextualActionsProps {
  booking: Booking;
}

export function ContextualActions({ booking }: ContextualActionsProps) {
  switch (booking.status) {
    case "ACCEPTED":
      return (
        <Link href={`/user-dashboard/payment/${booking.id}`}>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer">
          <CreditCard className="w-3.5 h-3.5" />
          Pay Now
        </button>
         </Link>
      );
    case "PAID":
      return (
        <Link href={`/user-dashboard/myReview/${booking.id}`}>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 border border-purple-200 rounded-lg transition-colors cursor-pointer">
            <Star className="w-3.5 h-3.5 fill-current" />
            Add Review
          </button>
        </Link>
      );
    case "DECLINED":
      return (
        <Link href={"/services"}>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-lg cursor-default"
        >
          <X className="w-3.5 h-3.5" />
          Try Again
        </button>
        </Link>
      );
    case "REQUESTED":
      return (
        <button
          disabled
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-200 rounded-lg transition-colors cursor-pointer"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          REQUESTED
        </button>
      );
    default:
      return (
        <button
          disabled
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          No Action
        </button>
      );
  }
}
