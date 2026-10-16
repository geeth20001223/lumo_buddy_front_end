import { motion } from "framer-motion";
import clsx from "clsx";
import { Check } from "lucide-react";

type SurveyAnswerOptionProps = {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
};

export function SurveyAnswerOption({
  label,
  isSelected,
  onSelect,
}: SurveyAnswerOptionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      aria-pressed={isSelected}
      className={clsx(
        "flex min-h-16 w-full items-center justify-between rounded-2xl border-2 px-5 sm:px-6 py-4 text-left transition-all duration-300 cursor-pointer relative overflow-hidden group select-none",
        isSelected
          ? "border-fuchsia-500 bg-gradient-to-r from-fuchsia-50/95 via-purple-50/90 to-pink-50/95 text-fuchsia-950 shadow-md shadow-fuchsia-500/15 ring-4 ring-fuchsia-200/60 font-black"
          : "border-slate-200/90 bg-white/95 text-slate-800 hover:border-fuchsia-300 hover:bg-fuchsia-50/50 shadow-xs font-bold",
      )}
      onClick={onSelect}
      type="button"
    >
      <div className="flex items-center gap-3 pr-3 flex-1">
        <span className="text-sm sm:text-base font-extrabold leading-snug break-words">
          {label}
        </span>
      </div>

      <motion.span
        animate={{ scale: isSelected ? 1.1 : 1 }}
        className={clsx(
          "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs transition-all duration-300 shrink-0 shadow-xs",
          isSelected
            ? "border-fuchsia-600 bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 text-white shadow-md shadow-fuchsia-500/30"
            : "border-slate-300 bg-slate-50 text-transparent group-hover:border-fuchsia-300",
        )}
      >
        {isSelected ? <Check size={16} strokeWidth={3} /> : null}
      </motion.span>
    </motion.button>
  );
}
