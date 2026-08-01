'use server'
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteReview = async (id: string) => {
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
  const response = await fetch(`${url}/review/${id}`, {
    method: "DELETE",
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  const result = await response.json();

  if (result.success) {
    revalidateTag("myReviews", { expire: 0 });
    revalidateTag("myBookings", { expire: 0 });
    redirect("/user-dashboard");
  } else {
    throw new Error("Delete is not succeed");
  }
};
