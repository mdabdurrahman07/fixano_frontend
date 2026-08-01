import { z } from "zod";

export const setAvailabilitySchema = z
  .object({
    dayOfWeek: z.coerce
      .number("Please select a day of the week")
      .min(0, "Invalid day")
      .max(6, "Invalid day"),
    startTime: z
      .string()
      .min(1, "Start time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
    endTime: z
      .string()
      .min(1, "End time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);
      const startTotal = startHour * 60 + startMin;
      const endTotal = endHour * 60 + endMin;
      return endTotal > startTotal;
    },
    {
      message: "End time must be strictly after start time",
      path: ["endTime"],
    },
  );

export type SetAvailabilityFormInput = z.input<typeof setAvailabilitySchema>;
export type SetAvailabilityFormValues = z.output<typeof setAvailabilitySchema>;
