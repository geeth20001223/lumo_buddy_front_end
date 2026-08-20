"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  getChildrenForCurrentParent,
  getLatestAssessmentForChild,
  type LatestAssessment,
  type ParentProfile,
} from "@/lib/children";
import type { ChildProfile } from "@/types/child";
import { supabase } from "@/lib/supabase";
import { getAllChildrenOverview, type ChildOverviewItem } from "@/lib/overview";

import { WelcomeParentHero } from "@/components/children/WelcomeParentHero";
import { NextActionCard } from "@/components/children/NextActionCard";
import { QuickStatusCards } from "@/components/children/QuickStatusCards";
import { ChildProfileCard } from "@/components/children/ChildProfileCard";
import { ChildEmptyState } from "@/components/children/ChildEmptyState";
import { RecentActivity } from "@/components/children/RecentActivity";
import { SupportiveNote } from "@/components/children/SupportiveNote";
import { ChildrenPageSkeleton } from "@/components/children/ChildrenPageSkeleton";
import { AllChildrenOverview } from "@/components/children/AllChildrenOverview";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

function ChildrenPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCheckMode, setIsCheckMode] = useState(false);
  const [overviewItems, setOverviewItems] = useState<ChildOverviewItem[]>([]);

  const [parent, setParent] = useState<ParentProfile | null>(null);
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [assessments, setAssessments] = useState<Record<string, LatestAssessment | null>>({});
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const isParamCheck = searchParams.get("mode") === "check";
      const isStoredCheck = typeof window !== "undefined" && localStorage.getItem("lumo_check_admin_mode") === "true";

      if (isParamCheck || isStoredCheck) {
        if (isMounted) setIsCheckMode(true);
        try {
          const items = await getAllChildrenOverview();
          if (isMounted) setOverviewItems(items);
        } catch (err) {
          console.error("Failed to load overview data:", err);
        } finally {
          if (isMounted) setIsLoading(false);
        }
        return;
      }

      // Standard Parent Load
      try {
        const { parent: p, children: c } = await getChildrenForCurrentParent();

        if (!isMounted) return;

        setParent(p);
        setChildren(c);

        // Fetch assessments for each child in parallel
        const assessmentMap: Record<string, LatestAssessment | null> = {};
        await Promise.all(
          c.map(async (child) => {
            assessmentMap[child.id] = await getLatestAssessmentForChild(child.id);
          })
        );
        if (isMounted) setAssessments(assessmentMap);

        // Count total game scores for this parent's children
        if (c.length > 0) {
          const childIds = c.map((ch) => ch.id);
          const { count } = await supabase
            .from("game_scores")
            .select("*", { count: "exact", head: true })
            .in("child_id", childIds);
          if (isMounted) setGamesPlayed(count ?? 0);
        }
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof Error && error.message === "not_authenticated") {
          router.replace("/login");
          return;
        }
        setErrorMessage("We could not load your child profiles. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [router, searchParams]);

  const handleExitCheckMode = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("lumo_check_admin_mode");
    }
    setIsCheckMode(false);
    router.push("/login");
  };

  const surveysCompleted = Object.values(assessments).filter(Boolean).length;

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-fuchsia-50 via-rose-50/60 to-amber-50/40 pb-28 md:pb-12 overflow-hidden">
      <AnimatedBackground />
      {/* Animated color orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-200/30 blur-[100px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-200/25 blur-[100px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }} ></div>
        <div className="absolute top-[40%] right-[5%] w-[25vw] h-[25vw] rounded-full bg-amber-200/25 blur-[80px]" style={{ animation: 'drift 20s ease-in-out infinite' }}></div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 25% { transform: translate(40px,-50px) scale(1.08); } 50% { transform: translate(-30px,30px) scale(0.92); } 75% { transform: translate(20px,-20px) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(15px,-25px); } 50% { transform: translate(-10px,15px); } 75% { transform: translate(20px,10px); } }
      `}} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">

        {/* Loading */}
        {isLoading && <ChildrenPageSkeleton />}

        {/* Check Inspector Mode View */}
        {!isLoading && isCheckMode && (
          <AllChildrenOverview items={overviewItems} onExitCheckMode={handleExitCheckMode} />
        )}

        {/* Error */}
        {!isLoading && !isCheckMode && errorMessage && (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-400 text-xl mx-auto mb-4">⚠️</div>
            <p className="font-display text-lg font-bold text-rose-700 mb-2">Something went wrong</p>
            <p className="text-sm text-rose-500 font-medium">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Standard Parent Main content */}
        {!isLoading && !isCheckMode && !errorMessage && (
          <>
            {/* 1. Welcome Hero */}
            <WelcomeParentHero parentName={parent?.full_name ?? ""} />

            {/* 2. Next Recommended Action */}
            <NextActionCard children={children} assessments={assessments} />

            {/* 3. Quick Stats */}
            <QuickStatusCards
              childCount={children.length}
              surveysCompleted={surveysCompleted}
              gamesPlayed={gamesPlayed}
            />

            {/* 4. Child Profile Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Child Profiles
                  {children.length > 0 && (
                    <span className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600 text-sm font-bold align-middle">
                      {children.length}
                    </span>
                  )}
                </h2>
              </div>

              {children.length === 0 ? (
                <ChildEmptyState />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {children.map((child) => (
                    <ChildProfileCard
                      key={child.id}
                      child={child}
                      assessment={assessments[child.id] ?? null}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 5. Recent Activity */}
            <RecentActivity
              children={children}
              surveysCompleted={surveysCompleted}
              gamesPlayed={gamesPlayed}
            />

            {/* 6. Supportive Note */}
            <SupportiveNote />
          </>
        )}
      </div>
    </main>
  );
}

export default function ChildrenPage() {
  return (
    <Suspense fallback={<ChildrenPageSkeleton />}>
      <ChildrenPageInner />
    </Suspense>
  );
}
