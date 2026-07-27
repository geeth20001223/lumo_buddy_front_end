import { motion } from "framer-motion";
import type { SurveyArea } from "@/types/survey";

const areaLabels: Record<SurveyArea, { label: string; icon: string; style: string; badgeBg: string }> = {
  emotion: { label: "Emotion Skills", icon: "💖", style: "border-rose-200 bg-rose-50 text-rose-700", badgeBg: "from-rose-500 to-pink-500" },
  cognitive: { label: "Cognitive Skills", icon: "🧩", style: "border-blue-200 bg-blue-50 text-blue-700", badgeBg: "from-blue-500 to-cyan-500" },
  self_awareness: { label: "Self-awareness", icon: "🌱", style: "border-emerald-200 bg-emerald-50 text-emerald-700", badgeBg: "from-emerald-500 to-teal-500" },
  mathematical: { label: "Mathematical Skills", icon: "🔢", style: "border-violet-200 bg-violet-50 text-violet-700", badgeBg: "from-violet-500 to-purple-500" },
};

type SurveySectionTitleProps = {
  area: SurveyArea;
  current: number;
  total: number;
};

export function SurveySectionTitle({
  area,
  current,
  total,
}: SurveySectionTitleProps) {
  const currentArea = areaLabels[area] || areaLabels.emotion;

  return (
    <motion.div
      key={`${area}-${current}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-fuchsia-100/90 shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest ${currentArea.style} shadow-xs`}>
          <span className="text-sm">{currentArea.icon}</span>
          {currentArea.label}
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Supportive Learning Survey
        </h1>
      </div>
      <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 bg-gradient-to-r from-fuchsia-50 to-purple-50 px-4 py-2 rounded-2xl border border-fuchsia-200 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
        Question <span className="text-fuchsia-700 font-black text-base">{current}</span> <span className="text-slate-400 font-bold">/ {total}</span>
      </div>
    </motion.div>
  );
}
