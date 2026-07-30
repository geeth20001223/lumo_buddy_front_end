"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

const HEADER_QUOTES = [
  "Every child learns in their own unique way 💖",
  "Empowering young minds through adaptive learning ✨",
  "Small daily progress leads to big achievements 🎈",
  "Games tailored to your child's support level 🏆",
  "Building confidence, growth, and joy every day 🌟",
];

export function HeaderQuoteBar() {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % HEADER_QUOTES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 py-1.5 px-2 sm:px-4 text-white text-center shadow-xs select-none min-h-[32px] flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 px-1 w-full">
        <Sparkles size={12} className="text-amber-300 fill-amber-300 animate-spin shrink-0 hidden min-[340px]:inline-block" style={{ animationDuration: '6s' }} />
        
        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-bold sm:font-black tracking-normal sm:tracking-wider leading-snug text-center text-white break-words max-w-full"
          >
            {HEADER_QUOTES[quoteIdx]}
          </motion.p>
        </AnimatePresence>

        <Heart size={12} className="text-pink-300 fill-pink-300 shrink-0 hidden sm:inline" />
      </div>
    </div>
  );
}
