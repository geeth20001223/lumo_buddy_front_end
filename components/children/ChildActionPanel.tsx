"use client";

import Link from "next/link";

type ChildActionPanelProps = {
  childId: string;
  hasAssessment: boolean;
  gameSummary: {
    totalGamesPlayed: number;
  } | null;
};

export function ChildActionPanel({ childId, hasAssessment, gameSummary }: ChildActionPanelProps) {

  const getRecommendation = () => {
    if (!hasAssessment) return "Complete the assessment first to personalize learning.";
    if (gameSummary && gameSummary.totalGamesPlayed > 0) return "Continue learning activities and review progress regularly.";
    return "Start the recommended games based on this assessment.";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Recommended Next Step Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/70 border-2 border-amber-200/70 p-5 rounded-3xl shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Recommended Next Step</p>
        <p className="text-sm font-extrabold text-slate-800 leading-relaxed">
          {getRecommendation()}
        </p>
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
              Continue to Games 🎮
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
