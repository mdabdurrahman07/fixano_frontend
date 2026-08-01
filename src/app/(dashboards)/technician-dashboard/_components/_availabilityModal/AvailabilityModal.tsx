/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { Plus, X, Loader2, Calendar } from "lucide-react";
import { SetAvailabilityFormInput, SetAvailabilityFormValues, setAvailabilitySchema } from "@/lib/schemas/zod.availabilitySchema";
import { setAvailabilityAction } from "../../_technicianActions/addAvailability";

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export default function SetAvailabilityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SetAvailabilityFormInput, any, SetAvailabilityFormValues>({
    resolver: zodResolver(setAvailabilitySchema),
    defaultValues: {
      dayOfWeek: 1, // Default to Monday
      startTime: "09:00",
      endTime: "17:00",
    },
  });

  const onSubmit = async (data: SetAvailabilityFormValues) => {
    setServerError(null);

    const result = await setAvailabilityAction(data);

    if (result.success) {
      reset();
      setIsOpen(false);
    } else {
      setServerError(result.message || "Failed to set availability slot.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Set Availability
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Set Weekly Availability</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
              {serverError && (
                <div className="p-3 text-xs bg-rose-50 text-rose-600 border border-rose-200 rounded-md">
                  {serverError}
                </div>
              )}

              {/* Day Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Day of the Week
                </label>
                <select
                  {...register("dayOfWeek")}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  {DAYS_OF_WEEK.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
                {errors.dayOfWeek && (
                  <p className="text-xs text-rose-500 mt-1">{errors.dayOfWeek.message}</p>
                )}
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Start Time
                  </label>
                  <input
                    {...register("startTime")}
                    type="time"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.startTime && (
                    <p className="text-xs text-rose-500 mt-1">{errors.startTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    End Time
                  </label>
                  <input
                    {...register("endTime")}
                    type="time"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.endTime && (
                    <p className="text-xs text-rose-500 mt-1">{errors.endTime.message}</p>
                  )}
                </div>
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
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}