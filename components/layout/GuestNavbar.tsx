"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function GuestNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/development-areas", label: "Development Areas" },
  ];

  return (
    <div className="flex items-center justify-between h-16 sm:h-20 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Left side: Logo & Navigation Links */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <Logo href="/" />

        {/* Desktop Navigation Pill Bar */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-slate-100/70 border border-slate-200/80 backdrop-blur-md shadow-2xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs sm:text-sm font-black uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-sky-700 bg-white shadow-sm border border-sky-100"
                    : "text-slate-600 hover:text-sky-600 hover:bg-white/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="guest-nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/10 via-fuchsia-400/10 to-indigo-400/10 border border-sky-300/40 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right side Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-full border-2 border-slate-200/80 bg-white/90 text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all duration-300 active:scale-95 shadow-xs"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/35 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <Sparkles size={14} className="fill-white" />
          <span>Get Started</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  );
}
