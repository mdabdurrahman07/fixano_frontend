import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z.coerce
    .number("Please enter a valid price")
    .positive("Price must be greater than 0"),
  durationMinutes: z.coerce
    .number("Please enter duration")
    .int()
    .positive("Duration must be a positive integer"),
  categoryId: z.string().uuid("Please select a valid category"),
});

// Output type (after coercion/validation): price & durationMinutes are 'number'
export type CreateServiceFormValues = z.output<typeof createServiceSchema>;

// Input type (before coercion/validation): price & durationMinutes can be 'undefined' or 'number'
export type CreateServiceFormInput = z.input<typeof createServiceSchema>;
