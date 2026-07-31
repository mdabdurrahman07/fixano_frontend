import React from "react";
import { Clock, Briefcase, Wrench } from "lucide-react";
import { Service, Technician } from "@/app/(public)/technicians/_types/types";


interface AboutProps {
  technician: Technician;
}

export const TechnicianAbout: React.FC<AboutProps> = ({ technician }) => {
  return (
    <div className="space-y-6">
      {/* Bio Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          About
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
          {technician.bio || "No biography provided."}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <Clock className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Experience
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {technician.yearsExperience} Years
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <Briefcase className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hourly Rate
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                ${technician.hourlyRate}/hr
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {technician.services && technician.services.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Services Offered
            </h2>
          </div>

          <div className="space-y-4">
            {technician.services.map((service: Service) => (
              <div
                key={service.id}
                className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                    {service.title}
                  </h3>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">
                    ${service.price}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  Duration: {service.durationMinutes} minutes
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};