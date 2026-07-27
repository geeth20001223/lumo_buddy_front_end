"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";
import { Sparkles } from "lucide-react";

const navLinks = [
  { href: "/children", label: "Children" },
  { href: "/progress", label: "Progress" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/development-areas", label: "Development Areas" },
];

export default function AuthNavbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between h-16 sm:h-20 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Left side: Logo & Navigation Links */}
      <div className="flex items-center gap-4 sm:gap-6 xl:gap-8">
        <Logo href="/" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 border border-slate-200/90 backdrop-blur-md shadow-2xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-sky-700 bg-white shadow-sm border border-sky-100"
                    : "text-slate-600 hover:text-sky-600 hover:bg-white/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="auth-nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/10 via-fuchsia-400/10 to-indigo-400/10 border border-sky-300/40 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Middle & Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sleek Adaptive Level Unlocks Status Badge in Header */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-emerald-400/20 to-fuchsia-400/20 border border-amber-300/60 text-slate-800 text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-800">Adaptive Levels Unlocked</span>
          <Sparkles size={13} className="text-amber-500 animate-pulse ml-0.5" />
        </div>

        {/* User Profile Menu (Desktop) */}
        <div className="hidden md:block">
          <ProfileDropdown email={userEmail} />
        </div>

        {/* Mobile Navigation Drawer */}
        <MobileMenu isAuthenticated userEmail={userEmail} />
      </div>
    </div>
  );
}
