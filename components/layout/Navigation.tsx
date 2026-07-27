"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import GuestNavbar from "./GuestNavbar";
import AuthNavbar from "./AuthNavbar";
import MobileBottomNav from "./MobileBottomNav";
import { HeaderQuoteBar } from "./HeaderQuoteBar";

export default function Navigation() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getSession() {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          if (error.message?.includes("Refresh Token Not Found")) {
            await supabase.auth.signOut();
          }
          throw error;
        }
        if (!cancelled) setSession(currentSession);
      } catch (err) {
        console.warn("[Navigation] Session check failed:", err);
        if (!cancelled) setSession(null);
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!cancelled) {
        setSession(newSession);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  // Early return for immersive game play pages (e.g. /games/[childId]/[gameSlug])
  const isGamePlayPage = Boolean(
    pathname &&
      pathname.startsWith("/games/") &&
      pathname.split("/").filter(Boolean).length > 2
  );

  if (isGamePlayPage) {
    return null;
  }

  // ALWAYS render the full header immediately.
  // Before Supabase resolves, show GuestNavbar (with logo, links, buttons).
  // Once session is confirmed, swap to AuthNavbar seamlessly.
  const showAuth = ready && session;

  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-[0_10px_30px_rgba(56,189,248,0.08)] transition-all duration-300">
        {/* 🌟 Header Top Quote Ticker Bar */}
        <HeaderQuoteBar />

        <div className="bg-white/80 backdrop-blur-2xl border-b border-sky-100/80 relative">
          {/* Specular Bottom Glowing Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-500 opacity-70" />

          {showAuth ? (
            <AuthNavbar userEmail={session.user?.email || ""} />
          ) : (
            <GuestNavbar />
          )}
        </div>
      </header>
      {showAuth && <MobileBottomNav />}
    </>
  );
}
