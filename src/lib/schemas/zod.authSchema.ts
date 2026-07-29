import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type loginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["CUSTOMER", "TECHNICIAN"]),
  phone: z.string().optional(),
  avatarUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),
  bio: z.string().optional(),
  yearsExperience: z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }
      return Number(value);
    },
    z.number().min(0, "Years of experience cannot be negative.").optional(),
  ),
  hourlyRate: z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }
      return Number(value);
    },
    z.number().min(0, "Hourly rate cannot be negative.").optional(),
  ),
});

export type RegisterInput = z.infer<typeof registerSchema>;