"use server";
import { cookies } from "next/headers";
import { Booking, ServerActionResponse } from "../_types/_techDashTypes";

export const getTechnicianBookings = async (): Promise<
  ServerActionResponse<Booking[]>
> => {
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
  // getting all bookings
  try {
    const response = await fetch(`${url}/technician/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      next: { tags: ["technician-bookings"] },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch bookings. Please try again later.",
    };
  }
};
