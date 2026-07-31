import { House, ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

interface PaymentPageProps {
  searchParams: Promise<{ success?: string }>;
}
export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { success } = await searchParams;
  const isSuccess = success === "true";

  return (
    <main className="min-h-screen bg-[#f5f7f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {isSuccess ? <SuccessCard /> : <FailureCard />}
      </div>
    </main>
  );
}

function SuccessCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#d8e4dc] p-8 flex flex-col items-center text-center gap-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#e6f2ed] flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-[#006948]" strokeWidth={1.75} />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[22px] font-semibold text-[#1a2e22] tracking-tight">
          Payment Complete
        </h1>
        <p className="text-[14px] text-[#5a6b61] leading-relaxed">
          Your booking is confirmed. A technician has been assigned and will be
          in touch shortly.
        </p>
      </div>

      {/* Status pill */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#f0f8f4] border border-[#c2ddd0] rounded-full">
        <Clock className="w-4 h-4 text-[#006948]" strokeWidth={2} />
        <span className="text-[13px] font-medium text-[#006948]">
          Waiting for technician
        </span>
      </div>

      <ActionButtons />
    </div>
  );
}

function FailureCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e8d5d5] p-8 flex flex-col items-center text-center gap-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#fdf0f0] flex items-center justify-center">
        <XCircle className="w-8 h-8 text-[#c0392b]" strokeWidth={1.75} />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[22px] font-semibold text-[#1a2e22] tracking-tight">
          Payment Not Successful
        </h1>
        <p className="text-[14px] text-[#5a6b61] leading-relaxed">
          Something went wrong while processing your payment. Please try again
          later.
        </p>
      </div>

      <ActionButtons />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-2">
      <Link
        href="/"
        className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#006948] text-white text-[14px] font-semibold rounded-xl shadow-sm hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all duration-300 w-full sm:w-auto"
      >
        <House className="w-4.5 h-4.5" strokeWidth={2} />
        <span>Back to Home</span>
      </Link>

      <Link
        href="/user-dashboard"
        className="flex items-center justify-center gap-2 px-8 py-4 border border-[#bccac0] text-[#3d4a42] text-[14px] font-semibold rounded-xl hover:bg-[#eceef0] transition-all duration-300 w-full sm:w-auto"
      >
        <ArrowLeft className="w-4.5 h-4.5" strokeWidth={2} />
        <span>Go Back</span>
      </Link>
    </div>
  );
}
