import { BookingStatus } from '@/app/types/types';
import React from 'react';


interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const getBadgeStyle = (status: BookingStatus) => {
    switch (status) {
      case 'REQUESTED':
        return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A] hover:bg-[#FDE68A]';
      case 'ACCEPTED':
        return 'bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE] hover:bg-[#BFDBFE]';
      case 'DECLINED':
        return 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5] hover:bg-[#FCA5A5]';
      case 'PAID':
        return 'bg-[#F3E8FF] text-[#9333EA] border-[#E9D5FF] hover:bg-[#E9D5FF]';
      case 'IN_PROGRESS':
        return 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0] hover:bg-[#BBF7D0]';
      case 'COMPLETED':
        return 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB] hover:bg-[#E5E7EB]';
      case 'CANCELLED':
        return 'bg-[#7F1D1D] text-[#FEF2F2] border-[#991B1B] hover:bg-[#991B1B]';
      default:
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
    }
  };

  const formatLabel = (str: string) => {
    return str.replace('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${getBadgeStyle(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {formatLabel(status)}
    </span>
  );
}