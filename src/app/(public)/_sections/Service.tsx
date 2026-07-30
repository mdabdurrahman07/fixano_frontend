"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const services = [
  {
    id: "1",
    title: "Clogged Drain Repair",
    category: "PLUMBING",
    categoryColor: "bg-amber-100 text-amber-800",
    rating: 4.9,
    technicianName: "David K.",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "2",
    title: "Smart Switch Install",
    category: "ELECTRICAL",
    categoryColor: "bg-emerald-100 text-emerald-800",
    rating: 5.0,
    technicianName: "Elena M.",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "3",
    title: "Deep Kitchen Clean",
    category: "CLEANING",
    categoryColor: "bg-violet-100 text-violet-800",
    rating: 4.8,
    technicianName: "Sophie R.",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "4",
    title: "Furniture Assembly",
    category: "HANDYMAN",
    categoryColor: "bg-sky-100 text-sky-800",
    rating: 4.7,
    technicianName: "Liam T.",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
];

export function ServiceSection() {
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
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  unoptimized
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${service.categoryColor}`}
                >
                  {service.category}
                </span>
                <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg flex items-center gap-1 text-slate-800 text-xs font-bold shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{service.rating}</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Available for instant booking
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-emerald-500">
                      <Image
                        unoptimized
                        src={service.avatar}
                        alt={service.technicianName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {service.technicianName}
                    </span>
                  </div>
                  <p className="text-emerald-600 font-extrabold text-lg">
                    ${service.price}
                    <span className="text-xs font-normal text-slate-400">
                      /hr
                    </span>
                  </p>
                </div>

                <Link
                  href={`/services/${service.id}`}
                  className="block text-center w-full"
                >
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-14 py-3 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95">
                    Book Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
