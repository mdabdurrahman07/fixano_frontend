"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Clock,
  User,
} from "lucide-react";
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
  const [scheduledAtIso, setScheduledAtIso] = useState<string>("");

  const availabilities = service.technician?.availabilities || [];

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Success!", { description: state.message });
      } else {
        toast.error("Booking Failed", { description: state.message });
      }
    }
  }, [state]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setScheduledAtIso(rawVal ? `${rawVal}:00` : "");
  };

  const techName = technician?.user?.name || "Assigned Specialist";
  const techAvatar = technician?.user?.avatarUrl || "";

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
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-muted-foreground">Technician</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={techAvatar} alt={techName} />
                  <AvatarFallback>
                    <User className="w-3.5 h-3.5" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-slate-900">{techName}</span>
              </div>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-slate-900">{service.title}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-slate-900">
                {new Date(state.booking.scheduledAt).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
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
            onClick={() => toast.info("Redirecting to payment gateway...")}
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
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50/80">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={techAvatar} alt={techName} />
            <AvatarFallback className="bg-slate-200">
              <User className="h-6 w-6 text-slate-500" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Assigned Specialist
            </p>
            <h3 className="text-base font-semibold text-slate-900">{techName}</h3>
          </div>
        </div>

        <div>
          <CardTitle>{service.title}</CardTitle>
          <CardDescription className="mt-1">
            {service.description}
          </CardDescription>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700 pt-1">
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
          <input type="hidden" name="technicianId" value={service.technicianId} />
          <input type="hidden" name="serviceId" value={service.id} />
          <input
            type="hidden"
            name="availabilitiesJson"
            value={JSON.stringify(availabilities)}
          />
          <input type="hidden" name="scheduledAt" value={scheduledAtIso} />

          <div className="space-y-2">
            <Label htmlFor="scheduledAtPicker">Select Schedule Date & Time</Label>
            <input
              id="scheduledAtPicker"
              type="datetime-local"
              onChange={handleDateChange}
              disabled={availabilities.length === 0}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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