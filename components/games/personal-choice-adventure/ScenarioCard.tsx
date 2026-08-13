"use client";

import { motion } from "framer-motion";

interface ScenarioCardProps {
  emoji: string;
  situation: string;
  question: string;
}

export function ScenarioCard({ emoji, situation, question }: ScenarioCardProps) {
  return (
    <motion.div
      key={situation}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="grid items-center gap-4 rounded-[2rem] border border-white/80 bg-white/80 p-3.5 text-center shadow-[0_22px_58px_rgba(244,114,182,0.10)] backdrop-blur-xl sm:p-5 lg:grid-cols-[auto_1fr] lg:p-6 lg:text-left">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto flex h-18 w-18 items-center justify-center rounded-[1.5rem] border border-white/90 bg-gradient-to-br from-white via-rose-50 to-sky-50 text-4xl shadow-[0_16px_34px_rgba(15,23,42,0.10)] sm:h-22 sm:w-22 sm:text-5xl lg:mx-0"
        >
          {emoji}
        </motion.div>

        <div className="space-y-2">
          <p className="mx-auto max-w-3xl text-xl font-black leading-tight text-slate-900 sm:text-2xl lg:mx-0">
            {situation}
          </p>
          <p className="inline-flex rounded-full border border-rose-100 bg-white/75 px-4 py-1.5 text-xs font-black tracking-tight text-rose-600 shadow-[0_10px_22px_rgba(244,114,182,0.08)] sm:text-sm">
            {question}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
