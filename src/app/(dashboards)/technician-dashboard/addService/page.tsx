import React, { Suspense } from "react";

import { Loader2 } from "lucide-react";
import { getAllServices } from "../_technicianActions/getAllServices";
import { getAllCategories } from "../_technicianActions/getAllCategories";
import ServicesTableClient from "../_components/_addService/servicesTableClient";

async function ServicesDataFetcher() {
  const [servicesRes, categoriesRes] = await Promise.all([
    getAllServices(),
    getAllCategories(),
  ]);

  const allServices = servicesRes?.data || [];
  const categories = categoriesRes?.data || [];

  return (
    <ServicesTableClient allServices={allServices} categories={categories} />
  );
}

export default function TechnicianServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-6 max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-100">
            <Loader2 className="w-10 h-10 animate-spin text-green-600 mb-2" />
            <p className="text-sm text-slate-500">Loading services...</p>
          </div>
        }
      >
        <ServicesDataFetcher />
      </Suspense>
    </main>
  );
}
