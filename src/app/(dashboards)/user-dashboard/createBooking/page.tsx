import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Calendar, MapPin, ArrowRight } from "lucide-react";
import { getBookingDetails } from "../_userActions/getSingleBooking";

interface PageProps {
  searchParams: Promise<{ bookingId?: string }>;
}

export default async function CreateBookingPage({ searchParams }: PageProps) {
  const { bookingId } = await searchParams;

  const booking = bookingId ? await getBookingDetails(bookingId) : null;
  if (booking) {
    return (
      <div className="container mx-auto p-6 max-w-xl">
        <Card className="shadow-md border-emerald-200 bg-emerald-50/20">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-emerald-900">Booking Confirmed!</CardTitle>
            <CardDescription>Your service slot has been reserved successfully.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-white p-4 space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-mono text-xs text-slate-700">{booking.id}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Date & Time
                </span>
                <span className="font-medium text-slate-900">
                  {new Date(booking.scheduledAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Address
                </span>
                <span className="font-medium text-slate-900">{booking.address}</span>
              </div>
              {booking.notes && (
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Notes</span>
                  <span className="font-medium text-slate-900 max-w-50 truncate">{booking.notes}</span>
                </div>
              )}
            </div>

            {/* Payment Trigger */}
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 text-base">
              <CreditCard className="h-5 w-5" />
              Proceed to Payment
            </Button>

            <div className="text-center pt-2">
              <Link href="/services" className="text-sm text-slate-500 hover:underline inline-flex items-center gap-1">
                Book Another Service <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto text-center space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Create Booking</h1>
      <p className="text-sm text-slate-600">
        Please select a service from our catalog to start the booking process.
      </p>
      <Link href="/services">
        <Button className="mt-2">Find Service for Booking</Button>
      </Link>
    </div>
  );
}

