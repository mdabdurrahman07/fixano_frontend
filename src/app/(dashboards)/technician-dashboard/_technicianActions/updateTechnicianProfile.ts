"use server"
import { cookies } from "next/headers";
import { IUpdateTechnicianPayload } from "../_types/technicianProfileTypes";
import { revalidateTag } from "next/cache";

export async function updateTechnicianProfileAction(payload: IUpdateTechnicianPayload) {
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
    const response = await fetch(`${url}/technician/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("technicianProfile", {expire: 0});
      revalidateTag("all-Technicians",{expire: 0});
    }

    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to update profile. Please try again.",
    };
  }
}