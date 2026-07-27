"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "At what age should my child start?",
        answer: "BrightPath is designed for children at various developmental stages. We focus on skill levels rather than strict age brackets to ensure every child gets the support they need at their own pace."
    },
    {
        question: "How often are skills assessed?",
        answer: "Assessment is an ongoing process. While we recommend a formal parent survey review every few months, the platform continuously tracks activity performance to refine recommendations."
    },
    {
        question: "Can I focus on just one area?",
        answer: "Yes, you can prioritize specific learning tracks in the parent dashboard, although we recommend a balanced approach across all core development pillars for holistic growth."
    },
    {
        question: "Are these skills recognized by specialists?",
        answer: "The developmental areas we support—emotion recognition, cognitive patterns, self-awareness, and basic mathematics—are foundational skills widely recognized in childhood development and neurodiversity support."
    }
];

export function DevelopmentFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-fuchsia-200 text-xs font-black uppercase tracking-[0.2em] text-fuchsia-600 shadow-sm">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Common Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl md:rounded-3xl border-2 transition-all duration-300 ${openIndex === index ? "bg-white/90 backdrop-blur-md border-fuchsia-200 shadow-md" : "bg-white/70 border-fuchsia-100 hover:border-fuchsia-200"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-6 flex items-center justify-between gap-4 text-left"
                            >
                                <span className="text-base md:text-lg font-extrabold text-slate-900">{faq.question}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === index ? "bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white rotate-180 shadow-sm" : "bg-fuchsia-50 text-fuchsia-600"
                                    }`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2 text-sm md:text-base font-semibold text-slate-600 leading-relaxed border-t border-fuchsia-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function DevelopmentCTA() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-900 overflow-hidden p-10 md:p-20 text-center space-y-6 shadow-2xl border-2 border-purple-800/40">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                            Start Supporting Your Child&rsquo;s Growth Today 🚀
                        </h2>
                        <p className="text-base md:text-lg text-purple-200/80 font-semibold leading-relaxed">
                            Create a child profile, complete the brief initial survey, and unlock tailored learning activities.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white text-purple-900 font-extrabold text-sm uppercase tracking-widest shadow-xl hover:bg-purple-50 transition-all flex items-center justify-center gap-3 hover:scale-105"
                            >
                                Get Started Free ✨
                                <ArrowRight size={18} strokeWidth={2.5} />
                            </Link>
                            <Link
                                href="/children"
                                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-purple-900/60 text-purple-100 border-2 border-purple-700/60 font-extrabold text-sm uppercase tracking-widest hover:bg-purple-800/60 transition-all flex items-center justify-center hover:scale-105"
                            >
                                Child Profiles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
