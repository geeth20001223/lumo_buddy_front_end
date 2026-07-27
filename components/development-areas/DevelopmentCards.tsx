"use client";

import { motion } from "framer-motion";
import { Heart, Brain, User, Hash, CheckCircle2 } from "lucide-react";

const areas = [
    {
        id: "emotion",
        title: "Emotion Skills",
        icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Developing the ability to recognize, understand, and respond to emotional cues and expressions.",
        whyItMatters: "Emotional intelligence is the foundation of social connection and self-regulation. Understanding feelings helps children navigate social interactions with more confidence.",
        skills: ["Facial Expression Recognition", "Emotion Labeling", "Empathetic Responses", "Situational Context"],
        color: "text-rose-600",
        bgColor: "bg-gradient-to-br from-rose-50 via-pink-50/50 to-white",
        borderColor: "border-rose-200",
        dotColor: "bg-rose-500",
        iconBg: "bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-rose-300/40"
    },
    {
        id: "cognitive",
        title: "Cognitive Skills",
        icon: <Brain className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Strengthening mental processes like memory, attention, pattern recognition, and logical thinking.",
        whyItMatters: "Cognitive development supports problem-solving and learning readiness. It helps children organize information and make sense of their daily environment.",
        skills: ["Pattern Matching", "Visual Memory", "Logical Sequencing", "Focus & Attention"],
        color: "text-blue-600",
        bgColor: "bg-gradient-to-br from-blue-50 via-sky-50/50 to-white",
        borderColor: "border-blue-200",
        dotColor: "bg-blue-500",
        iconBg: "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-blue-300/40"
    },
    {
        id: "self-awareness",
        title: "Self Awareness",
        icon: <User className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Building an understanding of one's own body, preferences, and personal identity.",
        whyItMatters: "Self-awareness fosters independence and agency. When children understand themselves, they can communicate their needs and preferences more effectively.",
        skills: ["Body Awareness", "Personal Preferences", "Identifying Needs", "Creative Expression"],
        color: "text-indigo-600",
        bgColor: "bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white",
        borderColor: "border-emerald-200",
        dotColor: "bg-emerald-500",
        iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-emerald-300/40"
    },
    {
        id: "mathematical",
        title: "Mathematical Skills",
        icon: <Hash className="w-8 h-8 md:w-10 md:h-10" />,
        description: "Introducing fundamental concepts of numbers, quantity, shapes, and spatial awareness.",
        whyItMatters: "Early math skills provide a structured way to understand the world. They support daily tasks like counting, sorting, and recognizing physical patterns.",
        skills: ["Object Counting", "Shape Recognition", "Size Comparisons", "Spatial Awareness"],
        color: "text-violet-600",
        bgColor: "bg-gradient-to-br from-violet-50 via-purple-50/50 to-white",
        borderColor: "border-violet-200",
        dotColor: "bg-violet-500",
        iconBg: "bg-gradient-to-br from-violet-400 to-purple-500 text-white shadow-violet-300/40"
    }
];

export function DevelopmentCards() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-fuchsia-200 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-600 shadow-sm">
                        Four Pillars
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Core Developmental Pillars</h2>
                    <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
                        Each area targets specific skill sets designed to nurture holistic growth through engaging, supportive activities.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch w-full">
                    {areas.map((area, index) => (
                        <motion.div
                            key={area.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`w-full min-w-0 rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-2 ${area.borderColor} ${area.bgColor} shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full space-y-8 relative overflow-hidden group box-border break-words`}
                        >
                            {/* Header: Icon & Title */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-6">
                                    <div className={`w-16 h-16 rounded-2xl ${area.iconBg} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        {area.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{area.title}</h3>
                                        <p className="text-sm md:text-base text-slate-600 font-semibold leading-relaxed">{area.description}</p>
                                    </div>
                                </div>

                                {/* Why It Matters */}
                                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/90 shadow-sm space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Why It Matters</p>
                                    <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">{area.whyItMatters}</p>
                                </div>
                            </div>

                            {/* Key Skills Checklist */}
                            <div className="space-y-3 pt-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Key Skills Addressed</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {area.skills.map((skill, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-white/80 shadow-xs">
                                            <CheckCircle2 size={16} className={area.color} />
                                            <span className="text-xs font-extrabold text-slate-800">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
