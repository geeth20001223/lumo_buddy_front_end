"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalmBackground } from "@/components/ui/CalmBackground";

interface introChip {
    icon: string;
    text: string;
}

interface GameIntroScreenProps {
    title: string;
    description: string;
    level: number;
    levelLabel: string;
    mascotImage: string;
    buttonText: string;
    onStart: () => void;
    onBack: () => void;
    accentColor?: string;
    chips?: introChip[];
}

export function GameIntroScreen({
    title,
    description,
    level,
    levelLabel,
    mascotImage,
    buttonText,
    onStart,
    onBack,
    accentColor = "blue",
    chips = []
}: GameIntroScreenProps) {

    const colorStyles = {
        orange: {
            bg: "bg-orange-50",
            text: "text-orange-600",
            border: "border-orange-100",
            button: "bg-gradient-to-r from-orange-500 to-orange-600 shadow-orange-200",
        },
        blue: {
            bg: "bg-blue-50",
            text: "text-blue-600",
            border: "border-blue-100",
            button: "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200",
        },
        rose: {
            bg: "bg-rose-50",
            text: "text-rose-600",
            border: "border-rose-100",
            button: "bg-gradient-to-r from-rose-500 to-rose-600 shadow-rose-200",
        }
    };

    const style = colorStyles[accentColor as keyof typeof colorStyles] || colorStyles.blue;

    return (
        <div className="relative flex w-full items-center justify-center px-4 py-3 sm:p-6">
            <CalmBackground />

            {/* Background decorative blobs */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-50/40 rounded-full blur-3xl -z-0" />

            <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-2 sm:gap-4">
                {/* Mascot Illustration */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                    }}
                    className="relative h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36"
                >
                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
                    <Image
                        src={mascotImage}
                        alt="Game Mascot"
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                    />
                </motion.div>

                {/* Content Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full space-y-3 rounded-[2rem] border border-white/80 bg-white/60 p-4 text-center shadow-premium backdrop-blur-2xl sm:space-y-4 sm:rounded-[2.5rem] sm:p-7"
                >
                    <div className="space-y-2">
                        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                            <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] sm:px-4 sm:text-xs ${style.bg} ${style.text} ${style.border}`}>
                                Level {level} — {levelLabel}
                            </span>
                            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                                {title}
                            </h1>
                        </div>
                        <p className="mx-auto max-w-md text-xs sm:text-sm font-bold leading-relaxed text-slate-500">
                            {description}
                        </p>
                    </div>

                    {/* Information Chips */}
                    {chips.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                            {chips.map((chip, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 rounded-xl border-2 border-slate-50 bg-white px-2.5 py-1.5 text-[10px] font-black text-slate-600 shadow-sm sm:px-3 sm:text-xs">
                                    <span>{chip.icon}</span>
                                    {chip.text}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-2 pt-1 sm:gap-3">
                        <button
                            onClick={onStart}
                            className={`w-full rounded-full px-4 py-3.5 text-center text-sm font-black uppercase text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-4 sm:text-base ${style.button} whitespace-normal break-words tracking-[0.08em] sm:tracking-widest`}
                        >
                            {buttonText}
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full rounded-full bg-white/50 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 transition-all duration-300 hover:bg-white hover:text-slate-600 sm:text-xs sm:tracking-widest"
                        >
                            Back to Games
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

