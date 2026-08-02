"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Booking, ServerActionResponse } from "../_types/_techDashTypes";
import { cookies } from "next/headers";
type TStatus = "ACCEPTED" | "DECLINED";
export const updateBookingStatus = async (
  bookingId: string,
  status: TStatus,
): Promise<ServerActionResponse<Booking>> => {
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
    const response = await fetch(`${url}/technician/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("myBookings", { expire: 0 });
      revalidatePath("/technician/dashboard");
    }

    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to update booking status.",
    };
  }
};
