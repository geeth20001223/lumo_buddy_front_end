"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CalmBackground } from "@/components/ui/CalmBackground";
import { StudentAttendanceTracker } from "@/components/progress/StudentAttendanceTracker";

export default function AttendanceProgressPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 relative overflow-x-hidden pb-20">
      <CalmBackground />

      <div className="relative z-10 space-y-6 pt-6">
        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/progress"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-xs font-black uppercase tracking-wider text-purple-700 hover:bg-purple-50 transition-all shadow-xs"
          >
            <ArrowLeft size={16} />
            Back to Family Progress
          </Link>

          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Lumo Buddy • 10-Student Attendance Register
          </span>
        </div>

        {/* Attendance Tracker Core */}
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold">Loading Attendance Data...</div>}>
          <StudentAttendanceTracker />
        </Suspense>
      </div>
    </main>
  );
}
