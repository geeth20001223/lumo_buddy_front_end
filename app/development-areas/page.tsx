"use client";

import { DevelopmentHero } from "@/components/development-areas/Hero";
import { DevelopmentCards } from "@/components/development-areas/DevelopmentCards";
import { SupportFlows, ImportanceGrid } from "@/components/development-areas/ValueSections";
import { DevelopmentFAQ, DevelopmentCTA } from "@/components/development-areas/FinalSections";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

export default function DevelopmentAreasPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50/60 to-amber-50/40 pb-12">
            {/* Visual Ambiance & Animated Decorations */}
            <AnimatedBackground />

            {/* Extra morphing background color blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
                <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-fuchsia-200/35 blur-[100px]" style={{ animation: 'blob 18s ease-in-out infinite' }}></div>
                <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-rose-200/30 blur-[100px]" style={{ animation: 'blob 22s ease-in-out infinite', animationDelay: '5s' }}></div>
                <div className="absolute top-[40%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-amber-200/25 blur-[80px]" style={{ animation: 'drift 20s ease-in-out infinite' }}></div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blob { 0% { transform: translate(0,0) scale(1); } 25% { transform: translate(40px,-50px) scale(1.08); } 50% { transform: translate(-30px,30px) scale(0.92); } 75% { transform: translate(20px,-20px) scale(1.04); } 100% { transform: translate(0,0) scale(1); } }
                @keyframes drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(15px,-25px); } 50% { transform: translate(-10px,15px); } 75% { transform: translate(20px,10px); } }
            `}} />

            <div className="relative z-10 space-y-12">
                {/* 1. Hero Section */}
                <DevelopmentHero />

                {/* 2. Four Core Development Areas */}
                <DevelopmentCards />

                {/* 3. & 4. Support Flows & Personalization */}
                <SupportFlows />

                {/* 5. Why These Skills Matter */}
                <ImportanceGrid />

                {/* 6. FAQ Section */}
                <DevelopmentFAQ />

                {/* 7. Final CTA */}
                <DevelopmentCTA />
            </div>

            {/* Standard Educational Footer */}
            <footer className="py-12 border-t border-fuchsia-100/60 text-center relative z-10">
                <p className="text-xs font-black text-fuchsia-400 uppercase tracking-[0.3em]">
                    Empowering Children Through Personalized Learning 💙
                </p>
            </footer>
        </main>
    );
}
