"use server";

import { loginFormPrevState } from "@/app/types/types";
import { loginSchema } from "@/lib/schemas/zod.authSchema";

export const LoginAction = async (
  formPrevState: loginFormPrevState,
  formData: FormData,
): Promise<loginFormPrevState> => {
  const url = process.env.BACKEND_API_URL;
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedInputs = loginSchema.safeParse(rawFormData);

  if (!validatedInputs.success) {
    return {
      success: false,
      message: "Invalid inputs provided",
      errors: validatedInputs.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${url}/auth/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedInputs.data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result?.message || "Login failed. Please check your credentials.",
        errors: result?.errors as Record<string, string[]> | undefined,
      };
    }

    return {
      success: true,
      message: "Login successful",
      data: result.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      errors: error as Record<string, string[]> | undefined,
    };
  }
};
