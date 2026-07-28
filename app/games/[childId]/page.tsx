"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Backend Helpers
import { getChildForCurrentParent } from "@/lib/children";
import { getGamesForChild } from "@/lib/games";
import { isGameDevModeEnabled } from "@/lib/game-unlock";

// UI Components
import { LoadingState } from "@/components/ui/LoadingState";
import { LearningJourneyHero } from "@/components/games/redesign/LearningJourneyHero";
import { JourneyTimeline } from "@/components/games/redesign/JourneyTimeline";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import { LumoAssistantChatbot } from "@/components/home/LumoAssistantChatbot";
import type { ChildChatContext } from "@/components/home/LumoAssistantChatbot";

// Types
import type { ChildProfile } from "@/types/child";
import type { AssessmentResult } from "@/types/survey";
import type { GameWithUnlockState } from "@/types/game";

export default function GamesPage() {
  const router = useRouter();
  const params = useParams<{ childId: string }>();

  const [child, setChild] = useState<ChildProfile | null>(null);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [games, setGames] = useState<GameWithUnlockState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const devMode = isGameDevModeEnabled();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [childData, gamesData] = await Promise.all([
          getChildForCurrentParent(params.childId),
          getGamesForChild(params.childId),
        ]);

        if (isMounted) {
          setChild(childData.child);
          setGames(gamesData.games);
          setAssessment(gamesData.assessment);
        }
      } catch (error) {
        if (!isMounted) return;
        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }
        setErrorMessage("We could not load the games page. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [params.childId, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50 flex items-center justify-center p-4">
        <LoadingState message="Creating your calm learning journey..." />
      </main>
    );
  }

  // Handle case where no assessment exists and dev mode is false
  if (!assessment && !devMode) {
    return (
      <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-amber-50">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-2xl rounded-[3rem] p-10 shadow-2xl shadow-purple-900/10 border-2 border-fuchsia-100 text-center space-y-8 relative z-10"
        >
          <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-100 to-pink-100 border-2 border-fuchsia-200 flex items-center justify-center text-4xl mx-auto shadow-md">📋</div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-black text-slate-900 leading-tight">Survey Required</h1>
            <p className="text-slate-600 font-semibold leading-relaxed">
              To provide the best supportive activities for {child?.child_name}, please complete the developmental support survey first.
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href={`/survey/${params.childId}`}
              className="inline-flex items-center justify-center py-5 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 text-white text-sm font-extrabold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Start Survey 📋
            </Link>
            <Link
              href={`/children/${params.childId}`}
              className="inline-flex items-center justify-center py-5 rounded-full bg-white border-2 border-slate-200 text-slate-700 text-sm font-extrabold hover:bg-slate-50 transition-all"
            >
              Back to Profile
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // Build chat context from loaded data
  const nextGame = games.find((g) => g.is_next_recommended);
  const chatContext: ChildChatContext = {
    childName: child?.child_name,
    assessmentLevel: assessment?.predicted_level ?? null,
    nextGame: nextGame
      ? { name: nextGame.game_name, level: nextGame.level, area: nextGame.area, slug: nextGame.game_slug }
      : null,
    gamesPlayed: games.filter((g) => g.is_played).length,
    totalGames: games.filter((g) => g.is_unlocked).length,
    gameList: games
      .map((g) => `  - ${g.game_name} (Level ${g.level}, ${g.area}): ${g.is_played ? "✓ Played" : g.is_unlocked ? "Unlocked" : "Locked"}`)
      .join("\n"),
  };

  return (
    <>
      {/* Lumi Chatbot — outside main so overflow-x-hidden never clips it */}
      <LumoAssistantChatbot context={chatContext} />

      <main className="min-h-screen relative overflow-x-hidden pb-32 bg-gradient-to-br from-fuchsia-50 via-rose-50/60 to-amber-50/40">
        <AnimatedBackground />

        {/* Extra floating color orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-200/35 blur-[100px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-200/30 blur-[100px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }}></div>
        <div className="absolute top-[40%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/25 blur-[80px]" style={{ animation: 'drift 20s ease-in-out infinite' }}></div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 25% { transform: translate(40px,-50px) scale(1.08); } 50% { transform: translate(-30px,30px) scale(0.92); } 75% { transform: translate(20px,-20px) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(15px,-25px); } 50% { transform: translate(-10px,15px); } 75% { transform: translate(20px,10px); } }
      `}} />

      {/* Subtle Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 relative z-50">
        <Link
          href={`/children/${params.childId}`}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-fuchsia-200/60 text-xs font-black uppercase tracking-widest text-fuchsia-700 hover:text-fuchsia-900 hover:bg-white hover:border-fuchsia-300 shadow-sm transition-all duration-300"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

        <div className="relative z-10">
          <LearningJourneyHero
            childName={child?.child_name || "your child"}
            assessment={assessment}
          />

          {/* The Guided Journey Timeline */}
          <JourneyTimeline
            childId={params.childId}
            games={games}
          />
        </div>
      </main>
    </>
  );
}
