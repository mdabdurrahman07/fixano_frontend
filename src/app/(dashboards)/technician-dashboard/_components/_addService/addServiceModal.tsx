/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus, X, Loader2 } from "lucide-react";
import { CreateServiceFormInput, CreateServiceFormValues, createServiceSchema } from "@/lib/schemas/zod.addServiceSchema";
import { createServiceAction } from "../../_technicianActions/addService";
import { Category } from "../../_types/addServiceTypes";

interface AddServiceModalProps {
  categories: Category[];
}

export default function AddServiceModal({ categories }: AddServiceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<CreateServiceFormInput, any, CreateServiceFormValues>({
  resolver: zodResolver(createServiceSchema),
  defaultValues: {
    title: "",
    description: "",
    price: undefined,
    durationMinutes: undefined,
    categoryId: "",
  },
});

  const onSubmit = async (data: CreateServiceFormValues) => {
    setServerError(null);
    const result = await createServiceAction(data);

    if (result.success) {
      reset();
      setIsOpen(false);
    } else {
      setServerError(result.message || "Something went wrong.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Add Service
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Create New Service</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
              {serverError && (
                <div className="p-3 text-xs bg-rose-50 text-rose-600 border border-rose-200 rounded-md">
                  {serverError}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Service Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="e.g. Whole-House General Pest Treatment"
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Category
                </label>
                <select
                  {...register("categoryId")}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-xs text-rose-500 mt-1">{errors.categoryId.message}</p>
                )}
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Price ($)
                  </label>
                  <input
                    {...register("price")}
                    type="number"
                    step="0.01"
                    placeholder="120.00"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.price && (
                    <p className="text-xs text-rose-500 mt-1">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Duration (Mins)
                  </label>
                  <input
                    {...register("durationMinutes")}
                    type="number"
                    placeholder="120"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.durationMinutes && (
                    <p className="text-xs text-rose-500 mt-1">
                      {errors.durationMinutes.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  placeholder="Describe the scope of service..."
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
                {errors.description && (
                  <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}