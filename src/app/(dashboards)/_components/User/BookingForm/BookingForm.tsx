"use client";

import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, CreditCard, Clock } from "lucide-react";
import {
  FormState,
  ServiceData,
} from "@/app/(dashboards)/user-dashboard/createBooking/_types/types";
import { createBookingAction } from "@/app/(dashboards)/user-dashboard/_userActions/createMyBooking";
import { Technician } from "@/app/(public)/technicians/_types/types";

const initialState: FormState = {
  success: false,
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BookingForm({
  service,
  technician,
}: {
  service: ServiceData;
  technician: Technician;
}) {
  const [state, formAction, isPending] = useActionState(
    createBookingAction,
    initialState,
  );

  const availabilities = service.technician?.availabilities || [];

  // Card view on success
  if (state.success && state.booking) {
    return (
      <Card className="max-w-xl mx-auto shadow-md border-emerald-200 bg-emerald-50/20">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mb-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl text-emerald-900">
            Booking Confirmed!
          </CardTitle>
          <CardDescription>Your reservation details are saved.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-white p-4 space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-slate-900">
                {service.title}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-slate-900">
                {new Date(state.booking.scheduledAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium text-slate-900">
                {state.booking.address}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-1">
              <span>Total Price</span>
              <span className="text-emerald-700">${service.price}</span>
            </div>
          </div>

          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 text-base"
            onClick={() => alert("Redirecting to payment payment gateway...")}
          >
            <CreditCard className="h-5 w-5" />
            Proceed to Payment (${service.price})
          </Button>

          <div className="text-center">
            <Link
              href="/services"
              className="text-sm text-slate-500 hover:underline"
            >
              Back to Services
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-700 pt-2">
          <span>Duration: {service.durationMinutes} mins</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold text-base">
            ${service.price}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 rounded-lg bg-slate-50 border text-xs text-slate-600 space-y-1">
          <span className="font-semibold text-slate-800 block mb-1">
            Technician Working Hours:
          </span>
          {availabilities.length > 0 ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {availabilities.map((a) => (
                <li key={a.id} className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{DAYS[a.dayOfWeek]}:</span> {a.startTime} - {a.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-amber-600">
              No available hours found for this technician.
            </p>
          )}
        </div>

        {state.message && !state.success && (
          <div className="mb-4 p-3 rounded-md bg-destructive/15 text-destructive flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input
            type="hidden"
            name="technicianId"
            value={service.technicianId}
          />
          <input type="hidden" name="serviceId" value={service.id} />
          <input
            type="hidden"
            name="availabilitiesJson"
            value={JSON.stringify(availabilities)}
          />

          <div className="space-y-2">
            <Label htmlFor="scheduledAt">Select Schedule Date & Time</Label>
            <Input
              id="scheduledAt"
              name="scheduledAt"
              type="datetime-local"
              disabled={availabilities.length === 0}
            />
            {state.errors?.scheduledAt && (
              <p className="text-xs text-destructive">
                {state.errors.scheduledAt[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Service Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="e.g. House 12, Road 4, Sector 7, Dhaka"
            />
            {state.errors?.address && (
              <p className="text-xs text-destructive">
                {state.errors.address[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Special instructions or issues..."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={isPending || availabilities.length === 0}
          >
            {isPending ? "Confirming Slot..." : "Confirm Booking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
