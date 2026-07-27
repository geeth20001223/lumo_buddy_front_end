"use client";

import { motion } from "framer-motion";
import { PlayCircle, Target, Trophy, LineChart, FileText, Sparkles, Gamepad2, TrendingUp, ChevronRight } from "lucide-react";

export function SupportFlows() {
    const activitySteps = [
        { icon: <PlayCircle size={28} />, label: "Targeted Activity", color: "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200" },
        { icon: <Target size={28} />, label: "Skill Practice", color: "bg-purple-100 text-purple-600 border-purple-200" },
        { icon: <Trophy size={28} />, label: "Confidence Building", color: "bg-amber-100 text-amber-600 border-amber-200" },
        { icon: <LineChart size={28} />, label: "Progress Tracking", color: "bg-emerald-100 text-emerald-600 border-emerald-200" }
    ];

    const personalizationSteps = [
        { icon: <FileText size={24} />, label: "Parent Assessment", desc: "Understanding current needs", badge: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200" },
        { icon: <Sparkles size={24} />, label: "Recommendations", desc: "Personalized path focus", badge: "bg-purple-100 text-purple-700 border-purple-200" },
        { icon: <Gamepad2 size={24} />, label: "Learning Activities", desc: "Tailored skill building", badge: "bg-rose-100 text-rose-700 border-rose-200" },
        { icon: <TrendingUp size={24} />, label: "Growth Insights", desc: "Informed next steps", badge: "bg-emerald-100 text-emerald-700 border-emerald-200" }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-32">

                {/* Support Flow */}
                <div className="space-y-16">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200 text-xs font-black uppercase tracking-[0.2em] text-purple-600 shadow-sm">
                            Step by Step
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How Activities Support Development</h2>
                        <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
                            Our structured approach ensures that every interaction contributes to meaningful developmental outcomes.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-4xl mx-auto">
                        {activitySteps.map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center gap-8 md:gap-4 flex-1 w-full min-w-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center gap-4 group w-full"
                                >
                                    <div className={`w-20 h-20 rounded-[2rem] bg-white/90 backdrop-blur-md border-2 ${step.color} flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg shrink-0`}>
                                        {step.icon}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-700 text-center">
                                        {step.label}
                                    </span>
                                </motion.div>
                                {index < activitySteps.length - 1 && (
                                    <div className="text-fuchsia-400 rotate-90 md:rotate-0 flex-shrink-0">
                                        <ChevronRight size={22} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Personalization Pipeline */}
                <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-6 sm:p-10 md:p-14 border-2 border-fuchsia-100/60 shadow-xl space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-600 shadow-sm">
                            Tailored Approach
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Personalized for Every Child</h2>
                        <p className="text-slate-600 font-semibold leading-relaxed">
                            No two children are the same. BrightPath adapts activity difficulty and recommendations based on individual assessment results and continuous play.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        {personalizationSteps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gradient-to-br from-fuchsia-50/50 via-rose-50/30 to-white rounded-3xl p-6 border-2 border-fuchsia-100 shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-start h-full min-w-0 w-full overflow-hidden"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${step.badge} border flex items-center justify-center shadow-inner shrink-0`}>
                                    {step.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-slate-900 text-base">{step.label}</h3>
                                    <p className="text-xs font-semibold text-slate-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export function ImportanceGrid() {
    const reasons = [
        {
            title: "Building Confidence",
            desc: "Gentle progression allows children to master small challenges, creating a positive feedback loop of achievement.",
            icon: "✨",
            color: "border-fuchsia-200 bg-gradient-to-br from-fuchsia-50/80 via-pink-50/40 to-white"
        },
        {
            title: "Enhancing Communication",
            desc: "Emotional and self-awareness activities provide children with the tools to express their internal experiences.",
            icon: "💬",
            color: "border-rose-200 bg-gradient-to-br from-rose-50/80 via-pink-50/40 to-white"
        },
        {
            title: "Supporting Daily Independence",
            desc: "Cognitive sequencing and mathematical sorting lay the groundwork for real-world daily routines and tasks.",
            icon: "🌱",
            color: "border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-white"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-fuchsia-200 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-600 shadow-sm">
                        Purposeful Learning
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Why These Skills Matter</h2>
                    <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
                        Early supportive practice strengthens foundational capabilities that extend far beyond screen time.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
                    {reasons.map((r, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`w-full min-w-0 rounded-[2.5rem] p-6 sm:p-8 border-2 ${r.color} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start h-full space-y-4 overflow-hidden break-words box-border`}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-slate-100 shrink-0">
                                {r.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 leading-snug">{r.title}</h3>
                            <p className="text-sm font-semibold text-slate-600 leading-relaxed flex-1">{r.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
