import React, { Suspense } from "react";
import Link from "next/link";
export interface PageProps {
  params: Promise<{ bookingId: string }>;
}
import {
  CreditCard,
  Calendar,
  Receipt,
  ArrowLeft,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { getPaymentStatus } from "../../_userActions/paymentStatus";
import { PaymentStatusBadge } from "../_components/PaymentStatusBadge";

async function PaymentContent({ bookingId }: { bookingId: string }) {
  const response = await getPaymentStatus(bookingId);

  if (!response?.success || !response?.data) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md mx-auto my-12 shadow-sm">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Payment Details Unavailable
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          {response?.message ||
            "We couldn't retrieve the payment status for this booking."}
        </p>
        <Link
          href="/user-dashboard"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const { amount, provider, status, paidAt, booking } = response.data;

  const serviceTitle = booking?.service?.title || "N/A";
  const categoryName = booking?.service?.category?.name || "N/A";
  const totalAmount = booking?.totalAmount || amount;

  const formattedDate = paidAt
    ? new Date(paidAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Status</h1>
          <p className="text-sm text-slate-500 mt-1">
            Booking Ref: #{bookingId}
          </p>
        </div>
        <PaymentStatusBadge status={status} />
      </div>

      {/* Primary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Paid
              </p>
              <p className="text-2xl font-bold text-slate-900">
                ${totalAmount}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Payment Provider
            </p>
            <p className="text-sm font-semibold text-slate-700">{provider}</p>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
            Details Summary
          </h3>
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4 font-medium">Field</th>
                  <th className="py-3 px-4 font-medium">Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-slate-500 flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-slate-400" /> Service Title
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {serviceTitle}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-slate-500 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Category
                  </td>
                  <td className="py-3.5 px-4">{categoryName}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-400" /> Base
                    Amount
                  </td>
                  <td className="py-3.5 px-4">${amount}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-slate-500 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-400" /> Total
                    Amount
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    ${totalAmount}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-slate-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Paid At
                  </td>
                  <td className="py-3.5 px-4">{formattedDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/user-dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default async function PaymentStatusPage({ params }: PageProps) {
  const { bookingId } = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500">
            Fetching live payment details...
          </p>
        </div>
      }
    >
      <PaymentContent bookingId={bookingId} />
    </Suspense>
  );
}
