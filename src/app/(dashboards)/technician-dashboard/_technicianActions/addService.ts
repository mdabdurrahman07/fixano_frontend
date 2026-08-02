"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { CreateServiceInput } from "../_types/addServiceTypes";
export async function createServiceAction(data: CreateServiceInput) {
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
    const response = await fetch(`${url}/technician/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("all-Services", { expire: 0 });
      revalidateTag("allServices", { expire: 0 });
    }

    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to create service. Please try again.",
    };
  }
}
