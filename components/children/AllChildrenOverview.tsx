"use client";

import { useState } from "react";
import Link from "next/link";
import type { ChildOverviewItem } from "@/lib/overview";
import {
  generateAttendanceLogs,
  getStudentSummary,
  MOCK_STUDENTS,
} from "@/lib/student-attendance-data";
import {
  exportIndividualStudentReport,
  exportAllStudentsAttendanceReport,
} from "@/lib/word-export";

interface Props {
  items: ChildOverviewItem[];
  onExitCheckMode: () => void;
}

export function AllChildrenOverview({ items, onExitCheckMode }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<number | "all">("all");
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const todayStr = "2026-09-10"; // Next month 10th
  const past30Str = "2026-08-10"; // August 10th

  const handleDownloadChildAttendance = async (item: ChildOverviewItem) => {
    setIsExporting(item.id);
    try {
      const summary = getStudentSummary(item.child_name, past30Str, todayStr);
      const allLogs = generateAttendanceLogs(past30Str, todayStr);

      if (summary) {
        // Ensure student name & age match the item
        summary.student.name = item.child_name;
        summary.student.age = item.age;
        if (item.gender) summary.student.gender = item.gender;

        await exportIndividualStudentReport(
          summary.student,
          allLogs,
          summary,
          past30Str,
          todayStr
        );
      }
    } catch (err) {
      console.error("Failed to download child attendance doc:", err);
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadMasterAttendance = async () => {
    setIsExporting("master");
    try {
      const allLogs = generateAttendanceLogs(past30Str, todayStr);
      await exportAllStudentsAttendanceReport(
        MOCK_STUDENTS,
        allLogs,
        past30Str,
        todayStr
      );
    } catch (err) {
      console.error("Failed to download master attendance doc:", err);
    } finally {
      setIsExporting(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.child_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parent_full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parent_email.toLowerCase().includes(searchQuery.toLowerCase());

    const itemLevel = item.assessment?.predicted_level ?? 1;
    const matchesLevel = selectedLevel === "all" || itemLevel === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const totalChildren = items.length;
  const totalGames = items.reduce((acc, curr) => acc + curr.totalGamesPlayed, 0);
  const totalHours = (items.reduce((acc, curr) => acc + curr.totalTimeMinutes, 0) / 60).toFixed(1);
  const avgOverallAcc =
    items.length > 0
      ? Math.round(items.reduce((acc, curr) => acc + curr.averageAccuracy, 0) / items.length)
      : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Admin Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM INSPECTOR MODE ACTIVE
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              All Children Dashboard 👑
            </h1>
            <p className="mt-1 text-sm sm:text-base text-purple-100 font-medium">
              Viewing all enrolled child profiles, developmental levels, and gameplay statistics in real-time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadMasterAttendance}
              disabled={isExporting === "master"}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              📄 Master Word Doc
            </button>
            <Link
              href="/progress/attendance"
              className="px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md transition-all shadow-md active:scale-95"
            >
              📅 Attendance Register
            </Link>
            <button
              onClick={onExitCheckMode}
              className="px-5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs backdrop-blur-md transition-all shadow-md active:scale-95"
            >
              🚪 Exit
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-3xl border border-indigo-100 bg-white/80 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl">
              👶
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Children</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">{totalChildren}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-sky-100 bg-white/80 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 text-2xl">
              🎮
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sessions</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">{totalGames.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white/80 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl">
              🎯
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Accuracy</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">{avgOverallAcc}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-100 bg-white/80 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 text-2xl">
              ⏳
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Time</p>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">{totalHours} hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search child or parent name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Level:</span>
          {(["all", 1, 2, 3] as const).map((lvl) => (
            <button
              key={String(lvl)}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                selectedLevel === lvl
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lvl === "all" ? "All Levels" : `Level ${lvl}`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Children Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const level = item.assessment?.predicted_level ?? 1;

          return (
            <div
              key={item.id}
              className="group relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Child Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-md">
                      {item.child_name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl font-extrabold text-slate-900">
                          {item.child_name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                          {item.age} yrs {item.gender ? `• ${item.gender}` : ""}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Parent: <span className="font-bold text-slate-700">{item.parent_full_name}</span> ({item.parent_email})
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-xs ${
                      level === 3
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : level === 2
                        ? "bg-sky-100 text-sky-700 border border-sky-200"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    Level {level} Unlocked
                  </span>
                </div>

                {/* Quick Performance Numbers */}
                <div className="grid grid-cols-3 gap-2 py-4 my-2 text-center bg-slate-50/80 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase">Sessions</p>
                    <p className="font-display text-lg font-extrabold text-slate-800">{item.totalGamesPlayed}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase">Avg Accuracy</p>
                    <p className="font-display text-lg font-extrabold text-emerald-600">{item.averageAccuracy}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase">Total Time</p>
                    <p className="font-display text-lg font-extrabold text-indigo-600">{item.totalTimeMinutes}m</p>
                  </div>
                </div>

                {/* Area Accuracy Breakdown */}
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                    Development Area Performance
                  </p>
                  
                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>💖 Emotion Match</span>
                        <span>{item.areaAccuracy.emotion}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.areaAccuracy.emotion}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>🧩 Cognitive & Memory</span>
                        <span>{item.areaAccuracy.cognitive}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.areaAccuracy.cognitive}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>🌟 Self-Awareness</span>
                        <span>{item.areaAccuracy.self_awareness}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.areaAccuracy.self_awareness}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>🔢 Mathematical Skills</span>
                        <span>{item.areaAccuracy.mathematical}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.areaAccuracy.mathematical}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-6 mt-4 border-t border-slate-100">
                <Link
                  href={`/games/${item.id}`}
                  className="flex-1 min-w-[100px] text-center px-3 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  🎮 Play Games
                </Link>
                <Link
                  href={`/assessment-result/${item.id}`}
                  className="flex-1 min-w-[100px] text-center px-3 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all active:scale-95"
                >
                  📊 Assessment
                </Link>
                <button
                  onClick={() => handleDownloadChildAttendance(item)}
                  disabled={isExporting === item.id}
                  className="w-full text-center px-4 py-2.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-black text-xs border border-purple-300 transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  📄 Download Attendance (.docx)
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-display text-lg font-bold text-slate-800">No children found</h3>
          <p className="text-sm text-slate-500">Try adjusting your search query or level filter.</p>
        </div>
      )}
    </div>
  );
}
