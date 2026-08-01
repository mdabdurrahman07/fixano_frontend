/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit3, X, Loader2 } from "lucide-react";
import { Technician } from "../../_types/technicianProfileTypes";
import { UpdateTechnicianFormInput, UpdateTechnicianFormValues, updateTechnicianSchema } from "@/lib/schemas/zod.updateTechnicianProfile";
import { updateTechnicianProfileAction } from "../../_technicianActions/updateTechnicianProfile";

interface UpdateProfileModalProps {
  technician: Technician;
}

export default function UpdateProfileModal({ technician }: UpdateProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTechnicianFormInput, any, UpdateTechnicianFormValues>({
    resolver: zodResolver(updateTechnicianSchema),
    defaultValues: {
      bio: technician.bio || "",
      yearsExperience: technician.yearsExperience ?? 0,
      hourlyRate: Number(technician.hourlyRate) || 0,
    },
  });

  const onSubmit = async (data: UpdateTechnicianFormValues) => {
    setServerError(null);

    const result = await updateTechnicianProfileAction(data);

    if (result.success) {
      setIsOpen(false);
    } else {
      setServerError(result.message || "Failed to update profile.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition shadow-sm"
      >
        <Edit3 className="w-4 h-4" />
        Update Profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Edit Technician Profile</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
              {serverError && (
                <div className="p-3 text-xs bg-rose-50 text-rose-600 border border-rose-200 rounded-md">
                  {serverError}
                </div>
              )}

              {/* Years Experience & Hourly Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Years Experience
                  </label>
                  <input
                    {...register("yearsExperience")}
                    type="number"
                    placeholder="5"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.yearsExperience && (
                    <p className="text-xs text-rose-500 mt-1">
                      {errors.yearsExperience.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Hourly Rate ($)
                  </label>
                  <input
                    {...register("hourlyRate")}
                    type="number"
                    step="0.01"
                    placeholder="120"
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {errors.hourlyRate && (
                    <p className="text-xs text-rose-500 mt-1">
                      {errors.hourlyRate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Bio / Overview
                </label>
                <textarea
                  {...register("bio")}
                  rows={4}
                  placeholder="Describe your skillset and specialized experience..."
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                />
                {errors.bio && (
                  <p className="text-xs text-rose-500 mt-1">{errors.bio.message}</p>
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}