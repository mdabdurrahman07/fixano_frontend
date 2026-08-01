"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { UserStatus } from "../../adminTypes/adminTypes";
import { updateUserStatus } from "../../_adminActions/updateUserStatus";

interface UserActionButtonProps {
  userId: string;
  currentStatus: UserStatus;
}

export default function UserActionButton({
  userId,
  currentStatus,
}: UserActionButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const res = await updateUserStatus(userId, currentStatus);
      if (res?.success) {
        toast.success(
          `User status successfully updated to ${
            currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE"
          }`,
        );
      } else {
        toast.error(res?.message || "Failed to update user status");
      }
    });
  };

  const isBanned = currentStatus === "BANNED";

  return (
    <button
      onClick={handleToggleStatus}
      disabled={isPending}
      className={`px-4.5 py-1.5 rounded text-md font-semibold text-white transition-colors disabled:opacity-50 ${
        isBanned
          ? "bg-emerald-600 hover:bg-emerald-700"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {isPending ? "Updating..." : isBanned ? "Activate" : "Ban"}
    </button>
  );
}
