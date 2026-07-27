"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UserPlus, FileText, Layout, PlayCircle, BarChart3, Sparkles } from "lucide-react";

const STEPS_LIST = [
  { icon: <UserPlus size={22} />, label: "Parent Setup", detail: "Register parent & add child profile" },
  { icon: <FileText size={22} />, label: "Assessment", detail: "Complete simple screening survey" },
  { icon: <Layout size={22} />, label: "Personalized Plan", detail: "Receive predicted support level" },
  { icon: <PlayCircle size={22} />, label: "Learning Activities", detail: "Play unlocked adaptive games" },
  { icon: <BarChart3 size={22} />, label: "Progress Tracking", detail: "Monitor developmental progress" },
];

export function HowItWorksHero() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS_LIST.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-fuchsia-200/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Heading & Description */}
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/15 via-fuchsia-500/15 to-indigo-500/15 border border-sky-200 text-xs font-black uppercase tracking-[0.2em] text-sky-700 mb-6 shadow-2xs">
                <Sparkles size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                PARENT GUIDE • STEP-BY-STEP
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                See How Lumo Buddy Supports Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-fuchsia-600 to-indigo-600">
                  Child's Journey
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg sm:text-xl text-slate-600 font-extrabold leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              From assessment to personalized activities and progress tracking, Lumo Buddy helps parents understand and support their child's development.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
              >
                Get Started
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link
                href="/development-areas"
                className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-white/90 text-slate-700 border-2 border-slate-200 font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center active:scale-95 shadow-sm"
              >
                View Development Areas
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Next-Level Interactive Step Diagram */}
          <div className="flex-1 w-full lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-6 sm:p-8 rounded-[3rem] bg-gradient-to-br from-white via-sky-50/90 to-fuchsia-50/80 backdrop-blur-2xl border-4 border-white shadow-[0_25px_60px_rgba(56,189,248,0.2)]"
            >
              <div className="space-y-4 relative z-10">
                {STEPS_LIST.map((step, idx) => {
                  const isActive = idx === activeStep;
                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      animate={{
                        scale: isActive ? 1.02 : 1,
                        x: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                        isActive
                          ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 border-sky-400 text-white shadow-lg shadow-sky-500/25"
                          : "bg-white/80 border-slate-100 text-slate-700 hover:border-sky-200"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-lg transition-colors ${
                          isActive
                            ? "bg-white/20 text-white border border-white/30"
                            : "bg-sky-50 text-sky-600 border border-sky-100"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-black uppercase tracking-wider ${isActive ? "text-white" : "text-slate-800"}`}>
                            {step.label}
                          </p>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              isActive ? "bg-white/30 text-white" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            Step 0{idx + 1}
                          </span>
                        </div>
                        <p className={`text-xs font-semibold truncate ${isActive ? "text-sky-100" : "text-slate-500"}`}>
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
