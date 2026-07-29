"use client";

import { Info } from "lucide-react";

export function ParentDashboardNote() {
  return (
    <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 rounded-3xl p-5 sm:p-6 border-2 border-sky-200/80 shadow-md flex items-start gap-4 text-sky-900">
      <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-300/40 font-bold">
        <Info size={20} />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-sky-600 mb-1">Important Note</p>
        <p className="text-sm font-semibold text-sky-900 leading-relaxed">
          Lumo Buddy tracks learning activity progress and supports gentle practice. This dashboard provides learning insights to help guide your child, but it is not a medical diagnosis report.
        </p>
      </div>
    </div>
  );
}
