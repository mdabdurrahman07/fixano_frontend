"use server";

import { cookies } from "next/headers";

export const getReview = async (bookingId: string) => {
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
  const response = await fetch(`${url}/review/${bookingId}`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache:"force-cache",
    next:{
        revalidate: 3600,
        tags:["myReviews"]
    }
  });

  const result = await response.json();

  return result;
};
