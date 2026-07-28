import { LucideProps } from "lucide-react";
import React from "react";

interface BadgeProps {
  text: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const Badge = ({ text, icon }: BadgeProps) => {
  const Icon = icon;

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-xs md:text-sm">
      {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
      <span>{text}</span>
    </div>
  );
};

export default Badge;
