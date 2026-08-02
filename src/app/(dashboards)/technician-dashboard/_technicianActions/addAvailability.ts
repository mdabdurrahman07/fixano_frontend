"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { SetAvailabilityInput, SetAvailabilityResponse } from "../_types/setAvailabilityTypes";


export async function setAvailabilityAction(
  payload: SetAvailabilityInput
): Promise<SetAvailabilityResponse> {
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
    const response = await fetch(`${url}/technician/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("all-Technicians", {expire: 0});
      revalidateTag("technicianProfile", {expire: 0});
      revalidateTag("all-Services", {expire: 0});
      revalidateTag("allServices", {expire: 0});
      revalidateTag("allTechnicians", {expire: 0});
    }

    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to set availability. Please try again.",
    };
  }
}