"use client";

import { motion } from "framer-motion";

import { ServiceCard } from "./service-card";
import { Service } from "@/app/types/types";


interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({
  services,
}: ServicesGridProps) {
  if (services.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="col-span-full flex flex-col items-center justify-center py-20 px-4"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No services found
          </h3>

          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria to find what you need.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max"
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
        />
      ))}
    </motion.div>
  );
}