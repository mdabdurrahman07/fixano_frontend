"use server";

import { cookies } from "next/headers";

export const getMyBookings = async () => {
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

  const response = await fetch(`${url}/bookings`, {
    headers: { Cookie: `accessToken=${accessToken}` },
    cache:"force-cache",
    next:{
      revalidate: 3600,
      tags:["myBookings"]
    }
  });

  const result = await response.json();

  return result;
};
