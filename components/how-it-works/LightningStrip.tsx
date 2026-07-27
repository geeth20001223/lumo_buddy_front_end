"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, ShieldCheck, Heart, Award } from "lucide-react";

const STRIP_ITEMS = [
  { icon: <Zap size={16} className="text-amber-400 fill-amber-400 animate-bounce" />, text: "INSTANT ASSESSMENT" },
  { icon: <Sparkles size={16} className="text-sky-400 fill-sky-400" />, text: "PERSONALIZED PATHS" },
  { icon: <ShieldCheck size={16} className="text-emerald-400" />, text: "CHILD-SAFE ENVIRONMENT" },
  { icon: <Heart size={16} className="text-rose-400 fill-rose-400" />, text: "CALM & SUPPORTIVE" },
  { icon: <Award size={16} className="text-purple-400" />, text: "PROGRESS TRACKING" },
];

export function LightningStrip() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 py-3 border-y-2 border-amber-400/40 shadow-lg">
      {/* Animated Glowing Electric Beam running horizontally */}
      <motion.div
        animate={{ left: ["-100%", "100%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none"
      />

      {/* Infinite Horizontal Marquee Ticker */}
      <div className="flex whitespace-nowrap overflow-hidden select-none">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 min-w-max"
        >
          {/* Duplicate list 3 times for seamless infinite scroll */}
          {[...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="p-1 rounded-lg bg-amber-400/10 border border-amber-400/30 shadow-[0_0_12px_rgba(251,191,36,0.3)]">
                {item.icon}
              </span>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-white drop-shadow-xs">
                {item.text}
              </span>
              <span className="text-amber-400/60 font-black text-xs">⚡</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
