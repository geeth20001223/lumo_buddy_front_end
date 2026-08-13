"use client";

import { motion } from "framer-motion";

interface NumberChoiceGridProps {
  options: number[];
  onSelect: (value: number) => void;
  disabled: boolean;
}

export function NumberChoiceGrid({ options, onSelect, disabled }: NumberChoiceGridProps) {
  const gridClass = options.length === 2
    ? "grid-cols-2 max-w-3xl"
    : options.length === 3
      ? "grid-cols-3 max-w-4xl"
      : "grid-cols-2 sm:grid-cols-4 max-w-5xl";

  return (
    <div className={`mx-auto grid w-full ${gridClass} gap-3 px-2 sm:gap-4 lg:gap-5`}>
      {options.map((value, index) => (
        <motion.button
          key={value}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
          whileHover={!disabled ? { y: -4, scale: 1.03 } : {}}
          whileTap={!disabled ? { scale: 0.97 } : {}}
          disabled={disabled}
          onClick={() => onSelect(value)}
          className="group relative flex h-16 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/90 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-50/60 hover:shadow-[0_18px_40px_rgba(34,211,238,0.14)] focus:outline-none focus:ring-4 focus:ring-cyan-200/70 disabled:pointer-events-none disabled:opacity-50 sm:h-20 lg:h-22"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.82),transparent_34%)] opacity-90" />
          <span className="relative text-3xl font-black text-slate-800 transition-colors group-hover:text-cyan-600 sm:text-4xl">
            {value}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
