"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const reviewSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  rating: z.coerce
    .number("Please select a rating")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters long")
    .max(500, "Comment cannot exceed 500 characters"),
});

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: {
    bookingId?: string[];
    rating?: string[];
    comment?: string[];
  };
};

export async function addReview(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const url = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in.",
    };
  }

  const validatedFields = reviewSchema.safeParse({
    bookingId: formData.get("bookingId"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  // console.log(validatedFields, "review");

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${url}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    console.log("Review API status:", response.status);
    console.log("Review API response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to submit review.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  revalidateTag("myReviews", { expire: 0 });
  revalidateTag("myBookings", { expire: 0 });
  redirect("/user-dashboard/myReview");
}
