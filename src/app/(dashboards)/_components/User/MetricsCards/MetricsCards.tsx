import React from 'react';
import { Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { Booking } from '@/app/types/types';


interface MetricsCardsProps {
  bookings: Booking[];
}

export function MetricsCards({ bookings }: MetricsCardsProps) {
  const activeBookings = bookings.filter((b) =>
    ['REQUESTED', 'ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status)
  ).length;

  const paymentCompleted = bookings.filter((b) =>
    ['PAID', 'COMPLETED'].includes(b.status)
  ).length;

  const totalSpent = bookings
    .filter((b) => ['PAID', 'COMPLETED'].includes(b.status))
    .reduce((sum, b) => sum + parseFloat(b.totalAmount || '0'), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">Active Bookings</span>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-extrabold text-slate-900">{activeBookings}</span>
          <span className="text-xs font-medium text-emerald-600 ml-2">{paymentCompleted ? "Completed" : "Active or Ongoing"}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">Total Spent</span>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-extrabold text-slate-900">${totalSpent.toFixed(2)}</span>
          <span className="text-xs font-medium text-slate-400 ml-2">Lifetime spend</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">Payment Completed</span>
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-extrabold text-slate-900">{paymentCompleted}</span>
          <span className="text-xs font-medium text-purple-600 ml-2">Successful transactions</span>
        </div>
      </div>
    </div>
  );
}