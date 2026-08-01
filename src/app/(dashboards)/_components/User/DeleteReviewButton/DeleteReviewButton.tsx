
"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteReview } from "@/app/(dashboards)/user-dashboard/_userActions/deleteReview";


export function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteReview(reviewId);

      if (res?.success) {
        toast.success(res.message || "Review deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete review");
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-12 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-6 w-8" />
      )}
      <span className="sr-only">Delete review</span>
    </Button>
  );
}