"use server";

import { loginFormPrevState, regFormPrevState } from "@/app/types/types";
import {
  loginSchema,
  registerSchema,
  type RegisterInput,
  type loginInput,
} from "@/lib/schemas/zod.authSchema";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
export const LoginAction = async (
  formPrevState: loginFormPrevState,
  formData: loginInput,
): Promise<loginFormPrevState> => {
  const url = process.env.BACKEND_API_URL;
  const validatedInputs = loginSchema.safeParse(formData);

  if (!validatedInputs.success) {
    return {
      success: false,
      message: "Invalid inputs provided",
      errors: validatedInputs.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${url}/auth/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedInputs.data),
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => null);
    return {
      success: false,
      message:
        errorResult?.message ||
        "Login failed. Please check your credentials and try again.",
      errors: errorResult?.errors,
    };
  }

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Login failed. Please try again.",
      errors: result.errors,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, //7day
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1day
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
  const redirectTo =
    decodedToken.role === "CUSTOMER"
      ? "/"
      : decodedToken.role === "TECHNICIAN"
        ? "/technician-dashboard"
        : decodedToken.role === "ADMIN"
          ? "/admin-dashboard"
          : "/";

  return {
    success: true,
    message: result.message || "Logged in successfully.",
    redirectTo,
    data: result.data,
  };
};

export const registerAction = async (
  regFormPrevState: regFormPrevState,
  formData: RegisterInput,
): Promise<regFormPrevState> => {
  const url = process.env.BACKEND_API_URL;
  const validatedInputs = registerSchema.safeParse(formData);

  if (!validatedInputs.success) {
    return {
      success: false,
      message: "Invalid inputs provided",
      statusCode: 500,
      errors: validatedInputs.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${url}/auth/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedInputs.data),
  });

  if (!res.ok) {
    const errorResult = await res.json().catch(() => null);
    return {
      success: false,
      message:
        errorResult?.message ||
        "Register failed. Please different credentials try again.",
      statusCode: 500,
      errors: errorResult?.errors,
    };
  }

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Register failed. Please try again.",
      statusCode: 500,
      errors: result.errors,
    };
  }

  return {
    success: true,
    statusCode: 201,
    message: result.message || "Registration successful. Please log in.",
    data: result.data,
    redirectTo: "/login",
  };
};
