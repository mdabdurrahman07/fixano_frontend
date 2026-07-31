import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateBookingPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-slate-900">Create Booking</h1>
      <p className="mt-2 text-sm text-slate-600">
        Open a specific booking from the dashboard to continue the payment flow.
      </p>
      <Link href="/user-dashboard">
        <Button className="mt-4">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
