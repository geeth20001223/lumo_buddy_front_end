"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ChildActionPanelProps = {
  childId: string;
  hasAssessment: boolean;
  gameSummary: {
    totalGamesPlayed: number;
  } | null;
};

export function ChildActionPanel({ childId, hasAssessment, gameSummary }: ChildActionPanelProps) {

  const getRecommendationText = () => {
    if (!hasAssessment) return "Complete the survey assessment first to unlock personalized games.";
    if (gameSummary && gameSummary.totalGamesPlayed > 0) return "Continue developmental learning activities and practice regularly.";
    return "Start your child's recommended games based on the assessment.";
  };

  const getButtonText = () => {
    if (!hasAssessment) return "Start Survey Assessment 📋";
    return "Continue to Game Dashboard 🚀";
  };

  const getButtonHref = () => {
    if (!hasAssessment) return `/survey/${childId}`;
    return `/games/${childId}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Recommended Next Step Section as interactive card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50/80 to-rose-50/60 border-2 border-amber-200/80 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-200/70 flex items-center justify-center text-sm font-bold">💡</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">Recommended Next Step</span>
          </div>

          <p className="text-sm font-extrabold text-slate-800 leading-relaxed">
            {getRecommendationText()}
          </p>

          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <Link
              href={getButtonHref()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 mt-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95 transition-all duration-300 ring-4 ring-orange-300/40"
            >
              {getButtonText()}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {hasAssessment ? (
          <>
            <Link
              href={`/games/${childId}`}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-sm font-extrabold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Explore All Games 🎮
            </Link>
            <Link
              href={`/survey/${childId}`}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white border-2 border-purple-200 text-purple-700 text-sm font-extrabold shadow-sm hover:bg-purple-50 hover:border-purple-300 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Survey 📋
            </Link>
          </>
        ) : (
          <Link
            href={`/survey/${childId}`}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-sm font-extrabold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-fuchsia-500/35 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Start Survey 📋
          </Link>
        )}
        <Link
          href="/children"
          className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white border-2 border-fuchsia-100 text-fuchsia-600 text-sm font-extrabold shadow-sm hover:bg-fuchsia-50 hover:border-fuchsia-200 transition-all duration-300 active:scale-95"
        >
          Back to Children
        </Link>
      </div>
    </div>
  );
}
