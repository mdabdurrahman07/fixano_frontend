import { TechnicianAvailability } from "@/app/(dashboards)/user-dashboard/createBooking/_types/types";
import { isTimeWithinAvailability } from "@/app/(dashboards)/user-dashboard/createBooking/_utils/isTimeWithinAvailability";
import z from "zod";

export function createBookingSchema(availabilities: TechnicianAvailability[]) {
  return z.object({
    technicianId: z.string().uuid("Invalid technician ID"),
    serviceId: z.string().uuid("Invalid service ID"),
    scheduledAt: z
      .string()
      .min(1, "Please select a date and time")
      .refine(
        (val) => isTimeWithinAvailability(val, availabilities),
        "The selected date/time falls outside the technician's working hours."
      ),
    address: z.string().min(3, "Address must be at least 3 characters"),
    notes: z.string().optional(),
  });
}

export type CreateBookingInput = z.infer<ReturnType<typeof createBookingSchema>>;