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
    gameTitle?: string;
}

const LEVEL_MASCOT_VARIANTS: Record<number, { image: string; speech: string }> = {
    1: { image: "/mascot/mascot-happy.png", speech: "Hi friend! Let's explore Level 1 together! 🎉" },
    2: { image: "/mascot/mascot-supportive.png", speech: "You're growing so fast! Ready for Level 2? 🌟" },
    3: { image: "/mascot/mascot-normal.png", speech: "Mastery Level! Let me guide you to win! 🚀" },
};

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
    chips = [],
    gameTitle
}: GameIntroScreenProps) {

    const mascotVariant = LEVEL_MASCOT_VARIANTS[level] || LEVEL_MASCOT_VARIANTS[1];
    // Always use 100% transparent 3D Lumi Mascot pose tailored for the level across ALL games
    const displayMascot = (mascotImage && mascotImage.startsWith("/mascot/"))
        ? mascotImage
        : mascotVariant.image;

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

    const mainTitle = gameTitle || title;
    const showSecondaryTitle = Boolean(
        title && gameTitle && title.toLowerCase().trim() !== gameTitle.toLowerCase().trim()
    );

    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-2 sm:px-6 sm:py-4">
            <CalmBackground />

            {/* Background decorative blobs */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl -z-0 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl -z-0 animate-pulse" />

            <div className="relative z-10 flex w-full max-w-md sm:max-w-lg flex-col items-center gap-2 sm:gap-3">
                {/* Main Game Name & Level Number Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center gap-1 text-center"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-3.5xl font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent drop-shadow-xs">
                        ✨ {mainTitle} ✨
                    </h1>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 px-3.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-800 shadow-[0_4px_12px_rgba(245,158,11,0.18)]">
                        <span>⭐</span> LEVEL {level}
                    </div>
                </motion.div>

                {/* Mascot Illustration with Animated Speech Bubble */}
                <div className="relative flex flex-col items-center">
                    {/* Speech Bubble */}
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="relative z-20 mb-1 rounded-2xl bg-gradient-to-r from-white via-sky-50/80 to-white px-4 py-1.5 text-center text-xs sm:text-sm font-extrabold text-slate-800 shadow-[0_8px_20px_rgba(56,189,248,0.16)] border border-sky-200/90 backdrop-blur-md"
                    >
                        <span>{mascotVariant.speech}</span>
                        {/* Bubble tail */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rotate-45 border-r border-b border-sky-200/90" />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
                        transition={{
                            scale: { type: "spring", stiffness: 100, damping: 15 },
                            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 my-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/40 via-blue-300/30 to-purple-400/30 blur-2xl rounded-full scale-110 animate-pulse" />
                        <div className="relative size-full">
                            <Image
                                src={displayMascot}
                                alt="Game Mascot"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="w-full space-y-3 rounded-[2rem] border-2 border-white/90 bg-white/85 p-3.5 sm:p-5 text-center shadow-[0_16px_40px_rgba(30,58,138,0.08)] backdrop-blur-2xl sm:space-y-3.5 sm:rounded-[2.4rem]"
                >
                    <div className="space-y-1">
                        <div className="flex flex-col items-center gap-1">
                            <span className={`rounded-full border px-3.5 py-0.5 text-[9px] font-black uppercase tracking-[0.18em] sm:px-4 sm:text-[10px] ${style.bg} ${style.text} ${style.border} shadow-xs`}>
                                🎯 {levelLabel}
                            </span>
                            {showSecondaryTitle && (
                                <h2 className="text-lg font-black leading-tight tracking-tight text-slate-900 sm:text-xl">
                                    {title}
                                </h2>
                            )}
                        </div>
                        <p className="mx-auto max-w-md text-xs font-bold leading-relaxed text-slate-600 sm:text-sm">
                            {description}
                        </p>
                    </div>

                    {/* Information Chips */}
                    {chips.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                            {chips.map((chip, idx) => (
                                <motion.div 
                                    key={idx} 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-white px-2.5 py-1 text-[10px] font-black text-slate-700 shadow-xs sm:px-3 sm:text-xs"
                                >
                                    <span className="text-sm sm:text-base">{chip.icon}</span>
                                    {chip.text}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-1.5 pt-0.5 sm:gap-2">
                        <button
                            onClick={onStart}
                            className={`w-full rounded-full px-5 py-3 text-center text-xs font-black uppercase text-white shadow-[0_10px_24px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_14px_30px_rgba(37,99,235,0.4)] sm:px-7 sm:py-3.5 sm:text-sm ${style.button} whitespace-normal break-words tracking-widest`}
                        >
                            {buttonText} 🚀
                        </button>
                        <button
                            onClick={onBack}
                            className="w-full rounded-full border border-slate-200/80 bg-white/80 py-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-500 shadow-xs transition-all duration-300 hover:bg-slate-100 hover:text-slate-800"
                        >
                            Back to Games
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

