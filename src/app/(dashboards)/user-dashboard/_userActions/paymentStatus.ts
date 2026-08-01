"use server";

import { cookies } from "next/headers";
import { PaymentStatusApiResponse } from "../paymentStatus/_types/paymentsTypes";


export async function getPaymentStatus(
  bookingId: string
): Promise<PaymentStatusApiResponse> {
  const url = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in",
    };
  }

  try {
    const response = await fetch(`${url}/payment/status/${bookingId}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    const result: PaymentStatusApiResponse = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch payment status",
    };
  }
}