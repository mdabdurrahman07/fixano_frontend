"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllServices } from "../_publicAction/getAllServices";
import { Service, ServicesResponse } from "@/app/types/types";
import { ServiceCard } from "../_publicComponents/service-card";
import { ServiceCardSkeleton } from "../_publicComponents/service-card-skeleton";

export function ServiceSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allData = async () => {
      try {
        setLoading(true);
        const res: ServicesResponse = await getAllServices();
        setServices(res.data || []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    allData();
  }, []);
  if (loading) return <ServiceCardSkeleton />;
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Services
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Top-rated solutions for common home maintenance needs.
            </p>
          </div>
          <Link
            href="/services"
            className="text-emerald-600 font-semibold text-sm hover:underline flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.slice(0, 4).map((service: Service, index: number) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
