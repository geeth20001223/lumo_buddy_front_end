"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  UserCheck,
  Award,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  MOCK_STUDENTS,
  generateAttendanceLogs,
  getStudentSummary,
  DailyAttendanceLog,
  StudentProfile,
} from "@/lib/student-attendance-data";
import {
  exportIndividualStudentReport,
  exportAllStudentsAttendanceReport,
} from "@/lib/word-export";
import { DateRangeFilter, DateRange } from "./DateRangeFilter";

export function StudentAttendanceTracker() {
  const searchParams = useSearchParams();
  const paramStudentId = searchParams.get("studentId");

  // Default date range: August 10th to September 10th (Next month 10th)
  const [range, setRange] = useState<DateRange>({
    startDate: "2026-08-10",
    endDate: "2026-09-10",
    presetLabel: "Aug 10 - Sep 10",
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (paramStudentId) {
      const match = MOCK_STUDENTS.find(
        (s) => s.id === paramStudentId || s.name.toLowerCase() === paramStudentId.toLowerCase()
      );
      if (match) {
        setSelectedStudentId(match.id);
      }
    }
  }, [paramStudentId]);

  // Generate logs based on date range and student filter
  const allLogs = generateAttendanceLogs(range.startDate, range.endDate);

  const filteredStudents = MOCK_STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeLogs =
    selectedStudentId === "all"
      ? allLogs.filter((l) =>
          filteredStudents.some((fs) => fs.id === l.studentId)
        )
      : allLogs.filter((l) => l.studentId === selectedStudentId);

  // Compute stats
  const totalLogsCount = activeLogs.length;
  const presentLogsCount = activeLogs.filter(
    (l) => l.status === "Present"
  ).length;
  const partialLogsCount = activeLogs.filter(
    (l) => l.status === "Partial"
  ).length;
  const totalMinutesPlayed = activeLogs.reduce(
    (sum, l) => sum + l.playedMinutes,
    0
  );
  const totalHoursPlayed = (totalMinutesPlayed / 60).toFixed(1);

  const overallAttendanceRate =
    totalLogsCount > 0
      ? Math.round(
          ((presentLogsCount + partialLogsCount * 0.5) / totalLogsCount) * 100
        )
      : 0;

  const selectedStudent = MOCK_STUDENTS.find((s) => s.id === selectedStudentId);
  const selectedStudentSummary = selectedStudent
    ? getStudentSummary(selectedStudent.id, range.startDate, range.endDate)
    : null;

  // Handlers for exporting Word docs
  const handleExportIndividual = async () => {
    if (!selectedStudent || !selectedStudentSummary) return;
    setIsExporting(true);
    try {
      await exportIndividualStudentReport(
        selectedStudent,
        allLogs,
        selectedStudentSummary,
        range.startDate,
        range.endDate
      );
    } catch (err) {
      console.error("Failed to export individual Word doc:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      await exportAllStudentsAttendanceReport(
        MOCK_STUDENTS,
        allLogs,
        range.startDate,
        range.endDate
      );
    } catch (err) {
      console.error("Failed to export master Word doc:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">

      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-8 sm:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/30 border border-purple-400/30 text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">
            <UserCheck size={14} className="text-purple-300" />
            10-STUDENT ATTENDANCE & TIME SLOT HUB
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Daily Play & Time Slot Register
          </h1>
          <p className="text-slate-300 font-extrabold text-sm sm:text-base leading-relaxed">
            Supporting every child&apos;s daily learning journey with progress tracking and official attendance reports.
          </p>
        </div>

        {/* Master Export Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 z-10 shrink-0">
          <button
            onClick={handleExportAll}
            disabled={isExporting}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            <FileText size={18} />
            Download Master 10-Student Word Doc
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <DateRangeFilter range={range} onChange={setRange} />

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBadge
          label="Tracked Students"
          value="10 Students"
          sub="Class Attendance"
          icon={<UserCheck className="text-purple-600" size={22} />}
          bg="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white"
          border="border-purple-200"
        />
        <StatBadge
          label="Attendance Rate"
          value={`${overallAttendanceRate}%`}
          sub="Selected Window"
          icon={<CheckCircle2 className="text-emerald-600" size={22} />}
          bg="bg-gradient-to-br from-emerald-50 via-teal-50 to-white"
          border="border-emerald-200"
        />
        <StatBadge
          label="Total Hours Played"
          value={`${totalHoursPlayed} Hours`}
          sub="Sum Duration"
          icon={<Clock className="text-amber-600" size={22} />}
          bg="bg-gradient-to-br from-amber-50 via-orange-50 to-white"
          border="border-amber-200"
        />
        <StatBadge
          label="Report Export"
          value="Word (.docx)"
          sub="Official Document"
          icon={<FileText className="text-sky-600" size={22} />}
          bg="bg-gradient-to-br from-sky-50 via-blue-50 to-white"
          border="border-sky-200"
        />
      </div>

      {/* Student Selection & Search Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-2 border-slate-200/80 p-6 rounded-[2.5rem] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="text-purple-600" size={22} />
              Select Student to View Daily Logs
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Pick a student to view day-by-day start times, end times, session counts, and export their individual report.
            </p>
          </div>

          {/* Student Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Student Pills / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedStudentId("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shrink-0 transition-all border ${
              selectedStudentId === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
            }`}
          >
            All 10 Students
          </button>

          {filteredStudents.map((student) => {
            const isSelected = selectedStudentId === student.id;
            return (
              <button
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`px-4 py-2 rounded-full text-xs font-black shrink-0 transition-all flex items-center gap-2 border ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${student.avatarColor}`} />
                {student.name}
              </button>
            );
          })}
        </div>

        {/* Selected Student Banner (if specific student selected) */}
        {selectedStudent && selectedStudentSummary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-[2rem] bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 border-2 border-purple-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${selectedStudent.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-sm`}>
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs font-extrabold text-purple-700">{selectedStudent.supportLevelLabel}</p>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-4 text-xs font-extrabold text-slate-600 pt-2">
                <span>🎯 Goal: <strong className="text-slate-800">{selectedStudent.primaryGoal}</strong></span>
                <span>⏱️ Preferred Slot: <strong className="text-purple-800">{selectedStudentSummary.preferredTimeSlot}</strong></span>
              </div>
            </div>

            {/* Individual Word Export Button */}
            <button
              onClick={handleExportIndividual}
              disabled={isExporting}
              className="px-6 py-3.5 rounded-2xl bg-purple-600 text-white font-black text-xs uppercase tracking-widest hover:bg-purple-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Download size={16} />
              Export {selectedStudent.name}&apos;s Word Doc
            </button>
          </motion.div>
        )}
      </div>

      {/* Day-by-Day Attendance & Daily Time Slot Table */}
      <div className="bg-white/90 backdrop-blur-xl border-2 border-slate-200/80 rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Day-by-Day Play & Time Slot Logs ({activeLogs.length} Records)
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Showing start time, end time, session count, and play duration for each day.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-600">
            <Sparkles size={14} className="text-amber-500" />
            Active Register
          </div>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="py-4 px-6">Date & Day</th>
                <th className="py-4 px-6">Student</th>
                <th className="py-4 px-6">Attendance</th>
                <th className="py-4 px-6">Start Time</th>
                <th className="py-4 px-6">End Time</th>
                <th className="py-4 px-6 text-center">Played Time</th>
                <th className="py-4 px-6 text-center">Sessions</th>
                <th className="py-4 px-6 text-center">Accuracy</th>
                <th className="py-4 px-6">Activities Played</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-extrabold text-slate-700">
              {activeLogs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-bold">
                    No attendance records found for the selected date range.
                  </td>
                </tr>
              ) : (
                activeLogs.map((log) => {
                  const student = MOCK_STUDENTS.find((s) => s.id === log.studentId);
                  return (
                    <tr key={log.id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="py-4 px-6 font-black text-slate-900 whitespace-nowrap">
                        {log.date}
                        <span className="ml-1 text-[10px] font-extrabold text-slate-400">({log.dayOfWeek})</span>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${student?.avatarColor || "bg-slate-400"}`} />
                          <span className="font-black text-slate-800">{log.studentName}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {log.status === "Present" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase">
                            <CheckCircle2 size={12} /> Present
                          </span>
                        ) : log.status === "Partial" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-black uppercase">
                            <Clock size={12} /> Partial
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-black uppercase">
                            Missed
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap font-black text-slate-800">
                        {log.startTime}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap font-black text-slate-800">
                        {log.endTime}
                      </td>

                      <td className="py-4 px-6 text-center font-black text-purple-700 whitespace-nowrap">
                        {log.status === "Missed" ? "-" : `${log.playedMinutes} mins`}
                      </td>

                      <td className="py-4 px-6 text-center font-black text-slate-900 whitespace-nowrap">
                        {log.status === "Missed" ? "0" : `${log.sessionsCount} sessions`}
                      </td>

                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        {log.status === "Missed" ? (
                          "-"
                        ) : (
                          <span className={`font-black ${log.accuracy >= 85 ? "text-emerald-600" : "text-amber-600"}`}>
                            {log.accuracy}%
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {log.gamesPlayed.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {log.gamesPlayed.map((g, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-extrabold text-slate-600"
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No games</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatBadge({
  label,
  value,
  sub,
  icon,
  bg,
  border,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  bg: string;
  border: string;
}) {
  return (
    <div className={`p-6 rounded-[2rem] border-2 ${border} ${bg} shadow-lg space-y-3`}>
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center shadow-xs">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{sub}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{value}</p>
      </div>
    </div>
  );
}
