import { Suspense } from "react";
import Link from "next/link";
import {
  Star,
  MessageSquareQuote,
  User,
  Wrench,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getReview } from "../_userActions/getReview";
import { DeleteReviewButton } from "../../_components/User/DeleteReviewButton/DeleteReviewButton";

type ReviewItem = {
  id: string;
  rating: number;
  comment: string;
  createdAt?: string;
  customer?: { name?: string };
  technician?: { user?: { name?: string } };
};

async function ReviewContent() {
  const result = await getReview();

  if (
    !result?.success ||
    !Array.isArray(result?.data) ||
    result.data.length === 0
  ) {
    return (
      <div className="mt-6 text-center text-sm text-slate-500">
        No review found.
      </div>
    );
  }

  const reviews = result.data as ReviewItem[];

  return (
    <div className="mt-6 space-y-6">
      {reviews.map((review) => {
        const formattedDate = review.createdAt
          ? new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "N/A";

        return (
          <Card key={review.id} className="max-w-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-slate-900">
                Review Details
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-slate-700">
                    {review.rating}/5
                  </span>
                </div>
                <DeleteReviewButton reviewId={review.id} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 text-slate-700">
                <div className="flex items-start gap-2">
                  <MessageSquareQuote className="mt-0.5 h-4 w-4 text-slate-400 shrink-0" />
                  <p className="text-sm italic">{review.comment}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <div>
                    <span className="block font-medium text-slate-500">
                      Customer
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {review.customer?.name ?? "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-slate-400" />
                  <div>
                    <span className="block font-medium text-slate-500">
                      Technician
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {review.technician?.user?.name ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <Card className="mt-6 max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-20" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function AddReviewPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-slate-900">My Reviews</h1>
      <p className="mt-2 text-sm text-slate-600">
        Your review history is listed below with the date each review was
        submitted.
      </p>

      <Suspense fallback={<ReviewSkeleton />}>
        <ReviewContent />
      </Suspense>

      <Link href="/user-dashboard">
        <Button className="mt-6">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
