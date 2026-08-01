import { z } from "zod";

export const updateTechnicianSchema = z.object({
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(500, "Bio cannot exceed 500 characters"),
  yearsExperience: z.coerce
    .number("Years of experience is required")
    .int("Years of experience must be a whole number")
    .min(0, "Experience cannot be negative"),
  hourlyRate: z.coerce
    .number("Hourly rate is required")
    .positive("Hourly rate must be greater than 0"),
});

export type UpdateTechnicianFormInput = z.input<typeof updateTechnicianSchema>;
export type UpdateTechnicianFormValues = z.output<
  typeof updateTechnicianSchema
>;
