"use client";

import React, { useMemo } from "react";
import { Category, ServiceItem } from "../../_types/addServiceTypes";
import { useAuthStore } from "@/store/auth.store";
import AddServiceModal from "./addServiceModal";

interface ServicesTableClientProps {
  allServices: ServiceItem[];
  categories: Category[];
}

export default function ServicesTableClient({
  allServices,
  categories,
}: ServicesTableClientProps) {
  // Get logged-in technician user from Zustand store
  const user = useAuthStore((state) => state.user);

  // Filter services where service.technician.userId matches user.id
  const technicianServices = useMemo(() => {
    if (!user?.id) return [];
    return allServices.filter(
      (service) => service.technician?.userId === user.id,
    );
  }, [allServices, user]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Services</h1>
          <p className="text-sm text-slate-500">
            Manage and create offered services.
          </p>
        </div>
        <div>
          <AddServiceModal categories={categories} />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {technicianServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No services found for your profile. Click{" "}
                    <strong>Add Service</strong> to create one.
                  </td>
                </tr>
              ) : (
                technicianServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {service.title}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                        {service.category?.name || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {service.durationMinutes} mins
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      ${parseFloat(service.price).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          service.isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
