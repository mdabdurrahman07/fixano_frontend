"use server";

import { CategoryFormData } from "@/lib/schemas/zod.categorySchema";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ActionResponse, Category } from "../adminTypes/adminTypes";

export const createCategory = async (
  data: CategoryFormData,
): Promise<ActionResponse<Category>> => {
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
    const response = await fetch(`${url}/admin/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const result: ActionResponse<Category> = await response.json();

    if (result?.success || response.ok) {
      revalidateTag("admin-allCategories", { expire: 0 });
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
