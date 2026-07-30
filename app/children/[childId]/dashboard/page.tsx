"use client";

import { useEffect, useState } from "react";
import { getChildDashboardData, DashboardData } from "@/lib/dashboard";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { LoadingState } from "@/components/ui/LoadingState";

// Components
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { AreaProgressOverview } from "@/components/dashboard/AreaProgressOverview";
import { GamePerformanceTable } from "@/components/dashboard/GamePerformanceTable";
import { RecentActivityTimeline } from "@/components/dashboard/RecentActivityTimeline";
import { RecommendedNextActivity } from "@/components/dashboard/RecommendedNextActivity";
import { ParentDashboardNote } from "@/components/dashboard/ParentDashboardNote";
import { DashboardEmptyState } from "@/components/dashboard/DashboardEmptyState";
import { ScoreTrendChart, AreaAverageChart } from "@/components/dashboard/Charts";

export default function ParentDashboardPage() {
  const router = useRouter();
  const params = useParams<{ childId: string }>();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!params?.childId) return;
      
      try {
        const data = await getChildDashboardData(params.childId);
        if (!data) {
          router.push("/children");
          return;
        }
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        router.push("/children");
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, [params?.childId, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <LoadingState message="Loading progress dashboard..." />
      </main>
    );
  }

  if (!dashboardData) return null;

  const { child, assessment, scores, games, summary, areaStats, recommendedActivity } = dashboardData;

  // Empty States
  if (!assessment) {
    return (
      <main className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link href="/children" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} /> Back to Children
          </Link>
          <DashboardEmptyState childId={params.childId} type="no_assessment" />
        </div>
      </main>
    );
  }

  if (scores.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link href="/children" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} /> Back to Children
          </Link>
          <DashboardHero 
            child={child} 
            level={assessment.predicted_level} 
            lastSurveyDate={assessment.created_at} 
            totalActivities={0} 
          />
          <DashboardEmptyState childId={params.childId} type="no_scores" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Navigation */}
        <Link href="/children" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-2">
          <ArrowLeft size={16} /> Back to Profiles
        </Link>

        {/* Hero Section */}
        <DashboardHero 
          child={child} 
          level={assessment.predicted_level} 
          lastSurveyDate={assessment.created_at} 
          totalActivities={summary.totalActivities} 
        />

        {/* Key Metrics */}
        <SummaryCards summary={summary} level={assessment.predicted_level} />

        {/* Charts & Area Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <AreaProgressOverview areaStats={areaStats} />
          </div>
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex-1">
              <ScoreTrendChart scores={scores} />
            </div>
            <div className="flex-1">
              <AreaAverageChart areaStats={areaStats} />
            </div>
          </div>
        </div>

        {/* Timeline & Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <RecentActivityTimeline scores={scores} games={games} />
          
          <div className="flex flex-col gap-6 w-full">
            <RecommendedNextActivity childId={params.childId} recommendation={recommendedActivity} />
            
            {/* Dedicated Learning Companion Banner */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 p-8 sm:p-10 text-white shadow-2xl border-2 border-purple-400/40 group flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[220px]">
              <div className="relative z-10 space-y-4 flex-1">
                <span className="inline-block text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-3.5 py-1.5 rounded-full border border-amber-300/30 backdrop-blur-md">
                  ✨ Learning Companion
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white drop-shadow-md">
                  Keep Exploring & Growing Every Day!
                </h3>
                <p className="text-purple-200 text-sm font-semibold leading-relaxed">
                  Consistent short learning sessions help {child.child_name} build cognitive and emotional confidence step-by-step.
                </p>
              </div>

              {/* Perfectly Aligned 3D Mascot Artwork Image with Curved Corners */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex-shrink-0 rounded-[2rem] overflow-hidden border-4 border-white/20 shadow-xl bg-white/10 backdrop-blur-md p-1.5 transition-all duration-500 group-hover:scale-105 group-hover:border-white/40">
                <Image
                  src="/images/dashboard_learning_banner.png"
                  alt="Learning mascot"
                  fill
                  className="object-cover object-center rounded-[1.5rem]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Performance Table */}
        <GamePerformanceTable scores={scores} games={games} />

        {/* Disclaimer Note */}
        <ParentDashboardNote />

      </div>
    </main>
  );
}
