"use client";

import Badge from "@/components/shared/Badge";
import { motion } from "framer-motion";
import {
  ClipboardList,
  UserCheck,
  CalendarCheck,
  CheckCircle2,
  Network,
  HandCoins,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Choose Service",
    description:
      "Browse a wide range of verified home services tailored to your needs.",
  },
  {
    icon: UserCheck,
    title: "2. Pick Technician",
    description:
      "Compare available experts based on ratings, prices, and proximity.",
  },
  {
    icon: CalendarCheck,
    title: "3. Book Slot",
    description:
      "Pick an available time slot directly from the technician's real-time schedule.",
  },
  {
    icon: HandCoins,
    title: "4. Payment",
    description:
      "Pay the technician in advance for the service to secure your booking.",
  },
  {
    icon: CheckCircle2,
    title: "5. Get it Fixed",
    description:
      "Relax while our trusted pro handles the job with full satisfaction guaranteed.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge text="How It Works" icon={Network} />
          {/* <p className="text-slate-600 text-base">
            Book your service in four simple steps.
          </p> */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Book your service in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center space-y-4 p-6 rounded-2xl bg-slate-50/50 hover:bg-emerald-50/40 border border-slate-100 transition-colors"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
