"use client";

import { motion } from "framer-motion";
import { FileSearch, Sparkles, Gamepad2, Database, BarChart2 } from "lucide-react";

export function LearningFlow() {
  const steps = [
    { icon: <FileSearch size={26} />, label: "Assessment Results", bg: "bg-blue-50 text-blue-600 border-blue-200" },
    { icon: <Sparkles size={26} />, label: "Recommendations", bg: "bg-purple-50 text-purple-600 border-purple-200" },
    { icon: <Gamepad2 size={26} />, label: "Activities", bg: "bg-teal-50 text-teal-600 border-teal-200" },
    { icon: <Database size={26} />, label: "Progress Data", bg: "bg-amber-50 text-amber-600 border-amber-200" },
    { icon: <BarChart2 size={26} />, label: "Parent Insights", bg: "bg-rose-50 text-rose-600 border-rose-200" },
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-xs font-black uppercase tracking-[0.2em] text-sky-700 mb-3 shadow-2xs">
            AUTOMATED PIPELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Personalized Learning Flow
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-extrabold max-w-2xl mx-auto px-4 leading-relaxed">
            Every child follows a personalized learning path based on assessment results and activity performance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-4 flex-1 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 group w-full"
              >
                <div className={`w-20 h-20 rounded-3xl ${step.bg} border-2 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  {step.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 text-center max-w-[130px] leading-snug">
                  {step.label}
                </span>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block flex-1 min-w-[30px] h-1 bg-slate-200 rounded-full relative overflow-hidden">
                  <motion.div
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 w-12 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                  />
                </div>
              )}

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="lg:hidden text-sky-400 py-1">
                  <ChevronDown size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChevronDown({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
    </svg>
  );
}
