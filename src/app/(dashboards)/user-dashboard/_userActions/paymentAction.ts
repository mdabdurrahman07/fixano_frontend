"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const paymentAction = async (
  bookingId: string,
  prevState: unknown,
  _formData: FormData,
) => {
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

  const response = await fetch(`${url}/payment/checkout/${bookingId}`, {
    method: "POST",
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  const result = await response.json();
  revalidateTag("myBookings", { expire: 0 });
  if (result.success && result.data.url) {
    redirect(result.data.url);
  }

  return {
    success: false,
    message: result.message ?? "Payment initiation failed",
  };
};
