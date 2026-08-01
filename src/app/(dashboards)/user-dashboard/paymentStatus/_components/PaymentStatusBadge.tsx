import React from "react";
import { CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { PaymentStatusBadgeProps } from "../_types/paymentsTypes";


export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const normalizedStatus = status?.toUpperCase();

  switch (normalizedStatus) {
    case "COMPLETED":
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Completed
        </span>
      );
    case "PENDING":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Pending
        </span>
      );
    case "PROCESSING":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
          Processing
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800 border border-rose-200">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          {status || "Failed"}
        </span>
      );
  }
}