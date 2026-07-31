import Link from "next/link";

import { Button } from "@/components/ui/button";
import BookingForm from "@/app/(dashboards)/_components/User/BookingForm/BookingForm";
import { getService } from "../../_userActions/getSingleService";
import { getTechnician } from "../../_userActions/getSingleTechnician";

type Props = {
  params: Promise<{ serviceId: string }>;
};

export default async function ServiceBookingPage({ params }: Props) {
  const { serviceId } = await params;
  const response = await getService(serviceId);

  if (!response?.success || !response.data) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-xl font-semibold text-destructive">
          Service Not Found
        </h1>
        <p className="text-sm text-slate-600">
          Could not load details for service ID:{" "}
          <code className="text-xs bg-slate-100 p-1 rounded">{serviceId}</code>
        </p>
        <Link href="/services">
          <Button variant="outline">Back to Services</Button>
        </Link>
      </div>
    );
  }

  const technician = await getTechnician(response.data.technicianId);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Complete Your Booking
      </h1>
      <BookingForm service={response.data} technician={technician}/>
    </div>
  );
}
