"use client";

import { DashboardSummary, formatTime } from "@/lib/dashboard";
import { CheckCircle2, Star, Clock, Target } from "lucide-react";

interface SummaryCardsProps {
  summary: DashboardSummary;
  level: number;
}

export function SummaryCards({ summary, level }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Card 1: Activities Completed */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white rounded-[2rem] p-6 border-2 border-emerald-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-400/30 group-hover:scale-110 transition-transform duration-300">
            <CheckCircle2 size={26} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 px-3 py-1 bg-emerald-100/80 rounded-full">
            Completed
          </span>
        </div>
        <div className="mt-4">
          <p className="text-4xl font-black text-slate-900 tracking-tight">{summary.totalActivities}</p>
          <p className="text-xs font-extrabold text-emerald-700 mt-1 uppercase tracking-wider">Activities Played</p>
        </div>
      </div>

      {/* Card 2: Average Score */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/60 to-white rounded-[2rem] p-6 border-2 border-amber-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-400/30 group-hover:scale-110 transition-transform duration-300">
            <Star size={26} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 px-3 py-1 bg-amber-100/80 rounded-full">
            Score
          </span>
        </div>
        <div className="mt-4">
          <p className="text-4xl font-black text-slate-900 tracking-tight">{summary.averageScore}</p>
          <p className="text-xs font-extrabold text-amber-700 mt-1 uppercase tracking-wider">Average Score</p>
        </div>
      </div>

      {/* Card 3: Average Time */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50/60 to-white rounded-[2rem] p-6 border-2 border-sky-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-sky-400/30 group-hover:scale-110 transition-transform duration-300">
            <Clock size={26} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 px-3 py-1 bg-sky-100/80 rounded-full">
            Speed
          </span>
        </div>
        <div className="mt-4">
          <p className="text-4xl font-black text-slate-900 tracking-tight">{formatTime(summary.averageTime)}</p>
          <p className="text-xs font-extrabold text-sky-700 mt-1 uppercase tracking-wider">Average Time</p>
        </div>
      </div>

      {/* Card 4: Current Level */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-fuchsia-50/60 to-white rounded-[2rem] p-6 border-2 border-purple-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white flex items-center justify-center shadow-lg shadow-purple-400/30 group-hover:scale-110 transition-transform duration-300">
            <Target size={26} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 px-3 py-1 bg-purple-100/80 rounded-full">
            Level
          </span>
        </div>
        <div className="mt-4">
          <p className="text-4xl font-black text-slate-900 tracking-tight">Lvl {level}</p>
          <p className="text-xs font-extrabold text-purple-700 mt-1 uppercase tracking-wider">Current Level</p>
        </div>
      </div>
    </div>
  );
}
