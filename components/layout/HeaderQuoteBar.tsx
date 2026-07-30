"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

const HEADER_QUOTES = [
  "Every child learns in their own unique and beautiful way 💖",
  "Empowering young minds through playful adaptive learning ✨",
  "Small daily progress leads to big developmental achievements 🎈",
  "Games tailored specifically to your child's support level 🏆",
  "Building confidence, growth, and joy one activity at a time 🌟",
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
    <div className="w-full bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 py-1.5 px-3 sm:px-4 text-white text-center shadow-2xs select-none min-h-[30px] flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2">
        <Sparkles size={13} className="text-amber-300 fill-amber-300 animate-spin flex-shrink-0 hidden min-[360px]:inline-block" style={{ animationDuration: '6s' }} />
        
        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIdx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.35 }}
            className="text-[11px] sm:text-xs font-extrabold sm:font-black tracking-normal sm:tracking-wider leading-tight text-center text-white drop-shadow-xs"
          >
            {HEADER_QUOTES[quoteIdx]}
          </motion.p>
        </AnimatePresence>

        <Heart size={12} className="text-pink-300 fill-pink-300 flex-shrink-0 hidden sm:inline" />
      </div>
    </div>
  );
}
