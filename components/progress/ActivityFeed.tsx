"use client";

import { motion } from "framer-motion";
import { formatAreaName } from "@/lib/dashboard";
import type { RecentScore } from "@/lib/progress";

interface ActivityFeedProps {
    feed: (RecentScore & { childName: string })[];
}

function toRelativeDay(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const areaColor: Record<string, string> = {
    emotion: "bg-rose-100/80 text-rose-700 border-rose-200",
    cognitive: "bg-blue-100/80 text-blue-700 border-blue-200",
    self_awareness: "bg-emerald-100/80 text-emerald-700 border-emerald-200",
    mathematical: "bg-violet-100/80 text-violet-700 border-violet-200",
};

export function ActivityFeed({ feed }: ActivityFeedProps) {
    if (feed.length === 0) return null;

    // Group by relative day
    const grouped: Record<string, (RecentScore & { childName: string })[]> = {};
    feed.forEach((s) => {
        const label = toRelativeDay(s.played_at);
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(s);
    });

    return (
        <section className="py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <span>⏳</span> Recent Activity Feed
                    </h2>
                    <p className="text-slate-600 font-semibold">A timeline of completed learning activities.</p>
                </div>

                <div className="max-w-3xl space-y-10">
                    {Object.entries(grouped).slice(0, 5).map(([day, scores]) => (
                        <div key={day}>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-600 mb-4 px-1">{day}</p>
                            <div className="space-y-3">
                                {scores.map((score) => {
                                    const color = areaColor[score.area] ?? "bg-slate-100 text-slate-700 border-slate-200";
                                    return (
                                        <motion.div
                                            key={score.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-white/90 backdrop-blur-md border-2 border-fuchsia-100/60 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-extrabold text-slate-900 text-base">{score.childName}</span>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${color}`}>
                                                        {formatAreaName(score.area)}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-500">
                                                    Level {score.level}{score.time_taken ? ` · Time: ${Math.round(score.time_taken)}s` : ""}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <span className="inline-block font-black text-purple-700 bg-purple-100/80 px-3 py-1 rounded-xl text-sm border border-purple-200">
                                                    {score.final_score} pts
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
