"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  FormState,
  TechnicianAvailability,
} from "../createBooking/_types/types";
import { createBookingSchema } from "@/lib/schemas/zod.bookingSchema";

export async function createBookingAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Guard: if formData is empty (initial render fire), do nothing
  if (!formData.get("technicianId")) {
    return prevState;
  }

  const url = process.env.BACKEND_API_URL;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const rawData = {
    technicianId: formData.get("technicianId") as string,
    serviceId: formData.get("serviceId") as string,
    scheduledAt: formData.get("scheduledAt") as string,
    address: formData.get("address") as string,
    notes: formData.get("notes") as string,
    availabilitiesJson: formData.get("availabilitiesJson") as string,
  };

  let availabilities: TechnicianAvailability[] = [];
  try {
    availabilities = JSON.parse(rawData.availabilitiesJson || "[]");
  } catch {
    availabilities = [];
  }

  if (availabilities.length === 0) {
    return {
      success: false,
      message: "This technician is currently not taking any bookings.",
    };
  }

  const schema = createBookingSchema(availabilities);
  const validated = schema.safeParse({
    technicianId: rawData.technicianId,
    serviceId: rawData.serviceId,
    scheduledAt: rawData.scheduledAt,
    address: rawData.address,
    notes: rawData.notes || undefined,
  });

  if (!validated.success) {
    console.log("Zod errors:", validated.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed. Please correct the fields below.",
    };
  }

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }

  const scheduledAtUtc = new Date(validated.data.scheduledAt).toISOString();

  let createdBookingId = "";

  try {
    const res = await fetch(`${url}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ...validated.data,
        scheduledAt: scheduledAtUtc, // send UTC to backend/Prisma
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        message:
          errData.message || "Failed to create booking. Please try again.",
      };
    }

    const resData = await res.json();
    createdBookingId = resData.data.id;

    revalidateTag("myBookings", {expire: 0});
  } catch (err) {
    console.error("Booking fetch error:", err);
    return {
      success: false,
      message: "A network error occurred. Please try again.",
    };
  }

  revalidatePath("/user-dashboard/createBooking");

  redirect(`/user-dashboard/createBooking?bookingId=${createdBookingId}`);
}