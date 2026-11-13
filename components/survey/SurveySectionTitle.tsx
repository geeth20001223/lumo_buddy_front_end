import { motion } from "framer-motion";
import type { SurveyArea } from "@/types/survey";
import { AREA_CONFIG } from "@/lib/survey-questions-data";

type SurveySectionTitleProps = {
  area: SurveyArea;
  areaLabel?: string;
  areaIcon?: string;
  current: number;   // 1-based global question number
  total: number;     // total questions (24)
};

const QUESTIONS_PER_CATEGORY = 6;

// Which question (1–6) within the current category
function getPositionInCategory(globalOneBased: number): { pos: number; catNum: number } {
  const zeroIdx = globalOneBased - 1;
  const catNum  = Math.floor(zeroIdx / QUESTIONS_PER_CATEGORY) + 1; // 1–4
  const pos     = (zeroIdx % QUESTIONS_PER_CATEGORY) + 1;           // 1–6
  return { pos, catNum };
}

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
  const displayIcon  = areaIcon  || config.icon;

  const { pos, catNum } = getPositionInCategory(current);

  // Mini 6-dot row for position within the category
  const dots = Array.from({ length: QUESTIONS_PER_CATEGORY }, (_, i) => i + 1);

  return (
    <motion.div
      key={`${area}-${current}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between bg-white/85 backdrop-blur-md px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-3xl border-2 border-fuchsia-100/90 shadow-md"
    >
      {/* Left: category badge + title */}
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest shrink-0 ${config.style} shadow-xs`}
        >
          <span className="text-sm">{displayIcon}</span>
          <span className="hidden sm:inline">{displayLabel}</span>
          <span className="sm:hidden">Section {catNum}</span>
        </span>
        <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight truncate">
          {displayLabel}
        </h1>
      </div>

      {/* Right: question counter + mini dots */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Mini dot track: position within the 6-question category */}
        <div className="flex items-center gap-1">
          {dots.map((d) => (
            <motion.div
              key={d}
              animate={{ scale: d === pos ? 1.5 : 1 }}
              transition={{ duration: 0.2 }}
              className={`rounded-full transition-all duration-300 ${
                d < pos
                  ? `w-2 h-2 bg-gradient-to-br ${config.badgeBg} opacity-80`
                  : d === pos
                  ? `w-2.5 h-2.5 bg-gradient-to-br ${config.badgeBg} shadow-sm`
                  : "w-1.5 h-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Global counter */}
        <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-gradient-to-r from-fuchsia-50 to-purple-50 px-3.5 py-2 rounded-2xl border border-fuchsia-200 shadow-xs whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          Q{" "}
          <span className="text-fuchsia-700 font-black text-sm">{current}</span>
          <span className="text-slate-400 font-bold">/ {total}</span>
        </div>
      </div>
    </motion.div>
  );
}
