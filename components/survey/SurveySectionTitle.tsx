import { motion } from "framer-motion";
import type { SurveyArea } from "@/types/survey";
import { AREA_CONFIG } from "@/lib/survey-questions-data";

type SurveySectionTitleProps = {
  area: SurveyArea;
  areaLabel?: string;
  areaIcon?: string;
  current: number;
  total: number;
};

export function SurveySectionTitle({
  area,
  areaLabel,
  areaIcon,
  current,
  total,
}: SurveySectionTitleProps) {
  const config = AREA_CONFIG[area] || {
    label: areaLabel || "Screening Area",
    icon: areaIcon || "📋",
    style: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
    badgeBg: "from-fuchsia-500 to-purple-500",
  };

  const displayLabel = areaLabel || config.label;
  const displayIcon = areaIcon || config.icon;

  return (
    <motion.div
      key={`${area}-${current}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-fuchsia-100/90 shadow-md"
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest ${config.style} shadow-xs`}
        >
          <span className="text-sm">{displayIcon}</span>
          {displayLabel}
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Supportive Learning Survey
        </h1>
      </div>
      <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-slate-700 bg-gradient-to-r from-fuchsia-50 to-purple-50 px-4 py-2 rounded-2xl border border-fuchsia-200 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
        Question{" "}
        <span className="text-fuchsia-700 font-black text-base">{current}</span>{" "}
        <span className="text-slate-400 font-bold">/ {total}</span>
      </div>
    </motion.div>
  );
}
