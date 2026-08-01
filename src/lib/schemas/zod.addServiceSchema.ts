import { z } from "zod";

export const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  durationMinutes: z.coerce
    .number()
    .int()
    .positive("Duration must be a positive integer"),
  categoryId: z.string().uuid("Please select a valid category"),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;
