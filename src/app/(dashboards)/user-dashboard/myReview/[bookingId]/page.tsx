import AddReviewForm from "@/app/(dashboards)/_components/User/AddReviewForm/AddReviewForm";
import { Suspense } from "react";


type PageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function AddReviewPage({ params }: PageProps) {
  const { bookingId } = await params;

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-semibold text-slate-900">Add a Review</h1>
        <p className="mt-1 text-sm text-slate-500">
          Booking ID: <span className="font-mono text-xs">{bookingId}</span>
        </p>
      </div>

      <Suspense fallback={<div className="py-8 text-center text-sm text-slate-500">Loading form...</div>}>
        <AddReviewForm bookingId={bookingId} />
      </Suspense>
    </div>
  );
}