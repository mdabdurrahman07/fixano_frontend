"use client";

import Link from "next/link";
import { Wrench, Send } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const year = useState(() => new Date().getFullYear())[0];
  return (
    <div className="bg-[#E0E3E5] text-[#1E293B] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black tracking-tight text-emerald-600"
          >
            <Wrench className="h-6 w-6" />
            <span>Fixano</span>
          </Link>
          <p className="text-text-[#64748B] text-sm leading-relaxed">
            Quality home services you can trust, delivered by verified experts
            in your local community.
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold uppercase tracking-wider text-text-[#1E293B] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-text-[#64748B]">
            <li>
              <Link
                href="/services"
                className="hover:text-emerald-600 transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/technicians"
                className="hover:text-emerald-600 transition-colors"
              >
                Technicians
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                className="hover:text-emerald-600 transition-colors"
              >
                How it Works
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold uppercase tracking-wider text-text-[#1E293B] mb-4">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-text-[#64748B]">
            <li>
              <Link
                href="#"
                className="hover:text-emerald-600 transition-colors"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                href="/auth/register?role=technician"
                className="hover:text-emerald-600 transition-colors"
              >
                Become a Technician
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-emerald-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold uppercase tracking-wider text-text-[#1E293B] mb-4">
            Newsletter
          </h4>
          <p className="text-text-[#64748B] text-sm mb-3">
            Stay updated with service offers and tips.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-[#F8FAFC] border border-[#A9ABAD] text-xs rounded-lg px-3 py-2 text-text-[#1E293B] placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 flex-1"
            />
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-[#A9ABAD] text-center text-md text-[#1E293B]">
        © {year} Fixano Home Services. All rights reserved.
      </div>
    </div>
  );
}
