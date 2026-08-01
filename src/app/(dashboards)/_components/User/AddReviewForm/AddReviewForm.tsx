"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  addReview,
  FormState,
} from "@/app/(dashboards)/user-dashboard/_userActions/addReview";

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export default function AddReviewForm({ bookingId }: { bookingId: string }) {
  const [state, formAction, isPending] = useActionState(
    addReview,
    initialState,
  );

  const [rating, setRating] = useState<number>(5);

  return (
    <form action={formAction} className="mt-6 space-y-6">
      {state?.message && !state.success && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {state.message}
        </div>
      )}

      {/* Booking ID Input (Read-only) */}
      <div className="space-y-2">
        <label
          htmlFor="bookingId"
          className="block text-sm font-medium text-slate-700"
        >
          Booking ID
        </label>
        <input
          type="text"
          id="bookingId"
          name="bookingId"
          value={bookingId}
          readOnly
          className="w-full rounded-md border border-slate-200 bg-slate-100 p-3 text-sm font-mono text-slate-600 focus:outline-none cursor-not-allowed"
        />
        {state?.errors?.bookingId && (
          <p className="text-xs text-red-500">{state.errors.bookingId[0]}</p>
        )}
      </div>

      {/* Rating Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
        {state?.errors?.rating && (
          <p className="text-xs text-red-500">{state.errors.rating[0]}</p>
        )}
      </div>

      {/* Comment Field */}
      <div className="space-y-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-slate-700"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          placeholder="Share details of your experience..."
          className="w-full rounded-md border border-slate-200 p-3 text-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        {state?.errors?.comment && (
          <p className="text-xs text-red-500">{state.errors.comment[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
