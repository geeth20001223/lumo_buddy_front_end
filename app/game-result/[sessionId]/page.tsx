"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getGameScoreById, getPreviousGameScore } from "@/lib/game-scores";
import { LoadingState } from "@/components/ui/LoadingState";
import { AssessmentBackground } from "@/components/assessment/AssessmentBackground";
import { LumiMascot } from "@/components/games/redesign/LumiMascot";
import {
  CheckCircle2,
  Target,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Activity,
  Award,
  Sparkles,
  RefreshCw,
  Home
} from "lucide-react";

export default function GameResultPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [prevSession, setPrevSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const current = await getGameScoreById(params.sessionId);
      if (current) {
        setSession(current);
        const previous = await getPreviousGameScore(current.child_id, current.game_id, current.id);
        setPrevSession(previous);
      }
      setIsLoading(false);
    }
    loadData();
  }, [params.sessionId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <LoadingState message="Analyzing learning results..." />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4 bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50">
        <AssessmentBackground />
        <div className="text-center space-y-4 bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] border-2 border-fuchsia-200 shadow-2xl relative z-10 max-w-md w-full">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mx-auto shadow-sm">⚠️</div>
          <p className="font-display text-xl font-black text-slate-900">Session not found</p>
          <p className="text-sm font-semibold text-slate-600">We could not locate this game session record.</p>
          <button
            onClick={() => router.push('/children')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-xs font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
          >
            Back to Profiles
          </button>
        </div>
      </main>
    );
  }

  // Calculations
  const accuracy = Math.round((session.correct_answers / (session.attempts || 1)) * 100);
  const prevAccuracy = prevSession ? Math.round((prevSession.correct_answers / (prevSession.attempts || 1)) * 100) : null;
  const accuracyDiff = (accuracy !== null && prevAccuracy !== null) ? accuracy - prevAccuracy : null;

  let performanceLabel = "";
  let performanceColor = "";
  let mascotState: "normal" | "correct" | "incorrect" = "normal";

  if (accuracy >= 90) {
    performanceLabel = "Mastery Level Accomplished! 🌟";
    performanceColor = "text-emerald-700 bg-emerald-100/90 border-emerald-300";
    mascotState = "correct";
  } else if (accuracy >= 70) {
    performanceLabel = "Good Progress! Keep Going 🎉";
    performanceColor = "text-amber-700 bg-amber-100/90 border-amber-300";
    mascotState = "correct";
  } else {
    performanceLabel = "Needs More Practice 🌱";
    performanceColor = "text-rose-700 bg-rose-100/90 border-rose-300";
    mascotState = "normal";
  }

  // Next Steps Logic
  let nextStep = "";
  if (accuracy >= 90) {
    nextStep = `Outstanding work! Your child has demonstrated strong skill mastery. Suggested next step: Practice this activity again to sharpen speed or explore new unlocked games!`;
  } else if (session.time_taken > 60 && accuracy >= 70) {
    nextStep = "Your child showed steady understanding and took their time carefully. Suggested next step: Replay this game to build confidence and ease.";
  } else {
    nextStep = "Steady effort! Suggested next step: Replay this activity once more to help your child master these core concepts.";
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-fuchsia-50 via-rose-50/60 to-amber-50/40 px-4 pb-32 pt-8 sm:px-6 sm:pb-16 sm:pt-12 select-none overflow-hidden">
      {/* Calm Decorative Background */}
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

      <div className="relative z-10 mx-auto w-full max-w-4xl space-y-8">
        
        {/* Top Header Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <Link
            href={`/games/${session.child_id}`}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-fuchsia-200/80 text-xs font-black uppercase tracking-widest text-fuchsia-700 hover:text-fuchsia-900 hover:bg-white hover:border-fuchsia-300 shadow-sm transition-all duration-300"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Games
          </Link>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200 text-xs font-extrabold text-slate-600 shadow-xs">
            <Award size={14} className="text-amber-500" />
            {new Date(session.played_at).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </motion.div>

        {/* ── HERO CELEBRATION BANNER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[3rem] bg-white/95 backdrop-blur-xl border-2 border-fuchsia-200/90 shadow-2xl shadow-purple-900/10 p-8 sm:p-10 space-y-6 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-100/90 border border-fuchsia-200 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-700">
                <Activity size={13} className="text-fuchsia-600" />
                LEARNING SESSION COMPLETED
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Today&apos;s Session Summary
              </h1>
              <p className="text-base sm:text-lg font-extrabold text-slate-600">
                Activity: <span className="text-fuchsia-700 font-black">{session.games?.game_name}</span> (Level {session.level})
              </p>
            </div>

            {/* Mascot Icon */}
            <div className="shrink-0 flex flex-col items-center justify-center p-3 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-50 via-purple-50 to-pink-50 border-2 border-fuchsia-200/80 shadow-md">
              <LumiMascot state={mascotState} size="md" />
            </div>
          </div>
        </motion.div>

        {/* ── 4 VIBRANT METRIC CARDS ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<CheckCircle2 className="text-rose-500" size={22} />}
            label="Correct Answers"
            value={`${session.correct_answers} / ${session.attempts}`}
            subText="Correct"
            bg="bg-gradient-to-br from-rose-50/90 via-pink-50/60 to-white"
            border="border-rose-200"
            badgeBg="bg-rose-100 text-rose-700"
            delay={0.1}
          />
          <StatCard
            icon={<Target className="text-blue-500" size={22} />}
            label="Accuracy"
            value={`${accuracy}%`}
            subText="Overall Ratio"
            bg="bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-white"
            border="border-blue-200"
            badgeBg="bg-blue-100 text-blue-700"
            delay={0.2}
          />
          <StatCard
            icon={<Clock className="text-amber-500" size={22} />}
            label="Completion Time"
            value={`${Math.floor(session.time_taken / 60)}m ${session.time_taken % 60}s`}
            subText="Duration"
            bg="bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white"
            border="border-amber-200"
            badgeBg="bg-amber-100 text-amber-700"
            delay={0.3}
          />
          <StatCard
            icon={<Sparkles className="text-emerald-500" size={22} />}
            label="Questions Answered"
            value={`${session.attempts}`}
            subText="Total Answered"
            bg="bg-gradient-to-br from-emerald-50/90 via-teal-50/60 to-white"
            border="border-emerald-200"
            badgeBg="bg-emerald-100 text-emerald-700"
            delay={0.4}
          />
        </div>

        {/* ── INSIGHT & NEXT STEPS SECTION ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Left Column: Performance Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[2.5rem] border-2 border-fuchsia-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp size={22} className="text-fuchsia-600" />
                    Performance Analysis
                  </h3>
                  <div className={`inline-flex px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-2xs ${performanceColor}`}>
                    {performanceLabel}
                  </div>
                </div>

                <p className="text-base sm:text-lg font-extrabold leading-relaxed text-slate-700">
                  Your child answered <span className="font-black text-fuchsia-700">{session.correct_answers} out of {session.attempts}</span> questions correctly with <span className="font-black text-fuchsia-700">{accuracy}%</span> accuracy.
                </p>
              </div>

              {/* Trend Comparison */}
              <div className="pt-6 border-t-2 border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Improvement Trend</h4>
                {prevSession ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 bg-slate-50/90 p-5 rounded-2xl border border-slate-200">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Previous Session</p>
                      <p className="text-xl font-black text-slate-600">{prevAccuracy}% Accuracy</p>
                    </div>
                    <div className="hidden h-10 w-px bg-slate-200 sm:block" />
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Current Session</p>
                      <p className="text-xl font-black text-fuchsia-700">{accuracy}% Accuracy</p>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                      {accuracyDiff !== null && accuracyDiff > 0 ? (
                        <div className="flex items-center gap-1 text-emerald-700 bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-black">
                          <ArrowUpRight size={16} />
                          +{accuracyDiff}% Growth
                        </div>
                      ) : accuracyDiff !== null && accuracyDiff < 0 ? (
                        <div className="flex items-center gap-1 text-rose-700 bg-rose-100 border border-rose-200 px-4 py-1.5 rounded-full text-xs font-black">
                          <ArrowDownRight size={16} />
                          {accuracyDiff}%
                        </div>
                      ) : (
                        <div className="text-slate-600 bg-slate-200 border border-slate-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Stable</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 font-extrabold text-sm italic bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    First recorded session for this activity. A baseline has been established for tracking future growth! ✨
                  </p>
                )}
              </div>
            </motion.section>
          </div>

          {/* Right Column: Next Steps */}
          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-6 rounded-[2.5rem] bg-slate-900 p-7 sm:p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-fuchsia-500/20 via-purple-500/10 to-transparent pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md">
                  💡
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Suggested Next Step</h3>
                <p className="text-slate-300 font-extrabold leading-relaxed text-sm">
                  {nextStep}
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} className="relative z-10">
                <button
                  onClick={() => router.push(`/games/${session.child_id}`)}
                  className="w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                >
                  Open Learning Hub 🎮
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            </motion.section>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
              <button
                onClick={() => router.push(`/children/${session.child_id}`)}
                className="w-full bg-white text-slate-700 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-fuchsia-200/80 hover:bg-fuchsia-50 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Home size={16} className="text-fuchsia-600" />
                View Child Profile
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-8 text-center">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            BrightPath Supportive Learning Platform — Analytical Summary 💙
          </p>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  subText,
  bg,
  border,
  badgeBg,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subText: string;
  bg: string;
  border: string;
  badgeBg: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`flex flex-col justify-between gap-4 rounded-[2rem] border-2 ${border} ${bg} p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-2xl ${badgeBg} flex items-center justify-center shadow-xs`}>
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">{subText}</span>
      </div>
      <div>
        <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        <p className="break-words text-2xl sm:text-3xl font-black leading-tight text-slate-900">{value}</p>
      </div>
    </motion.div>
  );
}
