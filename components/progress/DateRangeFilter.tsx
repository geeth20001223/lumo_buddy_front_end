"use client";

import { Calendar, Filter, RotateCcw } from "lucide-react";

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  presetLabel?: string;
}

interface DateRangeFilterProps {
  range: DateRange;
  onChange: (newRange: DateRange) => void;
}

export function DateRangeFilter({ range, onChange }: DateRangeFilterProps) {
  const handlePreset = (days: number, label: string) => {
    const end = new Date();
    const start = new Date(end.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
    onChange({
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
      presetLabel: label,
    });
  };

  const handleCustomStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...range,
      startDate: e.target.value,
      presetLabel: "Custom Range",
    });
  };

  const handleCustomEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...range,
      endDate: e.target.value,
      presetLabel: "Custom Range",
    });
  };

  const handleReset = () => {
    handlePreset(30, "Last 30 Days");
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border-2 border-purple-100 p-5 rounded-[2rem] shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Calendar size={18} />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Date Range Filter</h3>
            <p className="text-xs font-semibold text-slate-500">Select reporting timeframe for attendance & daily logs</p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => handlePreset(7, "Last 7 Days")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              range.presetLabel === "Last 7 Days"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700"
            }`}
          >
            7 Days
          </button>

          <button
            onClick={() => handlePreset(14, "Last 14 Days")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              range.presetLabel === "Last 14 Days"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700"
            }`}
          >
            14 Days
          </button>

          <button
            onClick={() => handlePreset(30, "Last 30 Days")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              range.presetLabel === "Last 30 Days"
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700"
            }`}
          >
            30 Days
          </button>

          <button
            onClick={() =>
              onChange({
                startDate: "2026-08-10",
                endDate: "2026-09-10",
                presetLabel: "Aug 10 - Sep 10",
              })
            }
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
              range.presetLabel === "Aug 10 - Sep 10"
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
            }`}
          >
            Aug 10 - Sep 10 🌟
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
            title="Reset Date Range"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Date Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={range.startDate}
            onChange={handleCustomStart}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={range.endDate}
            onChange={handleCustomEnd}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-1 flex items-end">
          <div className="w-full px-4 py-2 rounded-xl bg-purple-50/80 border border-purple-200 flex items-center justify-between text-xs">
            <span className="font-extrabold text-purple-700">Active Window:</span>
            <span className="font-black text-purple-900">
              {range.startDate} to {range.endDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
