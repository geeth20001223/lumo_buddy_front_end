"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, Users, BarChart2, HelpCircle, Layers, Sparkles, X, Menu } from "lucide-react";

interface MobileMenuProps {
  isAuthenticated?: boolean;
  userEmail?: string;
}

export default function MobileMenu({ isAuthenticated = false, userEmail = "" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu whenever navigation path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const guestLinks = [
    { href: "/how-it-works", label: "How It Works", icon: <HelpCircle size={20} /> },
    { href: "/development-areas", label: "Development Areas", icon: <Layers size={20} /> },
  ];

  const authLinks = [
    { href: "/children", label: "Children Profiles", icon: <Users size={20} /> },
    { href: "/progress", label: "Progress Reports", icon: <BarChart2 size={20} /> },
    { href: "/how-it-works", label: "How It Works", icon: <HelpCircle size={20} /> },
    { href: "/development-areas", label: "Development Areas", icon: <Layers size={20} /> },
  ];

  const links = isAuthenticated ? authLinks : guestLinks;

  return (
    <div className="md:hidden">
      {/* Toggle Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 rounded-2xl transition-all border flex items-center justify-center min-w-[44px] min-h-[44px] ${
          isOpen
            ? "bg-sky-100 text-sky-900 border-sky-300 shadow-xs ring-2 ring-sky-200"
            : "text-slate-700 bg-white border-slate-200 hover:bg-slate-50 active:scale-95 shadow-2xs"
        }`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6 text-sky-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
      </button>

      {/* Backdrop & Drawer Container */}
      {isOpen && (
        <>
          {/* Tap-outside Backdrop Overlay */}
          <div
            className="fixed inset-0 top-[64px] sm:top-[80px] bg-slate-900/40 backdrop-blur-xs z-40 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Down Mobile Drawer Menu */}
          <div className="absolute top-[100%] left-0 w-full bg-white/98 backdrop-blur-2xl border-b-2 border-sky-100 shadow-2xl py-4 px-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-3 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {isAuthenticated && userEmail && (
              <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50/60 border border-sky-100 mb-1 flex items-center gap-3 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Logged In Parent</p>
                  <p className="text-xs font-extrabold text-slate-800 truncate">{userEmail}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex flex-col gap-1.5">
              {links.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-extrabold px-4 py-3.5 rounded-2xl transition-all flex items-center gap-3 min-h-[48px] ${
                      isActive
                        ? "bg-sky-100/90 text-sky-800 shadow-2xs border border-sky-200/90 font-black"
                        : "text-slate-700 hover:bg-sky-50/70 hover:text-sky-600 active:bg-slate-100"
                    }`}
                  >
                    <span className={isActive ? "text-sky-600" : "text-slate-400"}>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <hr className="border-slate-100 my-2 mx-1" />

            {/* Actions */}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2.5 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-extrabold px-4 py-3.5 rounded-2xl text-center transition-all border min-h-[48px] flex items-center justify-center ${
                    pathname === "/login"
                      ? "bg-sky-50 text-sky-700 border-sky-200 font-black"
                      : "text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 px-5 py-3.5 text-center text-sm font-black text-white shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-98 transition-all w-full flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Sparkles size={16} fill="currentColor" />
                  <span>Get Started</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3.5 text-sm font-extrabold text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors flex items-center gap-3 border border-rose-100/80 min-h-[48px]"
              >
                <LogOut size={20} className="text-rose-500" />
                <span>Log out</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
