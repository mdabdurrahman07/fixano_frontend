"use client";

import { motion } from "framer-motion";

import { TechnicianCard } from "./technician-card";
import { Technician } from "@/app/types/types";


interface TechniciansGridProps {
  technicians: Technician[];
}

export function TechniciansGrid({
  technicians,
}: TechniciansGridProps) {
  if (technicians.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="col-span-full flex flex-col items-center justify-center py-20 px-4"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No technicians found
          </h3>

          <p className="text-muted-foreground">
            Try adjusting your search or filter
            criteria to find a technician.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max"
    >
      {technicians.map((technician, index) => (
        <TechnicianCard
          key={technician.id}
          technician={technician}
          index={index}
        />
      ))}
    </motion.div>
  );
}