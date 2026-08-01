import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  iconUrl: z.string().url("Please enter a valid URL (e.g. https://example.com)"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;