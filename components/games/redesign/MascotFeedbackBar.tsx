"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type FeedbackType = "correct" | "incorrect" | null;

interface MascotFeedbackBarProps {
    feedbackType: FeedbackType;
    childName?: string;
}

const CONFIG = {
    correct: {
        image: "/mascot/mascot-happy.png",
        message: "Great job! You got it right! 🌟",
        bg: "bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50",
        border: "border-emerald-300/90",
        text: "text-emerald-800 font-black",
        glow: "bg-emerald-200/40",
    },
    incorrect: {
        image: "/mascot/mascot-supportive.png",
        message: "Good try! Let's try again together. 💛",
        bg: "bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50",
        border: "border-amber-300/90",
        text: "text-amber-800 font-black",
        glow: "bg-amber-100/40",
    },
    normal: {
        image: "/mascot/mascot-normal.png",
        message: "Choose the answer you think is correct.",
        bg: "bg-gradient-to-r from-sky-50/95 via-blue-50/90 to-indigo-50/90",
        border: "border-sky-300/80",
        text: "text-slate-800 font-extrabold",
        glow: "bg-sky-200/30",
    },
};

export function MascotFeedbackBar({ feedbackType }: MascotFeedbackBarProps) {
    const key = feedbackType ?? "normal";
    const cfg = CONFIG[key];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`
          w-full max-w-xl mx-auto flex items-center gap-4 px-4 py-2.5 sm:px-5 sm:py-3
          rounded-[2rem] border-2 backdrop-blur-xl shadow-[0_12px_32px_rgba(56,189,248,0.14)]
          ${cfg.bg} ${cfg.border}
        `}
            >
                {/* Mascot image */}
                <div className="relative flex-shrink-0">
                    <motion.div
                        key={key + "-img"}
                        animate={key === "correct" ? { rotate: [0, 10, -10, 0] } : { y: [0, -4, 0] }}
                        transition={key === "correct"
                            ? { duration: 0.5, repeat: 1 }
                            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        }
                        className="w-16 h-16 relative"
                    >
                        <Image
                            src={cfg.image}
                            alt="Lumi Mascot"
                            width={128}
                            height={128}
                            className="w-full h-full object-contain"
                            priority
                        />
                        {/* glow ring */}
                        <div className={`absolute inset-0 -z-10 rounded-full blur-xl ${cfg.glow}`} />
                    </motion.div>
                </div>

                {/* Message */}
                <p className={`font-bold text-sm sm:text-base leading-snug ${cfg.text}`}>
                    {cfg.message}
                </p>
            </motion.div>
        </AnimatePresence>
    );
}

