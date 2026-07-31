"use server"
import { cookies } from "next/headers";

export async function getBookingDetails(bookingId: string) {
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
  const response = await fetch(`${url}/bookings/${bookingId}`, {
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  const result = await response.json();

  return result.data;
}
