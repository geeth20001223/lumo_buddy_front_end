"use client";

import { motion } from "framer-motion";
import { ChoiceOption } from "@/lib/games/personal-choice-adventure/scenarios";

interface ChoiceCardGridProps {
  options: ChoiceOption[];
  onSelect: (option: ChoiceOption) => void;
  disabled: boolean;
}

export function ChoiceCardGrid({ options, onSelect, disabled }: ChoiceCardGridProps) {
  const isCompact = options.length > 2;

  const gridClass = options.length <= 2
    ? "max-w-3xl grid-cols-1 sm:grid-cols-2"
    : options.length === 4
    ? "max-w-6xl grid-cols-2 lg:grid-cols-4"
    : "max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`mx-auto grid w-full ${gridClass} gap-2.5 sm:gap-3 lg:gap-4 px-2`}>
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
          whileHover={!disabled ? { y: -3, scale: 1.01 } : {}}
          whileTap={!disabled ? { scale: 0.97 } : {}}
          disabled={disabled}
          onClick={() => onSelect(option)}
          className={`group relative flex items-center gap-3 overflow-hidden rounded-[1.5rem] border border-white/90 bg-white/90 text-left shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:border-rose-200 hover:bg-rose-50/50 hover:shadow-[0_18px_40px_rgba(244,114,182,0.14)] focus:outline-none focus:ring-4 focus:ring-rose-200/70 disabled:pointer-events-none disabled:opacity-50 ${
            isCompact
              ? "min-h-[72px] p-3 sm:min-h-[82px] sm:p-3.5"
              : "min-h-[110px] p-4 sm:min-h-[130px] sm:p-5 lg:min-h-[140px]"
          }`}
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.8),transparent_32%)] opacity-90" />
          <span className={`relative flex shrink-0 items-center justify-center rounded-xl border border-white/90 bg-gradient-to-br from-white via-rose-50 to-sky-50 shadow-xs transition-transform duration-500 group-hover:scale-105 ${
            isCompact
              ? "h-10 w-10 text-2xl sm:h-12 sm:w-12 sm:text-3xl"
              : "h-14 w-14 text-3xl sm:h-16 sm:w-16 sm:text-4xl"
          }`}>
            {option.emoji}
          </span>
          <span className={`relative font-black leading-snug text-slate-800 ${
            isCompact ? "text-xs sm:text-sm" : "text-sm sm:text-base lg:text-lg"
          }`}>
            {option.text}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
