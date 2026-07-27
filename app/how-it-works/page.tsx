"use client";

import { CalmBackground } from "@/components/ui/CalmBackground";
import { HowItWorksHero } from "@/components/how-it-works/Hero";
import { LightningStrip } from "@/components/how-it-works/LightningStrip";
import { JourneyTimeline } from "@/components/how-it-works/JourneyTimeline";
import { LearningFlow } from "@/components/how-it-works/LearningFlow";
import { DashboardShowcase, TrustSection } from "@/components/how-it-works/FeatureDetails";
import { FAQSection, FinalCTA } from "@/components/how-it-works/FAQAndCTA";

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Visual Ambiance & Animated Background */}
            <CalmBackground />

            {/* ⚡ Lightning Ticker Strip Right Below Header */}
            <LightningStrip />

            {/* 1. Hero Section */}
            <HowItWorksHero />

            {/* 2. The Learning Journey (Vertical Timeline) */}
            <JourneyTimeline />

            {/* 3. Personalized Learning Flow Diagram */}
            <LearningFlow />

            {/* 4. Dashboard Preview / Showcase */}
            <DashboardShowcase />

            {/* 5. Safety & Trust cards */}
            <TrustSection />

            {/* 6. FAQ Section */}
            <FAQSection />

            {/* 7. Final Action Section */}
            <FinalCTA />

            {/* Support Footer Note */}
            <footer className="py-12 border-t border-slate-200/60 text-center backdrop-blur-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                    Empowering Children Through Personalized Learning 💙
                </p>
            </footer>
        </main>
    );
}
