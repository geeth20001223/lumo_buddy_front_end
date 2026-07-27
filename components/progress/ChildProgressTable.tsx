"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, ChevronRight } from "lucide-react";
import type { ChildProgressData } from "@/lib/progress";

const statusConfig = {
    excellent: { pill: "bg-emerald-100/80 text-emerald-700 border-emerald-300", dot: "bg-emerald-500" },
    doing_well: { pill: "bg-blue-100/80 text-blue-700 border-blue-300", dot: "bg-blue-500" },
    needs_support: { pill: "bg-amber-100/80 text-amber-700 border-amber-300", dot: "bg-amber-500" },
    inactive: { pill: "bg-slate-100 text-slate-500 border-slate-300", dot: "bg-slate-400" },
    no_assessment: { pill: "bg-rose-100/80 text-rose-700 border-rose-300", dot: "bg-rose-500" },
};

function formatDate(iso: string | null) {
    if (!iso) return "No activity yet";
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ChildProgressTableProps {
    children: ChildProgressData[];
}

export function ChildProgressTable({ children }: ChildProgressTableProps) {
    if (children.length === 0) return null;

    return (
        <section className="py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>👶</span> All Children Overview
                    </h2>
                    <p className="text-slate-600 font-semibold">A snapshot of each child&rsquo;s current learning status.</p>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-hidden rounded-[2.5rem] border-2 border-fuchsia-100/60 bg-white/90 backdrop-blur-md shadow-lg">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-fuchsia-50 via-rose-50 to-amber-50 border-b border-fuchsia-100">
                                {["Child", "Level", "Activities", "Accuracy", "Last Activity", "Status", "Actions"].map((h) => (
                                    <th key={h} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-fuchsia-50">
                            {children.map((row, idx) => {
                                const cfg = statusConfig[row.status];
                                return (
                                    <motion.tr
                                        key={row.child.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-fuchsia-50/40 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center text-white font-black shadow-md shadow-fuchsia-200">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-slate-900">{row.child.child_name}</p>
                                                    <p className="text-xs text-slate-500 font-semibold">Age {row.child.age}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-extrabold text-slate-800">
                                            {row.latestLevel ? (
                                                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 text-xs font-black">
                                                    Level {row.latestLevel}
                                                </span>
                                            ) : "—"}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-black text-slate-800">{row.totalActivities}</td>
                                        <td className="px-6 py-5">
                                            {row.totalActivities > 0 ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 max-w-[80px] h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full transition-all"
                                                            style={{ width: `${row.averageAccuracy}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-black text-slate-800">{row.averageAccuracy}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-semibold text-slate-600">{formatDate(row.lastActivityDate)}</td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-widest ${cfg.pill}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                                {row.statusLabel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <Link
                                                href={`/children/${row.child.id}`}
                                                className="inline-flex items-center gap-1 text-xs font-extrabold text-fuchsia-600 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200 px-3 py-1.5 rounded-xl transition-all"
                                            >
                                                Report <ChevronRight size={14} />
                                            </Link>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-4">
                    {children.map((row) => {
                        const cfg = statusConfig[row.status];
                        return (
                            <div key={row.child.id} className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-2 border-fuchsia-100 shadow-md space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center text-white font-black shadow-md shadow-fuchsia-200">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-slate-900">{row.child.child_name}</p>
                                            <p className="text-xs text-slate-500 font-semibold">Age {row.child.age}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${cfg.pill}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                                        {row.statusLabel}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-fuchsia-50/60 p-2.5 rounded-2xl border border-fuchsia-100">
                                        <span className="text-[10px] font-black text-fuchsia-600 uppercase block">Level</span>
                                        <span className="font-extrabold text-slate-800">{row.latestLevel ? `Level ${row.latestLevel}` : "—"}</span>
                                    </div>
                                    <div className="bg-rose-50/60 p-2.5 rounded-2xl border border-rose-100">
                                        <span className="text-[10px] font-black text-rose-600 uppercase block">Activities</span>
                                        <span className="font-extrabold text-slate-800">{row.totalActivities}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/children/${row.child.id}`}
                                    className="w-full inline-flex items-center justify-center gap-1 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-sm font-extrabold shadow-md"
                                >
                                    View Full Report <ChevronRight size={16} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
