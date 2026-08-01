"use server"
import { cookies } from "next/headers";

export const getAllCategories = async () => {
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

  const response = await fetch(`${url}/categories`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: ["allCategories"],
    },
  });
  const result = await response.json();

  return result
};
