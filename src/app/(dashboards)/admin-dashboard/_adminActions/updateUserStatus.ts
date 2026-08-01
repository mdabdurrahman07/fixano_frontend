"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { UpdateUserStatusResponse, UserStatus } from "../adminTypes/adminTypes";

export const updateUserStatus = async (
  userId: string,
  currentStatus: UserStatus,
): Promise<UpdateUserStatusResponse> => {
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

  const newStatus: UserStatus =
    currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";

  try {
    const response = await fetch(`${url}/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const result: UpdateUserStatusResponse = await response.json();

    if (result?.success || response.ok) {
      revalidateTag("admin-allUsers", { expire: 0 });
    }

    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Failed to update user status",
    };
  }
};
