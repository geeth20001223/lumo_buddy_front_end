"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AssessmentBackground } from "@/components/assessment/AssessmentBackground";
import { getChildForCurrentParent } from "@/lib/children";
import { getLatestAssessmentForCurrentParent } from "@/lib/survey";
import {
  calculateAreaLevel,
  getAreaLabel,
  isAreaRecommendationsEnabled,
} from "@/lib/area-recommendations";
import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";

// ─── Area score card ────────────────────────────────────────────────────────

type AreaCardProps = {
  label: string;
  score: number;
  maxScore: number;
  questionCount?: number;
  areaLevel?: number;
  emoji: string;
  bg: string;
  bar: string;
  text: string;
  border: string;
  badgeBg: string;
  delay: number;
};

function AreaScoreCard({
  label,
  score,
  maxScore = 6,
  questionCount = 6,
  areaLevel = 1,
  emoji,
  bg,
  bar,
  text,
  border,
  badgeBg,
  delay,
}: AreaCardProps) {
  // Gracefully normalize legacy scores to the 6-point section scale
  const rawScore = typeof score === "number" && !isNaN(score) ? score : 0;
  const normalizedScore =
    rawScore <= 6
      ? rawScore
      : rawScore <= 18
      ? Math.min(maxScore, Math.round((rawScore / 18) * maxScore))
      : rawScore <= 24
      ? Math.min(maxScore, Math.round((rawScore / 24) * maxScore))
      : Math.min(maxScore, Math.round((rawScore / 32) * maxScore));

  const percent = Math.min(100, Math.round((normalizedScore / maxScore) * 100));

  const levelTag =
    areaLevel >= 3
      ? { label: "Level 3 · Advanced", badge: "bg-emerald-100 text-emerald-800 border-emerald-300" }
      : areaLevel === 2
      ? { label: "Level 2 · Developing", badge: "bg-purple-100 text-purple-800 border-purple-300" }
      : { label: "Level 1 · Foundational", badge: "bg-blue-100 text-blue-800 border-blue-300" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl sm:rounded-3xl ${bg} ${border} border-2 p-4 sm:p-6 flex flex-col justify-between gap-3.5 sm:gap-4 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
    >
      {/* Top row: Icon + Label + Dedicated High-Contrast Score Marks Box */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl ${badgeBg} flex items-center justify-center text-xl sm:text-2xl shadow-sm shrink-0`}>
            {emoji}
          </div>
          <div className="min-w-0">
            <span className={`text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest ${text} block truncate`}>
              {label}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 block">
              Section Assessment
            </span>
          </div>
        </div>

        {/* Dedicated Area Score Marks Box - always clearly visible on mobile */}
        <div className="shrink-0 flex flex-col items-end justify-center bg-white/95 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-baseline gap-0.5">
            <span className={`font-display text-2xl sm:text-3xl font-black ${text} leading-none`}>
              {normalizedScore}
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-400 leading-none">
              /{maxScore}
            </span>
          </div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mt-0.5">
            Area Marks
          </span>
        </div>
      </div>

      {/* Badges row: Question count, Level tag & Mastery percent */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 sm:py-1 rounded-full bg-white/90 border border-slate-200 text-slate-600 shadow-2xs">
          {questionCount} Questions
        </span>
        <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 sm:py-1 rounded-full border ${levelTag.badge} shadow-2xs`}>
          {levelTag.label}
        </span>
        <span className="text-[10px] sm:text-[11px] font-black text-slate-600 bg-white/80 border border-slate-200/80 px-2.5 py-0.5 sm:py-1 rounded-full shadow-2xs ml-auto">
          {percent}% Mastery
        </span>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5 pt-0.5">
        <div className="h-3 sm:h-3.5 rounded-full bg-white/90 overflow-hidden p-0.5 border border-slate-200/80 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, delay: delay + 0.2 }}
            className={`h-full rounded-full ${bar} shadow-xs`}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-600">
          <span className="truncate">Area Progress ({questionCount} Questions)</span>
          <span className="font-extrabold text-slate-700 shrink-0 ml-2">
            {normalizedScore} of {maxScore} Points
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-[3rem] bg-white/80 border-2 border-slate-200/60 h-64 shadow-sm" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="rounded-3xl bg-white/80 border-2 border-slate-200/60 h-32" />)}
      </div>
      <div className="rounded-3xl bg-white/80 border-2 border-slate-200/60 h-28" />
    </div>
  );
}

// ─── Level badge helper ──────────────────────────────────────────────────────

function levelConfig(level: number) {
  if (level === 1) return { label: "Level 1", color: "text-blue-700", bg: "bg-gradient-to-br from-blue-50 via-sky-50 to-white border-blue-200", desc: "Foundational Support" };
  if (level === 2) return { label: "Level 2", color: "text-purple-700", bg: "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 border-fuchsia-200", desc: "Developing Skills" };
  return { label: "Level 3", color: "text-emerald-700", bg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-emerald-200", desc: "Advanced Activities" };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AssessmentResultPage() {
  const params = useParams<{ childId: string }>();
  const router = useRouter();

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadResult() {
      try {
        const [childResult, latestAssessment] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getLatestAssessmentForCurrentParent(params.childId),
        ]);

        if (!latestAssessment) throw new Error("assessment_not_found");

        if (isMounted) {
          setChild(childResult.child);
          setAssessment(latestAssessment);
        }
      } catch (error) {
        if (!isMounted) return;
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }
        setErrorMessage("We could not load the result. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadResult();
    return () => { isMounted = false; };
  }, [params.childId, router]);

  const lvl = assessment ? levelConfig(assessment.predicted_level) : null;

  // Max score per developmental area = 6 (6 questions, evaluated out of 6)
  const MAX_AREA = 6;
  const maxTotalScore = MAX_AREA * 4; // 24
  const normalizedTotalScore = !assessment
    ? 0
    : assessment.total_score <= 24
    ? assessment.total_score
    : assessment.total_score <= 72
    ? Math.min(maxTotalScore, Math.round((assessment.total_score / 72) * maxTotalScore))
    : Math.min(maxTotalScore, Math.round((assessment.total_score / 96) * maxTotalScore));

  return (
    <main className="min-h-screen relative overflow-x-hidden overflow-y-auto bg-gradient-to-br from-fuchsia-50 via-rose-50/60 to-amber-50/40 pb-32 sm:pb-20">
      {/* Dedicated Calm Assessment Background */}
      <AssessmentBackground />

      {/* Floating Color Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-200/35 blur-[100px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-200/30 blur-[100px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }}></div>
        <div className="absolute top-[40%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/25 blur-[80px]" style={{ animation: 'drift 20s ease-in-out infinite' }}></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 25% { transform: translate(40px,-50px) scale(1.08); } 50% { transform: translate(-30px,30px) scale(0.92); } 75% { transform: translate(20px,-20px) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(15px,-25px); } 50% { transform: translate(-10px,15px); } 75% { transform: translate(20px,10px); } }
      `}} />

      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/children/${params.childId}`}
            className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-fuchsia-200/80 text-xs font-black uppercase tracking-widest text-fuchsia-700 hover:text-fuchsia-900 hover:bg-white hover:border-fuchsia-300 shadow-sm transition-all duration-300"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to child profile
          </Link>
        </motion.div>

        {/* Loading skeleton */}
        {isLoading && <Skeleton />}

        {/* Error */}
        {!isLoading && errorMessage && (
          <div className="rounded-2xl sm:rounded-[2.5rem] border-2 border-rose-200 bg-rose-50/90 backdrop-blur-md p-6 sm:p-10 text-center shadow-xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-2xl mx-auto shadow-sm">⚠️</div>
            <p className="font-display text-xl font-black text-rose-900">Something went wrong</p>
            <p className="text-sm text-rose-700 font-extrabold">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Main result */}
        {!isLoading && !errorMessage && child && assessment && lvl && (
          <>
            {/* ── Friendly Hero Result Card ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-2xl sm:rounded-[3rem] bg-white/95 backdrop-blur-xl border-2 border-fuchsia-200/90 shadow-2xl shadow-purple-900/10 p-5 sm:p-12 space-y-6 sm:space-y-8 overflow-hidden group"
            >
              <div className="text-center space-y-3 sm:space-y-4">
                {/* Completed badge */}
                <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-700 shadow-xs">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Survey Completed
                </span>

                <h1 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  Great job, {child.child_name.split(" ")[0]}!
                </h1>
                <p className="text-sm sm:text-lg text-slate-600 font-extrabold max-w-xl mx-auto leading-relaxed">
                  Here is the suggested activity level based on the supportive learning survey.
                </p>

                {/* Level + total score pills */}
                <div className="pt-2 sm:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`${lvl.bg} rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 border-2 text-center shadow-md flex flex-col justify-center space-y-1 relative overflow-hidden`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-500">Suggested Support Level</p>
                    <p className={`font-display text-4xl sm:text-6xl font-black ${lvl.color}`}>{assessment.predicted_level}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${lvl.color} bg-white/80 backdrop-blur-sm shadow-xs border border-current/20`}>
                      {lvl.desc}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white via-slate-50/80 to-slate-100/60 rounded-2xl sm:rounded-[2rem] border-2 border-slate-200/80 p-5 sm:p-7 text-center shadow-md flex flex-col justify-center space-y-1"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-400">Total Developmental Score</p>
                    <p className="font-display text-4xl sm:text-6xl font-black text-slate-900">{normalizedTotalScore}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold text-slate-600 bg-white/80 border border-slate-200 shadow-2xs">
                      out of {maxTotalScore} Total Points (24 Questions)
                    </span>
                  </motion.div>
                </div>

                {/* 24 Questions Structure Explanation */}
                <div className="pt-2 max-w-xl mx-auto">
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-[11px] sm:text-xs font-bold text-slate-600">
                    <span className="text-purple-700 font-black">📋 24 Questions Evaluated:</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold shadow-2xs">💖 Emotion ({Math.min(6, assessment.emotion_score)}/6)</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold shadow-2xs">🧩 Cognitive ({Math.min(6, assessment.cognitive_score)}/6)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold shadow-2xs">🌱 Sensory ({Math.min(6, assessment.self_awareness_score)}/6)</span>
                    <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-800 font-extrabold shadow-2xs">💡 Logic ({Math.min(6, assessment.math_score)}/6)</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold text-center mt-1.5">
                    Each of the 4 sections is evaluated out of 6 points, giving a total score out of 24 points across all 24 questions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Area recommendations (Optional) ── */}
            {isAreaRecommendationsEnabled() &&
              assessment.main_support_area &&
              assessment.strongest_area && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl sm:rounded-[2.5rem] border-2 border-fuchsia-200/90 bg-white/95 backdrop-blur-xl p-5 sm:p-9 shadow-xl space-y-4 sm:space-y-6"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                      <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                        Personalized Area Recommendation
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-fuchsia-50/80 border border-fuchsia-200 space-y-1 shadow-xs">
                          <p className="text-[10px] font-black uppercase tracking-widest text-fuchsia-600">
                            Learning Focus 🎯
                          </p>
                          <p className="text-sm sm:text-base font-black text-fuchsia-900">
                            {getAreaLabel(assessment.main_support_area)}
                          </p>
                        </div>
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1 shadow-xs">
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            Stronger Area 🚀
                          </p>
                          <p className="text-sm sm:text-base font-black text-emerald-900">
                            {getAreaLabel(assessment.strongest_area)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider truncate" title="Communication & Emotion">Comm & Emotion</p>
                          <p className="text-xs sm:text-sm font-black text-slate-800">Lvl {calculateAreaLevel(assessment.emotion_score)}</p>
                          <p className="text-[10px] font-extrabold text-rose-600 bg-rose-50 rounded-md py-0.5 border border-rose-100">
                            {Math.min(6, assessment.emotion_score)} / 6 pts
                          </p>
                        </div>
                        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider truncate" title="Social & Cognitive">Social & Cog</p>
                          <p className="text-xs sm:text-sm font-black text-slate-800">Lvl {calculateAreaLevel(assessment.cognitive_score)}</p>
                          <p className="text-[10px] font-extrabold text-blue-600 bg-blue-50 rounded-md py-0.5 border border-blue-100">
                            {Math.min(6, assessment.cognitive_score)} / 6 pts
                          </p>
                        </div>
                        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider truncate" title="Behavior & Sensory">Behavior & Sensory</p>
                          <p className="text-xs sm:text-sm font-black text-slate-800">Lvl {calculateAreaLevel(assessment.self_awareness_score)}</p>
                          <p className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 rounded-md py-0.5 border border-emerald-100">
                            {Math.min(6, assessment.self_awareness_score)} / 6 pts
                          </p>
                        </div>
                        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-2xs">
                          <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-wider truncate" title="Learning & Logic">Learning & Logic</p>
                          <p className="text-xs sm:text-sm font-black text-slate-800">Lvl {calculateAreaLevel(assessment.math_score)}</p>
                          <p className="text-[10px] font-extrabold text-violet-600 bg-violet-50 rounded-md py-0.5 border border-violet-100">
                            {Math.min(6, assessment.math_score)} / 6 pts
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed bg-slate-50/80 p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 italic">
                        &quot;Based on the survey, {getAreaLabel(assessment.main_support_area)} may benefit from more guided practice, while {getAreaLabel(assessment.strongest_area)}{" "}appears to be a stronger area. We suggest starting with foundational activities in the support area and continuing suitable activities in the stronger area.&quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

            {/* ── Area scores ── */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 text-white flex items-center justify-center text-base sm:text-lg shadow-sm">📊</span>
                Area Scores Breakdowns
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <AreaScoreCard
                  label="Communication & Emotion"
                  score={assessment.emotion_score}
                  maxScore={MAX_AREA}
                  questionCount={6}
                  areaLevel={calculateAreaLevel(assessment.emotion_score)}
                  emoji="💖"
                  bg="bg-gradient-to-br from-rose-50/90 to-white"
                  border="border-rose-200"
                  bar="bg-gradient-to-r from-rose-500 to-pink-500"
                  text="text-rose-900"
                  badgeBg="bg-rose-100 text-rose-700"
                  delay={0.1}
                />
                <AreaScoreCard
                  label="Social & Cognitive"
                  score={assessment.cognitive_score}
                  maxScore={MAX_AREA}
                  questionCount={6}
                  areaLevel={calculateAreaLevel(assessment.cognitive_score)}
                  emoji="🧩"
                  bg="bg-gradient-to-br from-blue-50/90 to-white"
                  border="border-blue-200"
                  bar="bg-gradient-to-r from-blue-500 to-cyan-500"
                  text="text-blue-900"
                  badgeBg="bg-blue-100 text-blue-700"
                  delay={0.2}
                />
                <AreaScoreCard
                  label="Behavior & Sensory"
                  score={assessment.self_awareness_score}
                  maxScore={MAX_AREA}
                  questionCount={6}
                  areaLevel={calculateAreaLevel(assessment.self_awareness_score)}
                  emoji="🌱"
                  bg="bg-gradient-to-br from-emerald-50/90 to-white"
                  border="border-emerald-200"
                  bar="bg-gradient-to-r from-emerald-500 to-teal-500"
                  text="text-emerald-900"
                  badgeBg="bg-emerald-100 text-emerald-700"
                  delay={0.3}
                />
                <AreaScoreCard
                  label="Learning & Logic"
                  score={assessment.math_score}
                  maxScore={MAX_AREA}
                  questionCount={6}
                  areaLevel={calculateAreaLevel(assessment.math_score)}
                  emoji="💡"
                  bg="bg-gradient-to-br from-violet-50/90 to-white"
                  border="border-violet-200"
                  bar="bg-gradient-to-r from-violet-500 to-purple-500"
                  text="text-violet-900"
                  badgeBg="bg-violet-100 text-violet-700"
                  delay={0.4}
                />
              </div>
            </div>

            {/* ── Recommendation ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl sm:rounded-[2.5rem] border-2 border-fuchsia-100/90 bg-white/95 backdrop-blur-xl p-5 sm:p-9 shadow-xl space-y-3 sm:space-y-4"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="space-y-1.5 sm:space-y-2 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">Recommendation Summary</h2>
                  <p className="text-slate-600 font-extrabold leading-relaxed text-sm sm:text-lg">
                    {assessment.recommendation ||
                      `Based on the survey results, we suggest starting with Level ${assessment.predicted_level} activities. These are designed to be supportive, engaging, and suitable for ${child.child_name}'s current development stage.`}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Unlocked games note ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-emerald-50/90 border-2 border-emerald-200 p-4 sm:p-6 flex items-center gap-3 sm:gap-4 shadow-md"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl sm:text-2xl shrink-0 shadow-sm">🎮</div>
              <p className="text-xs sm:text-base font-extrabold text-emerald-950">
                <strong>Level {assessment.predicted_level} games are now unlocked</strong> for {child.child_name}.
                {assessment.predicted_level > 1 && ` All levels up to Level ${assessment.predicted_level} are available.`}
              </p>
            </motion.div>

            {/* ── CTA buttons ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 pt-1 sm:pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href={`/games/${params.childId}`}
                  className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-xs sm:text-sm font-black uppercase tracking-widest shadow-lg shadow-purple-500/25 transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  Continue to Games
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href={`/survey/${params.childId}`}
                  className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-white border-2 border-fuchsia-200 text-fuchsia-700 text-xs sm:text-sm font-black uppercase tracking-widest shadow-sm hover:bg-fuchsia-50 hover:border-fuchsia-300 transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake Survey
                </Link>
              </motion.div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl sm:rounded-3xl bg-amber-50/90 border-2 border-amber-200 p-4 sm:p-6 flex items-start gap-3 sm:gap-4 shadow-sm">
              <span className="flex-shrink-0 text-amber-500 text-lg sm:text-xl">💙</span>
              <p className="text-[11px] sm:text-sm font-extrabold text-amber-900 leading-relaxed">
                <strong className="font-black uppercase tracking-wider text-amber-700">Platform Note: </strong>
                This platform provides supportive learning activities and progress tracking. It is not a medical diagnosis tool. Results reflect a suggested activity level only.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
