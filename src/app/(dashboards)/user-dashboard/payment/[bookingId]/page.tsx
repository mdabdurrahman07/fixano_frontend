import React from "react";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getBookingDetails } from "../../_userActions/getSingleBooking";
import PaymentButton from "../PaymentButton";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

const InitialPaymentPage = async ({ params }: PageProps) => {
  const { bookingId } = await params;
  const booking = bookingId ? await getBookingDetails(bookingId) : null;
  return (
    <main className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-6 md:p-10 font-sans antialiased">
      {/* Success Card Container */}
      <Card className="w-full max-w-120 border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm rounded-2xl p-2 md:p-4 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="flex flex-col items-center pt-6 pb-2">
          {/* Success Icon */}
          <div className="mb-6 relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#006948]/10 flex items-center justify-center text-[#006948] transition-transform duration-700 ease-out hover:scale-105">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>
            {/* Decorative background rings */}
            <div className="absolute inset-0 -m-2 rounded-full border-2 border-[#006948]/10 scale-110 pointer-events-none" />
            <div className="absolute inset-0 -m-4 rounded-full border border-[#006948]/5 scale-125 pointer-events-none" />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] mb-2">
            Payment
          </h1>
        </CardHeader>

        <CardContent className="w-full px-4 py-2">
          {/* Transaction Details Box */}
          <div className="w-full bg-[#f2f4f6] rounded-xl border-t border-slate-200 p-5 space-y-3.5 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3d4a42] font-medium">Service</span>
              <span className="text-[#191c1e] font-semibold">
                {booking?.service.title}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-[#3d4a42] font-medium">Date</span>
              <span className="text-[#191c1e] font-semibold">
                {booking?.scheduledAt}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#3d4a42] text-sm font-medium">Amount</span>
              <span className="text-xl font-bold text-[#006948]">
                ${booking?.totalAmount}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
              <span className="text-[#3d4a42] text-sm font-medium">Status</span>
              <Badge className="bg-[#d1fae5] text-[#065f46] hover:bg-[#d1fae5] px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border-none shadow-none">
                Success
              </Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-10">
          {booking?.id && <PaymentButton bookingId={booking?.id}/>}
          <button className="bg-secondary px-4 py-2 text-white text-lg rounded-md">
            <Link href={"/"}>Dashboard</Link>
          </button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default InitialPaymentPage;
