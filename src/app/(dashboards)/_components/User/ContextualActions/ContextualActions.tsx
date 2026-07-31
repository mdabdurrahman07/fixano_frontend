'use client';

import React from 'react';
import { CreditCard, Star, PlayCircle, XCircle } from 'lucide-react';
import { Booking } from '@/app/types/types';


interface ContextualActionsProps {
  booking: Booking;
}

export function ContextualActions({ booking }: ContextualActionsProps) {
  switch (booking.status) {
    case 'ACCEPTED':
      return (
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer">
          <CreditCard className="w-3.5 h-3.5" />
          Pay Now
        </button>
      );
    case 'COMPLETED':
      return (
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 border border-purple-200 rounded-lg transition-colors cursor-pointer">
          <Star className="w-3.5 h-3.5 fill-current" />
          Add Review
        </button>
      );
    case 'IN_PROGRESS':
      return (
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-lg cursor-default">
          <PlayCircle className="w-3.5 h-3.5" />
          Track Status
        </button>
      );
    case 'REQUESTED':
      return (
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-200 rounded-lg transition-colors cursor-pointer">
          <XCircle className="w-3.5 h-3.5" />
          Cancel
        </button>
      );
    default:
      return (
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
          View Details
        </button>
      );
  }
}