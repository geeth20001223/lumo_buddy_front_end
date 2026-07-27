"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, ClipboardList, Play } from "lucide-react";
import type { ChildProgressData, ParentInsight } from "@/lib/progress";

interface AttentionSectionProps {
    children: ChildProgressData[];
}

export function AttentionSection({ children }: AttentionSectionProps) {
    const flagged = children.filter((c) => c.needsAttention);
    if (flagged.length === 0) return null;

    return (
        <section className="py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>⚠️</span> Children Requiring Attention
                    </h2>
                    <p className="text-slate-600 font-semibold">These children may benefit from additional support or a next activity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {flagged.map((row, idx) => (
                        <motion.div
                            key={row.child.id}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            className="group bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white border-2 border-amber-200/80 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-300/40 group-hover:scale-110 transition-transform">
                                {row.status === "no_assessment" ? <ClipboardList size={24} /> : <AlertTriangle size={24} />}
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div>
                                    <p className="font-extrabold text-slate-900 text-lg">{row.child.child_name}</p>
                                    <p className="text-sm text-slate-600 font-semibold leading-relaxed mt-1">{row.attentionReason}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                    {row.status === "no_assessment" ? (
                                        <Link
                                            href={`/survey/${row.child.id}`}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-[11px] font-extrabold uppercase tracking-widest hover:shadow-md transition-all w-full sm:w-auto"
                                        >
                                            <ClipboardList size={14} /> Start Assessment 📋
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/games/${row.child.id}`}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-[11px] font-extrabold uppercase tracking-widest hover:shadow-md transition-all w-full sm:w-auto"
                                        >
                                            <Play size={14} fill="currentColor" /> Continue Learning 🎮
                                        </Link>
                                    )}
                                    <Link
                                        href={`/children/${row.child.id}`}
                                        className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white border-2 border-amber-200 text-amber-800 text-[11px] font-extrabold uppercase tracking-widest hover:bg-amber-50 transition-all w-full sm:w-auto"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

interface InsightsSectionProps {
    insights: ParentInsight[];
    children: ChildProgressData[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
    if (insights.length === 0) return null;

    const styleMap = {
        positive: "bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white border-2 border-emerald-200 text-emerald-900 shadow-md",
        neutral: "bg-gradient-to-br from-blue-50 via-indigo-50/60 to-white border-2 border-blue-200 text-blue-900 shadow-md",
        support: "bg-gradient-to-br from-amber-50 via-orange-50/60 to-white border-2 border-amber-200 text-amber-900 shadow-md",
    };

    return (
        <section className="py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>💡</span> Parent Insights
                    </h2>
                    <p className="text-slate-600 font-semibold">Observations based on your family&rsquo;s current learning data.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.07 }}
                            className={`p-6 rounded-[2.5rem] text-sm font-extrabold leading-relaxed ${styleMap[insight.type]}`}
                        >
                            <span className="mr-2 text-base">💡</span>
                            {insight.text}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
