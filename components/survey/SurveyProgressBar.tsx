"use client";

import { motion } from "framer-motion";

type SurveyProgressBarProps = {
  current: number;      // number of answered questions
  total: number;        // total questions (24)
  currentIndex: number; // 0-based index of current question being shown
};

// 4 categories × 6 questions each
const CATEGORIES = [
  { label: "Emotion",   icon: "💖", color: "from-rose-500 to-pink-500",     bg: "bg-rose-500",    light: "bg-rose-50 border-rose-200 text-rose-700" },
  { label: "Cognitive", icon: "🧩", color: "from-blue-500 to-cyan-500",     bg: "bg-blue-500",    light: "bg-blue-50 border-blue-200 text-blue-700" },
  { label: "Sensory",   icon: "🌱", color: "from-emerald-500 to-teal-500",  bg: "bg-emerald-500", light: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { label: "Learning",  icon: "💡", color: "from-violet-500 to-purple-500", bg: "bg-violet-500",  light: "bg-violet-50 border-violet-200 text-violet-700" },
];

const QUESTIONS_PER_CATEGORY = 6;

export function SurveyProgressBar({ current, total, currentIndex }: SurveyProgressBarProps) {
  const overallPercent = total > 0 ? Math.round((current / total) * 100) : 0;

  // Which category is the current question in (0–3)
  const activeCatIndex = Math.min(
    Math.floor(currentIndex / QUESTIONS_PER_CATEGORY),
    CATEGORIES.length - 1
  );

  // Which question within the active category (1–6)
  const questionInCat = (currentIndex % QUESTIONS_PER_CATEGORY) + 1;

  return (
    <div className="space-y-3 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-fuchsia-100/90 shadow-md">

      {/* ── Top row: label + percent ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="uppercase tracking-widest text-slate-500 text-[10px] font-black">
            Survey Progress
          </span>
        </div>
        <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs font-black shadow-sm">
          {overallPercent}% Done
        </span>
      </div>

      {/* ── Overall progress bar ── */}
      <div className="w-full h-3 bg-slate-100/90 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 rounded-full shadow-sm"
          animate={{ width: `${overallPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* ── Category step indicators ── */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {CATEGORIES.map((cat, idx) => {
          // Count answered questions in this category
          const catStart   = idx * QUESTIONS_PER_CATEGORY;      // 0, 6, 12, 18
          const catEnd     = catStart + QUESTIONS_PER_CATEGORY;  // 6, 12, 18, 24
          const answered   = Math.max(0, Math.min(current, catEnd) - catStart);
          const isActive   = idx === activeCatIndex;
          const isComplete = answered === QUESTIONS_PER_CATEGORY;
          const isUpcoming = idx > activeCatIndex;

          return (
            <div key={cat.label} className="flex flex-col items-center gap-1.5">
              {/* Category icon pill */}
              <motion.div
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                className={`
                  w-full flex items-center justify-center gap-1.5 py-1.5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-wide transition-all duration-300
                  ${isComplete
                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-sm`
                    : isActive
                    ? `${cat.light} border-current shadow-md ring-2 ring-offset-1 ring-current/30`
                    : isUpcoming
                    ? "bg-slate-50 border-slate-200 text-slate-400"
                    : `${cat.light} border-current/40`
                  }
                `}
              >
                <span className="text-sm leading-none">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </motion.div>

              {/* Mini dot row (6 dots = 6 questions) */}
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: QUESTIONS_PER_CATEGORY }).map((_, dotIdx) => {
                  const globalIdx  = catStart + dotIdx;
                  const isDone     = globalIdx < current;        // already answered
                  const isCurrent  = globalIdx === currentIndex; // being answered now

                  return (
                    <motion.div
                      key={dotIdx}
                      animate={{ scale: isCurrent ? 1.5 : 1 }}
                      transition={{ duration: 0.25 }}
                      className={`
                        rounded-full transition-all duration-300
                        ${isCurrent
                          ? `w-2.5 h-2.5 bg-gradient-to-br ${cat.color} shadow-sm`
                          : isDone
                          ? `w-1.5 h-1.5 ${cat.bg} opacity-80`
                          : "w-1.5 h-1.5 bg-slate-200"
                        }
                      `}
                    />
                  );
                })}
              </div>

              {/* Question count label */}
              <span className={`text-[9px] font-black ${isActive ? "text-slate-700" : "text-slate-400"}`}>
                {isComplete
                  ? "✓ Done"
                  : isActive
                  ? `${questionInCat} / ${QUESTIONS_PER_CATEGORY}`
                  : isUpcoming
                  ? `0 / ${QUESTIONS_PER_CATEGORY}`
                  : `${answered} / ${QUESTIONS_PER_CATEGORY}`
                }
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
