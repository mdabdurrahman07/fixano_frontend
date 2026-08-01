"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryFormData, categorySchema } from "@/lib/schemas/zod.categorySchema";
import { createCategory } from "../../_adminActions/createCategory";


export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      iconUrl: "",
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    startTransition(async () => {
      const res = await createCategory(data);
      if (res?.success) {
        toast.success(res?.message || "Category created successfully!");
        reset();
        setOpen(false);
      } else {
        toast.error(res?.message || "Failed to create category");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 bg-white">
        <DialogHeader>
          <DialogTitle className="text-slate-800">Add New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="e.g. Carpentry & Handyman"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Provide a brief description..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {errors.description && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Icon URL Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Icon URL
            </label>
            <input
              {...register("iconUrl")}
              type="url"
              placeholder="https://example.com/icon.png"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            {errors.iconUrl && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.iconUrl.message}
              </p>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-md text-xs transition disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Category"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}